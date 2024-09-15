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
    class Config(BaseModel):
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

    def __init__(self, config: Config):
        self.config = config

        # self.start_date = config.start_date
        # self.end_date = config.end_date
        # self.episode_length = config.episode_length
        # self.window_size = config.window_size
        # self.target_columns = config.target_columns
        self.data = pl.DataFrame()
        self.reset()

    def __len__(self) -> int:
        return len(self.data) - self.config.window_size + 1

    def __getitem__(self, idx: int) -> npt.NDArray[np.float32]:
        return self.get_observation(idx)

    def get_observation(self, idx: int) -> npt.NDArray[np.float32]:
        """指定したindexのobservationデータを取得する"""
        if 0 <= idx < len(self.data) - self.config.window_size + 1:
            return (
                self.data.slice(idx, self.config.window_size)
                .select(*[pl.col(colname) for colname in self.config.target_columns])
                .to_numpy()
                .flatten()
            )
        else:
            raise IndexError

    def get_price(self, idx: int) -> float:
        """指定したindexの終値を取得する"""
        if 0 <= idx < len(self.data) - self.config.window_size + 1:
            return self.data["close"][idx + self.config.window_size - 1]
        else:
            raise IndexError

    def get_ohlcv(self, idx: int) -> npt.NDArray[np.float32]:
        """指定したindexのohlcvデータを取得する"""
        if 0 <= idx < len(self.data) - self.config.window_size + 1:
            return (
                self.data.select(
                    pl.col("open"), pl.col("high"), pl.col("low"), pl.col("close"), pl.col("volume")
                )[idx + self.config.window_size - 1]
                .to_numpy()
                .flatten()
            )
        else:
            raise IndexError

    def reset(self):
        max_offset = (
            int((self.config.end_date - self.config.start_date) / datetime.timedelta(minutes=1))
            - self.config.window_size
            - self.config.episode_length
        )
        offset = random.randint(0, max_offset)
        start_date = self.config.start_date + datetime.timedelta(minutes=offset)
        end_date = start_date + datetime.timedelta(
            minutes=self.config.episode_length + self.config.window_size - 1
        )
        self.data: pl.DataFrame = read_data(self.config.code, start_date, end_date)

    @property
    def observation_space(self) -> gym.spaces.Space[Any]:
        return gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(int(self.config.window_size * len(self.config.target_columns)),),
            dtype=np.float32,
        )
