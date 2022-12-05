from pathlib import Path
from typing import List

import numpy as np
import pandas as pd
import tensorflow as tf
from pydantic import BaseModel
from tqdm import tqdm

from .. import logger


class DatasetParams(BaseModel):
    # Path to the csv file which contains list of symbols to use.
    symbols_csv_path: Path
    # Path to the directory where the stock data is stored.
    # Assuming the symbol's data is storead to {data_dir}/{symbol}.csv.
    data_dir: Path
    # Path to the directory where the dataset will be stored.
    dataset_path: Path
    # window parameters
    input_width: int = 30
    output_width: int = 30
    stride: int = 1
    shift: int = 1
    #
    batch_size: int = 32
    prefetch: int = 32


class Dataset:
    STOCK_DATA_KEYS = ["start", "high", "low", "end", "volume"]
    TRAIN_VAL_TEST_RATIO = [0.7, 0.1, 0.2]

    def __init__(self, params: DatasetParams):
        self.params = params
        df = pd.read_csv(self.params.symbols_csv_path)
        self.symbols = df["Symbol"].to_list()
        self.data = self.load_data()

        self.input_labels = np.arange(self.params.input_width)
        self.ouptut_labels = self.input_labels + self.params.shift

        if not self.params.dataset_path.exists():
            self.save_data(self.params.dataset_path)

    def load_data(self):
        """`self.symbols`に格納されている銘柄の株価データを読み込む。
        timestampがindexになるように整列したnumpy array (2d)を返す
        (行 : timestamp, 列 : 各銘柄の株価(start, hihg, low, end, volume))
        """
        if self.params.dataset_path.exists():
            return np.load(self.params.dataset_path)

        dfs: List[pd.DataFrame] = []
        timestamp_set = set()
        for symbol in self.symbols:
            data_csv = self.params.data_dir / f"{symbol}.csv"
            if not data_csv.exists():
                continue
            df = pd.read_csv(data_csv)
            timestamp_set.update(df.timestamp.to_list())
            dfs.append(df)

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

    def save_data(self, path: Path):
        """`self.data`をnpyファイルに保存する"""
        path.parent.mkdir(parents=True, exist_ok=True)
        np.save(path, self.data)

    def make_dataset(self, is_train):
        def map_func(window: tf.data.Dataset):
            arr = list(window.as_numpy_iterator())
            input = arr[: self.params.input_width]
            output = arr[self.params.shift :]
            if self.params.output_width == 1:
                output = output[0]
            return input, output

        window_size = self.params.shift + self.params.output_width
        ds = tf.data.Dataset.from_tensor_slices(self.data.astype(np.float32))
        ds = ds.window(window_size, stride=self.params.stride, shift=1, drop_remainder=True)
        ds = ds.map(
            lambda x: tf.py_function(func=map_func, inp=[x], Tout=[tf.float32, tf.float32]),
            num_parallel_calls=8,
        )
        if is_train:
            ds = ds.shuffle(len(self.data), reshuffle_each_iteration=True)
        ds = ds.batch(self.params.batch_size, drop_remainder=is_train).prefetch(
            self.params.prefetch
        )
        return ds
