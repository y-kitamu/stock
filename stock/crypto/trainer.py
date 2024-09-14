"""trainer.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 17:25:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
from typing import Any, Type

import gymnasium as gym
from pydantic import BaseModel, ConfigDict
from ray.rllib.algorithms.ppo import PPOConfig

from .dataloader import DataLoader
from .environment import TradingEnv
from .portfolio import Portfolio


class RayConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    class APIStack(BaseModel):
        model_config = ConfigDict(extra="forbid")

        enable_rl_module_and_learner: bool = True
        enable_env_runner_and_connector_v2: bool = True

    class Learners(BaseModel):
        model_config = ConfigDict(extra="forbid")

        num_learners: int = 0
        num_gpus_per_learner: int = 0

    class Training(BaseModel):
        model_config = ConfigDict(extra="forbid")

        gamma: float = 0.0
        lr_schedule: list[list[int | float]] = [
            [0, 1e-1],
            [int(1e2), 1e-2],
            [int(1e3), 1e-3],
            [int(1e4), 1e-4],
            [int(1e5), 1e-5],
            [int(1e6), 1e-6],
            [int(1e7), 1e-7],
        ]
        lr: float = 8e-6
        model: dict[str, bool] = {"uses_new_env_runners": True}
        lambda_: float = 0.72
        vf_loss_coeff: float = 0.5
        entropy_coeff: float = 0.01

    class Environment(BaseModel):
        model_config = ConfigDict(extra="forbid")

        clip_rewards: bool = True
        env: Type[gym.Env] = TradingEnv
        env_config: dict[str, Any] = {}

    api_stack: APIStack = APIStack()
    learners: Learners = Learners()
    training: Training = Training()
    environment: Environment = Environment()


class Trainer:

    def __init__(self, config: RayConfig):
        self.dataloader = DataLoader(
            "BTC", datetime.datetime(2022, 1, 1), datetime.datetime(2023, 1, 1), 1440, 25
        )
        self.portfolio = Portfolio(100000)
        config.environment.env_config["dataloader"] = self.dataloader
        config.environment.env_config["portfolio"] = self.portfolio

        self.config = (
            PPOConfig()
            .api_stack(**config.api_stack.dict())
            .learners(**config.learners.dict())
            .training(**config.training.dict())
            .environment(**config.environment.dict())
        )
        self.algo = self.config.build()

    def train(self):
        for i in range(30):
            result = self.algo.train()
            print("Episode reward mean: {}".format(result["env_runners"]["episode_return_mean"]))

        checkpoint_dir = self.algo.save_to_path()
