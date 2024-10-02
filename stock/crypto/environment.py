"""environment.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 16:13:09
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from typing import Any, override

import gymnasium as gym
import matplotlib.pyplot as plt
import numpy as np
import numpy.typing as npt
import polars as pl

from .dataloader import DataLoader
from .portfolio import Action, Portfolio


class TradingEnv(gym.Env[Any, dict[str, Any]]):
    """前処理済み（特徴量計算済み）のpl.DataFrameを入力として、
    step毎に状態を変化させ、報酬を返す環境クラス
    """

    def __init__(self, env_config: dict[str, Any]):
        super().__init__()
        self.dataloader: DataLoader = env_config["dataloader"]
        self.portfolio: Portfolio = env_config["portfolio"]
        self.current_index = 1
        self.total_reward = 0.0
        self.history: list[dict[str, Any]] = []

        self.action_space = self.portfolio.action_space
        self.observation_space = self.dataloader.observation_space

    @override
    def step(
        self, action: dict[str, Any]
    ) -> tuple[npt.NDArray[np.float32], float, bool, bool, dict[str, Any]]:
        if self.current_index >= len(self.dataloader):
            raise RuntimeError("Episode is done. Please reset the environment.")

        reward = self.portfolio.action(self.dataloader.get_ohlcv(self.current_index), Action(action))
        obs = self.dataloader[self.current_index]
        self.current_index += 1
        is_terminated = self.current_index >= len(self.dataloader)
        is_truncated = False
        info: dict[str, Any] = {
            "index": self.current_index - 1,
            "action": action,
            "price": self.dataloader.get_price(self.current_index - 1),
            "reward": reward,
            "total_portfolio": self.portfolio.total,
            "current_cash": self.portfolio.cash,
            "current_equity_value": self.portfolio.equity_value,
            "current_holding_unit": self.portfolio.num_unit,
            "total_reward": self.total_reward,
            "is_terminated": is_terminated,
            "is_truncated": is_truncated,
        }

        self.total_reward += reward
        self.history.append(info)

        return obs, reward, is_terminated, is_truncated, info

    @override
    def reset(
        self, *, seed: int | None = None, options: dict[str, Any] | None = None
    ) -> tuple[npt.NDArray[np.float32], dict[str, Any]]:
        self.current_index = 1
        self.total_reward = 0
        self.history = []
        self.dataloader.reset()
        self.portfolio.reset()
        return self.dataloader[0], {}

    @override
    def render(self):
        if len(self.history) == 0:
            return

        df = pl.from_dicts(self.history)
        df = df.with_columns(
            pl.col("index")
            .map_elements(lambda s: self.dataloader.get_price(s), return_dtype=pl.Float64)
            .alias("price"),
        )

        sellbuy_df = df.filter((pl.col("action") != pl.col("action").shift(1)).fill_null(True))
        sell_df = sellbuy_df.filter(pl.col("action") == 0)
        buy_df = sellbuy_df.filter(pl.col("action") == 1)

        _, axes = plt.subplots(1, 1, figsize=(10, 5))
        _ = axes.plot(df["index"], df["price"], label="price")
        _ = axes.scatter(sell_df["index"], sell_df["price"], marker="^", color="red", label="sell")
        _ = axes.scatter(buy_df["index"], buy_df["price"], marker="v", color="green", label="buy")

    @override
    def close(self):
        pass
