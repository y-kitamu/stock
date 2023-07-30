"""
Input: 米国株価データ
Output (予測): 日本株価データ
のデータセット
"""
import re
from datetime import datetime
from pathlib import Path
from typing import List, Optional, Set, Tuple, Union

import numpy as np
import pandas as pd
import tensorflow as tf
from keras.api._v2.keras import preprocessing
from pydantic import BaseModel
from tensorflow.python.ops.array_ops import Slice
from tqdm import tqdm

from ... import logger
from ...constants import DATA_DIR
from . import DatasetBase


class DatasetParams(BaseModel):
    # Path to the directory where the stock data is stored.
    # Assuming the symbol's data is storead to {data_dir}/{symbol}.csv.
    us_data_dir: Path = DATA_DIR / "sp500"
    jp_data_dir: Path = DATA_DIR / "nikkei225"
    # # Path to the directory where the dataset will be stored.
    dataset_path: Path = DATA_DIR / "dataset"
    # #
    batch_size: int = 32
    prefetch: int = 32


class Dataset(DatasetBase):
    STOCK_DATA_KEYS = ["start", "high", "low", "end", "volume"]
    TRAIN_VAL_TEST_RATIO = [0.7, 0.1, 0.2]  # train, val, test ratio

    def __init__(self, params: DatasetParams, force_recreate: bool = False):
        self.params = params
        self.us_symbols = self._get_symbols(self.params.us_data_dir)
        self.jp_symbols = self._get_symbols(self.params.jp_data_dir)

        # 時間がかかる処理は処理後の状態を保存しておく
        if force_recreate or not self._restore_dataset():
            # s&p500のデータを取得
            self.us_data = self._load_data(self.us_symbols, self.params.us_data_dir)
            # nikkei225のデータを取得
            self.jp_data = self._load_data(self.jp_symbols, self.params.jp_data_dir)
            self.save_dataset()

        # データの前処理
        self.us_data, self.us_symbols = self.preprocess_on_init(self.us_data, self.us_symbols)
        self.jp_data, self.jp_symbols = self.preprocess_on_init(
            self.jp_data, self.jp_symbols, only_high_lows=True
        )
        # s&p 500とnikkei225を結合
        self.data, self.invalid_mask = self._merge_data(self.us_data, self.jp_data)

    @property
    def num_input_features(self):
        return len(self._us_data_indices)

    @property
    def num_output_features(self):
        return len(self._jp_data_indices)

    @property
    def _us_data_indices(self) -> List[int]:
        return list(range(0, self.us_data.shape[1] - 1))

    @property
    def _jp_data_indices(self) -> List[int]:
        return list(range(self.us_data.shape[1] - 1, self.data.shape[1]))

    def _get_symbols(self, input_dir: Path) -> List[str]:
        """`input_dir`に格納されているcsvのbasename(銘柄のコード)のリストを返す"""
        return [p.stem for p in input_dir.glob("*.csv")]

    def _restore_dataset(self):
        """保存済みのデータセットを復元する"""
        if not self.params.dataset_path.exists():
            return False

        # 保存済みのdatasetを検索
        regex = re.compile(r"dataset_\d{8}_\d{6}\_us.npy")
        dataset_paths = []
        for path in self.params.dataset_path.glob("*.npy"):
            if regex.match(path.name):
                jp_path = path.parent / path.name.replace("_us.npy", "_jp.npy")
                if path.exists() and jp_path.exists():
                    dataset_paths.append([path, jp_path])

        if len(dataset_paths) == 0:
            return False

        # 最新のdatasetを取得
        us_path, jp_path = sorted(dataset_paths, key=lambda x: x[0].name)[-1]

        # 復元
        self.us_data = np.load(us_path)
        self.jp_data = np.load(jp_path)

        return True

    def save_dataset(self):
        """作成したデータを保存する"""
        basename = "dataset_{}".format(datetime.now().strftime("%Y%m%d_%H%M%S"))
        self._save_data(self.params.dataset_path / f"{basename}_us.npy", self.us_data)
        self._save_data(self.params.dataset_path / f"{basename}_jp.npy", self.jp_data)

    def _save_data(self, path: Path, data: Optional[Union[np.ndarray, List[np.ndarray]]] = None):
        """`data`をnpyファイル (`path`)に保存する"""
        _data: Union[np.ndarray, List[np.ndarray]] = self.data if data is None else data
        path.parent.mkdir(parents=True, exist_ok=True)
        np.save(path, _data)

    def _load_data(self, symbols: List[str], input_dir: Path) -> np.ndarray:
        """`symbols`に格納されている銘柄の株価データを`input_dir`から読み込む。
        timestampがindexになるように整列したnumpy array (2d)を返す
        (行 : timestamp, 列 : 各銘柄の株価(start, hihg, low, end, volume))

        Args:
            symbols: 銘柄のコードのリスト
            input_dir: 株価データが格納されているディレクトリ
        """
        # 銘柄別に保存されているcsvを読み込む
        dfs: List[pd.DataFrame] = []
        unused_symbols = []  # 欠損データがあるので使用しない銘柄
        timestamp_set = set()
        for symbol in symbols:
            data_csv = input_dir / f"{symbol}.csv"
            df = pd.read_csv(data_csv)
            if np.any(np.isnan(df.to_numpy())):
                unused_symbols.append(symbol)
                logger.debug(f"Symbol {symbol} has nan values.")
                continue
            timestamp_set.update(df.timestamp.to_list())
            dfs.append(df)  #

        # timestampをindexにして、すべての銘柄のデータを一つのnp.arrayに格納
        arr = np.zeros((len(timestamp_set), len(dfs) * len(self.STOCK_DATA_KEYS) + 1))
        timestamps = sorted(list(timestamp_set))
        arr[:, 0] = timestamps
        for i, df in tqdm(enumerate(dfs)):
            for ts in timestamps:
                if ts in df.timestamp.to_list():
                    idx = df[df.timestamp == ts].index[0]
                    arr[
                        idx,
                        i * len(self.STOCK_DATA_KEYS) + 1 : (i + 1) * len(self.STOCK_DATA_KEYS) + 1,
                    ] = df.loc[idx, self.STOCK_DATA_KEYS].to_numpy()
        return arr

    def _merge_data(self, us_data: np.ndarray, jp_data: np.ndarray):
        """S&P500とnikkei225のデータを結合する。
        両方のデータに存在するtimestampのみを抽出する。
        timestampはJPのものを1日ずらす。
        （同じタイムスタンプのデータを見ると、US -> JPの時系列になるようにする）
        """
        jp_data[:, 0] -= 24 * 60 * 60  # 時系列をus -> jpとするためにtimestampを1日ずらす
        us_timestamps: Set[int] = set(us_data[:, 0])  # utcでYYYY/MM/DD 00:00:00のタイムスタンプ
        jp_timestamps: Set[int] = set(jp_data[:, 0])
        common_timestamps = sorted(us_timestamps & jp_timestamps)
        us_data = us_data[np.isin(us_data[:, 0], common_timestamps)]
        jp_data = jp_data[np.isin(jp_data[:, 0], common_timestamps)]
        # us_dataとjp_dataを結合する
        data = np.concatenate([us_data[:, 1:], jp_data[:, 1:]], axis=1)  # timestampは不要なので除く
        invalid_mask = np.isnan(data)
        data[invalid_mask] = -100
        return data, invalid_mask

    def get_train_val_test_dataset(
        self,
    ) -> Tuple[tf.data.Dataset, tf.data.Dataset, tf.data.Dataset]:
        """`self.data`をtrain, val, testに分割して、それぞれのtf.data.Datasetを返す"""
        ratio = np.array(self.TRAIN_VAL_TEST_RATIO) / sum(self.TRAIN_VAL_TEST_RATIO)
        n_data = len(self.data)
        n_train = int(n_data * ratio[0])
        n_val = int(n_data * ratio[1])

        train_ds = self.make_dataset(self.data[:n_train], is_train=True)
        val_ds = self.make_dataset(self.data[n_train : n_train + n_val], is_train=False)
        test_ds = self.make_dataset(self.data[n_train + n_val :], is_train=False)
        return train_ds, val_ds, test_ds

    def make_dataset(self, data: np.ndarray, is_train: bool) -> tf.data.Dataset:
        """tf.data.Dataset objectを作成する
        Args:
            data (np.ndarray): 入力データ
            is_train (bool): trainデータかどうか
        """

        def map_func(data: tf.Tensor):
            inputs = data.numpy()[self._us_data_indices]
            outputs = data.numpy()[self._jp_data_indices]
            return inputs, outputs

        # data = self.preprocess_on_make(data)
        ds = tf.data.Dataset.from_tensor_slices(data.astype(np.float32))
        ds = ds.map(
            lambda x: tf.py_function(func=map_func, inp=[x], Tout=[tf.float32, tf.float32]),
            num_parallel_calls=8,
        )
        if is_train:
            ds = ds.shuffle(len(data), reshuffle_each_iteration=True)
        ds = ds.batch(self.params.batch_size, drop_remainder=is_train).prefetch(
            self.params.prefetch
        )
        return ds

    def preprocess_on_init(self, data, symbols, only_high_lows=False):
        """データ読み込み時の前処理。無効なデータの削除、騰落率を計算する。
        `data`は1列目がtimestamp, 2列目以降が銘柄のデータであるとする。
        (`self.STOCK_DATA_KEYS`の順番であることを想定。`self._load_data`で読み込んだデータを想定)

        Args:
            data (np.ndarray) :
            symbols (List[str]) :
            only_high_lows: high, lowのみを読み込むかどうか
        Returns:
            Tuple[np.ndarray, np.ndarray]: (前処理後のデータ, データに含まれる銘柄のリスト)
        """
        # 生データ（株価、売買高）が0になることはないので、0のデータをnanに置き換える
        data[data < 1e-5] = np.nan
        # 無効なデータが含まれている列, symbolを削除する
        cols_per_symbol = (data.shape[1] - 1) // len(symbols)
        valid_cols = [0]  # timestamp列は残す
        invalid_symbol_indices = []
        for col_idx in range(1, data.shape[1], cols_per_symbol):
            for offset in range(cols_per_symbol):
                if np.any(np.isnan(data[:, col_idx + offset])):
                    invalid_symbol_indices.append((col_idx - 1) // cols_per_symbol)
                    break
            else:
                valid_cols += list(range(col_idx, col_idx + cols_per_symbol))
        data = data[:, valid_cols]
        valid_symbols = [
            symbol for i, symbol in enumerate(symbols) if i not in invalid_symbol_indices
        ]

        # 騰落率を計算する。株価の騰落率は前日終値を基準にする。
        close_idx = self.STOCK_DATA_KEYS.index("end")
        volume_idx = self.STOCK_DATA_KEYS.index("volume")
        n_keys = len(self.STOCK_DATA_KEYS)
        offsets = [
            j * n_keys + close_idx + 1 if i % n_keys != volume_idx else j * n_keys + volume_idx + 1
            for j in range(len(valid_symbols))
            for i in range(len(self.STOCK_DATA_KEYS))
        ]
        previous_close = data[:-1, offsets]
        percentage_change: np.ndarray = np.zeros((data.shape[0] - 1, data.shape[1]))
        percentage_change[:, 0] = data[1:, 0]
        percentage_change[:, 1:] = (data[1:, 1:] / (previous_close + 1e-5) - 1) * 100

        # percentage_change: np.ndarray = np.zeros((data.shape[0] - 1, data.shape[1]))
        # percentage_change[:, 0] = data[1:, 0]
        # percentage_change[:, 1:] = (data[1:, 1:] / (data[:-1, 1:] + 1e-5) - 1) * 100

        # only_high_lows == Trueの場合、high, lowの列のみを残す
        if only_high_lows:
            target_offset = [
                idx for idx, key in enumerate(self.STOCK_DATA_KEYS) if key in ["high", "low"]
            ]
            target_cols = [0] + [
                idx + 1
                for idx in range(data.shape[1])
                if idx % len(self.STOCK_DATA_KEYS) in target_offset
            ]
            percentage_change = percentage_change[:, target_cols]
        else:
            # volumeの列を削除する
            target_cols = [0] + [
                i for i in range(percentage_change.shape[1]) if (i - 1) % n_keys != volume_idx
            ]
            percentage_change = percentage_change[:, target_cols]

        return percentage_change, valid_symbols

    # def preprocess_on_make(self, data: np.ndarray):
    #     """データセット作成時の前処理"""
    #     return data
