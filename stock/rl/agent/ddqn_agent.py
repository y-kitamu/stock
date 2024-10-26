"""ddqn_agent.py
Double DQN agent
"""

from pathlib import Path

import gymnasium as gym
import tensorflow as tf
from pydantic import BaseModel

from ...logging import logger
from ..base.base_agent import BaseAgent
from .training_policy import BasePolicy


class DDQNAgent(BaseAgent):
    class Params(BaseModel):
        min_steps_per_copy: int = 100  # 何ステップごとに重みをコピーするか
        max_steps_per_copy: int = 2000
        steps_increment: int = 100
        gamma: float = 0.99  # 割引率

    def __init__(
        self,
        action_space: gym.Space,
        observation_space: gym.Space,
        action_network: tf.keras.Layer,  # 行動選択用network
        value_network: tf.keras.Layer,  # 価値推定用network
        optimizer: tf.keras.optimizers.Optimizer,
        training_policy: BasePolicy,
        params: Params = Params(),
        **kwargs,
    ):
        super().__init__(action_space, observation_space)
        self.action_network = action_network
        self.value_network = value_network
        self.optimizer = optimizer
        self.training_policy = training_policy
        self.params = params.model_copy(update=kwargs)
        self.steps = 0
        self.steps_per_copy = self.params.min_steps_per_copy

        self.training_policy.set_agent(self)

    def _copy_weight(self):
        for vl, al in zip(
            self.value_network.trainable_variables, self.action_network.trainable_variables
        ):
            vl.assign(al.numpy())

    def save_model(self, save_dir: Path) -> Path:
        checkpoint = tf.train.Checkpoint(network=self.action_network, optimizer=self.optimizer)
        save_path = checkpoint.save(file_prefix=save_dir / "ckpt")
        if save_path is None:
            logger.warning("Model is not saved")
        return Path(save_path)

    def load_model(self, load_dir: Path):
        checkpoint = tf.train.Checkpoint(network=self.action_network, optimizer=self.optimizer)
        latest_path = tf.train.latest_checkpoint(load_dir)
        if latest_path is not None:
            checkpoint.restore(latest_path)
            logger.debug(f"Model is loaded from {latest_path}")
        else:
            logger.warning(f"Model is not found in {load_dir}")

    def policy(self, observation, return_softmax=False, training=True):
        observation = tf.convert_to_tensor(observation, dtype=tf.float32)
        observation = tf.expand_dims(observation, axis=0)
        x = self.action_network(observation)
        if return_softmax:
            return x

        if training:
            action = self.training_policy(x)
        else:
            action = tf.argmax(x, axis=-1).numpy()[0]

        return action

    def learn(self, action, observation, next_observation, reward) -> float:
        if self.steps % self.steps_per_copy == 0:
            self._copy_weight()
            self.steps_per_copy = min(self.params.steps_increment, self.params.max_steps_per_copy)
        self.steps += 1

        oh_action = tf.one_hot(action, self.action_space.n)
        with tf.GradientTape() as tape:
            q = tf.reduce_sum(self.action_network(observation) * oh_action, axis=-1)
            oh_next_action = tf.one_hot(
                tf.argmax(self.action_network(next_observation), axis=-1), self.action_space.n
            )
            q_next = tf.reduce_sum(self.value_network(next_observation) * oh_next_action, axis=-1)
            loss = tf.reduce_mean(tf.square(q - (reward + self.params.gamma * q_next)))

        gradients = tape.gradient(loss, self.action_network.trainable_variables)
        self.optimizer.apply_gradients(zip(gradients, self.action_network.trainable_variables))
        return loss.numpy()
