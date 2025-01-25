"""training_policy.py
"""

import numpy as np
import tensorflow as tf
from pydantic import BaseModel

from ..base.base_agent import BaseAgent


class BasePolicy:

    def set_agent(self, agent: BaseAgent):
        self.agent = agent

    def __call__(self, score: tf.Tensor) -> np.ndarray:
        raise NotImplementedError


class RandomPolicy(BasePolicy):
    def __call__(self, score):
        batch_size = score.numpy().shape[0]
        return np.array([self.agent.action_space.sample() for _ in range(batch_size)])


class EpsilonGreedyPolicy(BasePolicy):
    class Params(BaseModel):
        epsilon: float = 0.2

    def __init__(self, params: Params = Params(), **kwargs):
        self.params = params
        self.params.model_copy(update=kwargs)

    def __call__(self, score) -> np.ndarray:
        batch_size = score.numpy().shape[0]
        if np.random.rand() > self.params.epsilon:
            return tf.argmax(score, axis=-1).numpy()
        else:
            return np.array([self.agent.action_space.sample() for _ in range(batch_size)])
