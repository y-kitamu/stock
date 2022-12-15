"""
Input: 米国株価データ
Output (予測): 日本株価データ
のデータセット
"""


from pathlib import Path
from typing import List, Tuple

import numpy as np
import pandas as pd
import tensorflow as tf
from pydantic import BaseModel
from tqdm import tqdm

from .. import logger


class DatasetParams(BaseModel):
    # Path to the csv file which contains list of symbols to use.
    # symbols_csv_path: Path
    # Path to the directory where the stock data is stored.
    # Assuming the symbol's data is storead to {data_dir}/{symbol}.csv.
    us_data_dir: Path
    jp_data_dir: Path
    # # Path to the directory where the dataset will be stored.
    dataset_path: Path
    # # window parameters
    # input_width: int = 30
    # output_width: int = 30
    # stride: int = 1
    # shift: int = 1
    # #
    # batch_size: int = 32
    # prefetch: int = 32


class Dataset:
    STOCK_DATA_KEYS = ["start", "high", "low", "end", "volume"]
    TRAIN_VAL_TEST_RATIO = [0.7, 0.1, 0.2]  # train, val, test ratio

    def __init__(self, params: DatasetParams):
        self.params = params
        self.us_symbols = self._get_symbols(self.params.us_data_dir)
        self.jp_symbols = self._get_symbols(self.params.jp_data_dir)

        self.us_data = self._load_data(self.us_symbols, self.params.us_data_dir)
        self.jp_data = self._load_data(self.jp_symbols, self.params.jp_data_dir)
        self.data = self._merge_data(self.us_data, self.jp_data)

    @property
    def num_features(self):
        return self.data.shape[-1]

    @property
    def num_symbols(self) -> int:
        return (self.data.shape[-1] - 1) // len(self.STOCK_DATA_KEYS)

    @property
    def high_low_indices(self) -> List[List[int]]:
        """`self.data`のhigh, lowの列のindexを返す
        Return:
            [[high column index1, low column index1], [high2, low2], ...]
        """
        high_idx = self.STOCK_DATA_KEYS.index("high")
        low_idx = self.STOCK_DATA_KEYS.index("low")
        offset = 1  # timestampの分
        return [
            [
                i * len(self.STOCK_DATA_KEYS) + high_idx + offset,
                i * len(self.STOCK_DATA_KEYS) + low_idx + offset,
            ]
            for i in range(self.num_symbols)
        ]

    def _get_symbols(self, input_dir: Path) -> List[str]:
        """`input_dir`に格納されているcsvのbasename(銘柄のコード)のリストを返す"""
        return [p.stem for p in input_dir.glob("*.csv")]

    def _load_data(self, symbols: List[str], input_dir: Path) -> np.ndarray:
        """`symbols`に格納されている銘柄の株価データを`input_dir`から読み込む。
        timestampがindexになるように整列したnumpy array (2d)を返す
        (行 : timestamp, 列 : 各銘柄の株価(start, hihg, low, end, volume))
        """
        dfs: List[pd.DataFrame] = []
        timestamp_set = set()
        for symbol in symbols:
            data_csv = input_dir / f"{symbol}.csv"
            df = pd.read_csv(data_csv)
            timestamp_set.update(df.timestamp.to_list())
            dfs.append(df)

        print(f"Number of data frames  = {len(dfs)}")
        arr = np.zeros((len(timestamp_set), len(dfs) * len(self.STOCK_DATA_KEYS) + 1))
        timestamps = sorted(list(timestamp_set))
        arr[:, 0] = timestamps

        logger.debug("Start create dataset array : ")
        for i, df in tqdm(enumerate(dfs)):
            for ts in timestamps:
                if ts in df.timestamp.to_list():
                    idx = df[df.timestamp == ts].index[0]
                    arr[
                        idx,
                        i * len(self.STOCK_DATA_KEYS) + 1 : (i + 1) * len(self.STOCK_DATA_KEYS) + 1,
                    ] = df.loc[idx, self.STOCK_DATA_KEYS].to_numpy()
        logger.debug("Finish create dataset array")
        return arr

    def _merge_data(self, us_data: np.ndarray, jp_data: np.ndarray):
        """ """
        # timestampが一致するものだけを抽出する
        us_timestamps = set(us_data[:, 0] + ) 
        jp_timestamps = set(jp_data[:, 0] + 9 * 60 * 60 * 1000)  # utcに変換
        common_timestamps = us_timestamps & jp_timestamps
        us_data = us_data[np.isin(us_data[:, 0], common_timestamps)]
        jp_data = jp_data[np.isin(jp_data[:, 0], common_timestamps)]
        # us_dataとjp_dataを結合する
        data = np.concatenate([us_data, jp_data[:, 1:]], axis=1)
        # 前処理
        data = self.preprocess_on_init(data)
        return data

    def save_data(self, path: Path):
        """`self.data`をnpyファイルに保存する"""
        path.parent.mkdir(parents=True, exist_ok=True)
        np.save(path, self.data)

    def get_train_val_test_dataset(
        self,
    ) -> Tuple[tf.data.Dataset, tf.data.Dataset, tf.data.Dataset]:
        """`self.data`をtrain, val, testに分割して、それぞれのtf.data.Datasetを返す"""
        ratio = np.array(self.TRAIN_VAL_TEST_RATIO) / sum(self.TRAIN_VAL_TEST_RATIO)
        n_data = len(self.data)
        n_train = int(n_data * ratio[0])
        n_val = int(n_data * ratio[1])

        train_data = self.data[:n_train]
        self.mean = train_data.mean(axis=0)
        self.std = train_data.std(axis=0)

        train_ds = self.make_dataset(train_data, is_train=True)
        val_ds = self.make_dataset(self.data[n_train : n_train + n_val], is_train=False)
        test_ds = self.make_dataset(self.data[n_train + n_val :], is_train=False)
        return train_ds, val_ds, test_ds

    def make_dataset(self, data: np.ndarray, is_train: bool) -> tf.data.Dataset:
        """tf.data.Dataset objectを作成する
        Args:
            data (np.ndarray): 入力データ
            is_train (bool): trainデータかどうか
        """

        def map_func(window: tf.data.Dataset):
            arr = list(window.as_numpy_iterator())
            input = arr[: self.params.input_width]
            output = arr[self.params.shift :]
            if self.params.output_width == 1:
                output = output[0]
            return input, output

        data = self.preprocess_on_make(data)
        window_size = self.params.shift + self.params.output_width
        ds = tf.data.Dataset.from_tensor_slices(data.astype(np.float32))
        ds = ds.window(window_size, stride=self.params.stride, shift=1, drop_remainder=True)
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

    def preprocess_on_init(self, data):
        """データ読み込み時の前処理"""
        # nanを0に置き換える
        data[np.isnan(data)] = 0
        return data

    def preprocess_on_make(self, data: np.ndarray):
        """データセット作成時の前処理"""
        # 正規化
        data = (data - self.mean) / (self.std + 1e-9)
        return data
