"""dataloader.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 15:42:55
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import random
import datetime
from typing import TypeVar, Generic, Any

import numpy as np
import numpy.typing as npt
import polars as pl
import gymnasium as gym

from .io import read_data


T_cov = TypeVar("T_cov", covariant=True)


class DataLoader:
    """
    Args:
        data (pl.DataFrame): 前処理済みのデータ (特徴量計算済み、欠損値処理済み)
        window_size (int): 何日分のデータを取得するか
    """

    def __init__(
        self,
        code: str,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
        episode_length: int,
        window_size: int,
        target_columns: list[str] = ["open", "high", "low", "close", "volume"],
    ):
        self.code = code
        self.start_date = start_date
        self.end_date = end_date
        self.episode_length = episode_length
        self.window_size = window_size
        self.target_columns = target_columns
        self.data = pl.DataFrame()
        # self.data: pl.DataFrame = pl.DataFrame()
        self.reset()

    def __len__(self) -> int:
        return len(self.data) - self.window_size + 1

    def __getitem__(self, idx: int) -> npt.NDArray[np.float32]:
        return self.get_observation(idx)

    def get_observation(self, idx: int) -> npt.NDArray[np.float32]:
        """指定したindexのobservationデータを取得する"""
        if 0 <= idx < len(self.data) - self.window_size + 1:
            return (
                self.data.slice(idx, self.window_size)
                .select(*[pl.col(colname) for colname in self.target_columns])
                .to_numpy()
                .flatten()
            )
        else:
            raise IndexError

    def get_price(self, idx: int) -> float:
        """指定したindexの終値を取得する"""
        if 0 <= idx < len(self.data) - self.window_size + 1:
            return self.data["close"][idx + self.window_size - 1]
        else:
            raise IndexError

    def get_ohlcv(self, idx: int) -> npt.NDArray[np.float32]:
        """指定したindexのohlcvデータを取得する"""
        if 0 <= idx < len(self.data) - self.window_size + 1:
            return (
                self.data.select(
                    pl.col("open"), pl.col("high"), pl.col("low"), pl.col("close"), pl.col("volume")
                )[idx + self.window_size - 1]
                .to_numpy()
                .flatten()
            )
        else:
            raise IndexError

    def reset(self):
        max_offset = (
            int((self.end_date - self.start_date) / datetime.timedelta(minutes=1))
            - self.window_size
            - self.episode_length
        )
        offset = random.randint(0, max_offset)
        start_date = self.start_date + datetime.timedelta(minutes=offset)
        end_date = start_date + datetime.timedelta(minutes=self.episode_length + self.window_size - 1)
        self.data: pl.DataFrame = read_data(self.code, start_date, end_date)

    @property
    def observation_space(self) -> gym.spaces.Space[Any]:
        return gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(int(self.window_size * len(self.target_columns)),),
            dtype=np.float32,
        )
