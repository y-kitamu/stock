"""dataloader.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 15:42:55
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
import random
from typing import Any

import gymnasium as gym
import numpy as np
import numpy.typing as npt
import polars as pl
from pydantic import BaseModel, ConfigDict

from .io import read_data


class DataLoader:
    class Params(BaseModel):
        model_config = ConfigDict(extra="forbid")

        code: str = "BTC"
        start_date: datetime.datetime = datetime.datetime(2022, 1, 1)
        end_date: datetime.datetime = datetime.datetime(2023, 1, 1)
        episode_length: int = 1440
        window_size: int = 25
        target_columns: list[str] = ["open", "high", "low", "close", "volume"]

    """
    Args:
        data (pl.DataFrame): 前処理済みのデータ (特徴量計算済み、欠損値処理済み)
        window_size (int): 何日分のデータを取得するか
    """

    def __init__(self, params: Params):
        self.params = params
        self.data = pl.DataFrame()
        self.reset()

    def __len__(self) -> int:
        return len(self.data) - self.params.window_size + 1

    def __getitem__(self, idx: int) -> npt.NDArray[np.float32]:
        return self.get_observation(idx)

    def get_observation(self, idx: int) -> npt.NDArray[np.float32]:
        """指定したindexのobservationデータを取得する"""
        if 0 <= idx < len(self.data) - self.params.window_size + 1:
            return (
                self.data.slice(idx, self.params.window_size)
                .select(*[pl.col(colname) for colname in self.params.target_columns])
                .to_numpy()
                .astype(np.float32)
                .flatten()
            )
        else:
            raise IndexError

    def get_price(self, idx: int) -> float:
        """指定したindexの終値を取得する"""
        if 0 <= idx < len(self.data) - self.params.window_size + 1:
            return self.data["close"][idx + self.params.window_size - 1]
        else:
            raise IndexError

    def get_ohlcv(self, idx: int) -> npt.NDArray[np.float32]:
        """指定したindexのohlcvデータを取得する"""
        if 0 <= idx < len(self.data) - self.params.window_size + 1:
            return (
                self.data.select(
                    pl.col("open"), pl.col("high"), pl.col("low"), pl.col("close"), pl.col("volume")
                )[idx + self.params.window_size - 1]
                .to_numpy()
                .flatten()
            )
        else:
            raise IndexError

    def reset(self):
        max_offset = (
            int((self.params.end_date - self.params.start_date) / datetime.timedelta(minutes=1))
            - self.params.window_size
            - self.params.episode_length
        )
        offset = random.randint(0, max_offset)
        start_date = self.params.start_date + datetime.timedelta(minutes=offset)
        end_date = start_date + datetime.timedelta(
            minutes=self.params.episode_length + self.params.window_size - 1
        )
        self.data: pl.DataFrame = read_data(self.params.code, start_date, end_date)

    @property
    def observation_space(self) -> gym.spaces.Space[Any]:
        return gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(int(self.params.window_size * len(self.params.target_columns)),),
            dtype=np.float32,
        )
