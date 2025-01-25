"""DQNAgent.py
Deep Q-Learning agent
"""

from typing import TYPE_CHECKING

import gymnasium as gym
import numpy as np
import tensorflow as tf
from pydantic import BaseModel

from ..base.base_agent import BaseAgent
from .training_policy import BasePolicy


class DQNAgent(BaseAgent):
    class Params(BaseModel):
        pass

    def __init__(
        self,
        action_space: gym.Space,
        observation_space: gym.Space,
        network: tf.keras.Layer,
        optimizer: tf.keras.optimizers.Optimizer,
        training_policy: BasePolicy,
        params: Params = Params(),
        **kwargs
    ):
        super().__init__(action_space, observation_space)
        self.network = network
        self.optimizer = optimizer
        self.training_policy = training_policy
        self.params = params
        self.params.model_copy(update=kwargs)

        self.training_policy.set_agent(self)

    def policy(self, observation, return_softmax=False, training=True):
        observation = np.array(observation)
        if len(observation.shape) == 1:
            observation = observation[None]
        x = tf.convert_to_tensor(observation, dtype=tf.float32)
        x = self.network(x)
        if return_softmax:
            return x

        if training:
            action = self.training_policy(x)
        else:
            action = tf.argmax(x, axis=-1).numpy()[0]

        return action

    def learn(self, action, observation, next_observation, reward):
        oh_action = tf.one_hot(action, self.action_space.n)
        with tf.GradientTape() as tape:
            q = tf.reduce_sum(self.policy(observation, return_softmax=True) * oh_action, axis=-1)
            q_next = tf.reduce_max(self.policy(next_observation, return_softmax=True), axis=-1)
            loss = tf.reduce_mean(tf.square(q - (reward + q_next)))

        grads = tape.gradient(loss, self.network.trainable_weights)
        self.optimizer.apply_gradients(zip(grads, self.network.trainable_weights))
