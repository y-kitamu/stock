"""trainer.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 17:25:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
from pathlib import Path
from typing import Any, Type

import gymnasium as gym
import numpy as np
import torch
from pydantic import BaseModel, ConfigDict
from ray.rllib.algorithms.algorithm import Algorithm
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


class TrainParams(BaseModel):
    epoch: int = 30
    dataloader: DataLoader.Params = DataLoader.Params()
    portfolio: Portfolio.Params = Portfolio.Params()
    ray: RayConfig = RayConfig()


class Trainer:

    def __init__(self, params: TrainParams):
        self.params = params
        self.dataloader = DataLoader(params.dataloader)
        self.portfolio = Portfolio(params.portfolio)
        params.ray.environment.env_config["dataloader"] = self.dataloader
        params.ray.environment.env_config["portfolio"] = self.portfolio

        self.config = (
            PPOConfig()
            .api_stack(**params.ray.api_stack.model_dump())
            .learners(**params.ray.learners.model_dump())
            .training(**params.ray.training.model_dump())
            .environment(**params.ray.environment.model_dump())
        )
        self.algo = self.config.build()
        self.checkpoint_dir = ""

    def train(self):
        for i in range(self.params.epoch):
            result = self.algo.train()
            print("Episode reward mean: {}".format(result["env_runners"]["episode_return_mean"]))

        self.checkpoint_dir = self.algo.save_to_path()

    def restore(self, checkpoint_dir: Path | None = None):
        ckpt_dir: Path = Path(checkpoint_dir or self.checkpoint_dir)
        algo = Algorithm.from_checkpoint(ckpt_dir.as_posix())
        rl_module = algo.get_module()
        return rl_module

    def inference(
        self, dataloader: DataLoader, portfolio: Portfolio, checkpoint_dir: Path | None = None
    ):
        rl_module = self.restore(checkpoint_dir=checkpoint_dir)
        env = TradingEnv({"dataloader": dataloader, "portfolio": portfolio})
        obs, info = env.reset()
        while True:
            input = torch.from_numpy(np.array([obs]))
            action_logits = rl_module.forward_inference({"obs": input})["action_dist_inputs"]
            action = torch.argmax(action_logits[0]).numpy()
            obs, reward, is_terminated, is_truncated, _ = env.step(action)
            if is_terminated:
                break
