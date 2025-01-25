"""base_agent.py

Author : Yusuke Kitamura
Create Date : 2024-10-06 13:56:06
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from pathlib import Path

import gymnasium as gym


class BaseAgent:

    def __init__(self, action_space: gym.Space, observation_space: gym.Space):
        self.action_space = action_space
        self.observation_space = observation_space

    def save_model(self, save_dir: Path) -> Path:
        """モデルを保存する
        Args:
            save_dir (Path): 保存先のディレクトリ
        Return:
            Path : 保存したモデルのパス
        """
        raise NotImplementedError

    def load_model(self, load_dir: Path):
        """モデルを読み込む
        Args:
            load_dir (Path): 読み込むモデルのディレクトリ
        """
        raise NotImplementedError

    def policy(self, observation):
        raise NotImplementedError

    def learn(self, action, observation, next_observation, reward) -> float:
        """学習を行う
        Return:
            float: 学習時の損失関数の値
        """
        raise NotImplementedError
