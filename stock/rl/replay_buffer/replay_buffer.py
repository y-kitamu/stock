"""replay_buffer.py
"""

from typing import Any

import numpy as np
from pydantic import BaseModel

from ..base.base_replay_buffer import BaseReplayBuffer


class ReplayBuffer(BaseReplayBuffer):
    class Params(BaseModel):
        capacity: int = 10000
        min_sample_rate: float = 0.5

    def __init__(self, params: Params = Params(), **kwargs):
        self.params = params
        self.params.model_copy(update=kwargs)
        self._buffer = []

    def push(
        self,
        epoch: int,
        step: int,
        action: Any,
        observation: np.ndarray,
        next_observation: np.ndarray,
        reward: float,
    ):
        if len(self._buffer) >= self.params.capacity:
            self._buffer.pop(0)
        self._buffer.append([epoch, step, observation, next_observation, action, reward])

    def sample(self, batch_size: int) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        indices = np.random.randint(0, len(self._buffer), batch_size)
        data = [self._buffer[i] for i in indices]
        observation = np.array([d[2] for d in data])
        next_observation = np.array([d[3] for d in data])
        action = np.array([d[4] for d in data])
        reward = np.array([d[5] for d in data])
        return action, observation, next_observation, reward

    def can_sample(self, batch_size: int) -> bool:
        return len(self._buffer) > batch_size * self.params.min_sample_rate
