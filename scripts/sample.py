"""sample.py

Author : Yusuke Kitamura
Create Date : 2024-09-12 22:48:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
import math
import random
from enum import Enum
from typing import Any

import gymnasium as gym
import matplotlib.pyplot as plt
import numpy as np
import numpy.typing as npt
import polars as pl
from pydantic import BaseModel
from ray.rllib.algorithms.ppo import PPOConfig

import stock


class TradingEnv(gym.Env):
    """前処理済み（特徴量計算済み）のpl.DataFrameを入力として、
    step毎に状態を変化させ、報酬を返す環境クラス
    """

    def __init__(self, env_config):
        super().__init__()
        self.dataloader: DataLoader = env_config["dataloader"]
        self.portfolio: Portfolio = env_config["portfolio"]
        self.current_index = 1
        self.total_reward = 0
        self.history = []

        self.action_space = self.portfolio.action_space
        self.observation_space = self.dataloader.observation_space

    def step(self, action) -> tuple[np.ndarray, float, bool, bool, dict[str, Any]]:
        if self.current_index >= len(self.dataloader):
            raise RuntimeError("Episode is done. Please reset the environment.")

        # breakpoint()
        # print("keys = ", action.keys())
        reward = self.portfolio.action(self.dataloader.get_ohlcv(self.current_index), Action(action))
        obs = self.dataloader[self.current_index]
        self.current_index += 1
        is_terminated = self.current_index >= len(self.dataloader)
        is_truncated = False
        info = {
            "index": self.current_index - 1,
            "action": action,
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

    def reset(
        self, *, seed: int | None = None, options: dict[str, Any] | None = None
    ) -> tuple[np.ndarray, dict[str, Any]]:
        self.current_index = 1
        self.total_reward = 0
        self.history = []
        self.dataloader.reset()
        self.portfolio.reset()
        return self.dataloader[0], {}

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

        fig, axes = plt.subplots(1, 1, figsize=(10, 5))
        axes.plot(df["index"], df["price"], label="price")
        axes.scatter(sell_df["index"], sell_df["price"], marker="^", color="red", label="sell")
        axes.scatter(buy_df["index"], buy_df["price"], marker="v", color="green", label="buy")

    def close(self):
        pass


dataloader = DataLoader("BTC", datetime.datetime(2022, 1, 1), datetime.datetime(2023, 1, 1), 1440, 25)
portfolio = Portfolio(100000)

config = (
    PPOConfig()
    .api_stack(
        enable_rl_module_and_learner=True,
        enable_env_runner_and_connector_v2=True,
    )
    .learners(
        num_learners=0,
        num_gpus_per_learner=0,
    )
    .training(
        gamma=0,
        lr_schedule=[
            [0, 1e-1],
            [int(1e2), 1e-2],
            [int(1e3), 1e-3],
            [int(1e4), 1e-4],
            [int(1e5), 1e-5],
            [int(1e6), 1e-6],
            [int(1e7), 1e-7],
        ],
        lr=8e-6,
        model={"uses_new_env_runners": True},
        lambda_=0.72,
        vf_loss_coeff=0.5,
        entropy_coeff=0.01,
    )
    .environment(
        clip_rewards=True,
        env=TradingEnv,
        env_config={
            "dataloader": dataloader,
            "portfolio": portfolio,
        },
    )
)
algo = config.build()


for i in range(30):
    # result = algo.train()
    result = algo.train()
    # if result["env_runners"]["episode_return_mean"] > 0:
    #     break
    # breakpoint()
    print("Episode reward mean: ", result["env_runners"]["episode_return_mean"])

checkpoint_dir = algo.save_to_path()
