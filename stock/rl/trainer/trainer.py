"""trainer.py
"""

from typing import Any, override

import gymnasium as gym
from pydantic import BaseModel

from ..base.base_agent import BaseAgent
from ..base.base_callback import BaseCallback, CallbackList
from ..base.base_replay_buffer import BaseReplayBuffer
from ..base.base_trainer import BaseTrainer


class Trainer(BaseTrainer):
    class Params(BaseModel):
        max_steps: int = 1000
        batch_size: int = 1000

    def __init__(
        self,
        env: gym.Env,
        agent: BaseAgent,
        replay_buffer: BaseReplayBuffer,
        callbacks: list[BaseCallback] = [],
        params: Params = Params(),
        **kwargs
    ):
        self.params = params
        self.params.model_copy(update=kwargs)
        self.env = env
        self.agent = agent
        self.replay_buffer = replay_buffer
        self.callbacks = CallbackList(callbacks)

        self._epoch_history = []
        self._train_history = []

        self.callbacks.set_trainer(self)

    @property
    def epoch_history(self) -> list[Any]:
        return self._epoch_history

    @property
    def train_history(self) -> list[Any]:
        return self._train_history

    @override
    def train(self):
        try:
            self.callbacks.on_train_begin()
            self._train_history = []

            for epoch in range(self.params.max_steps):
                self.callbacks.on_epoch_begin(epoch)
                self._epoch_history = []
                total_reward = 0.0
                observation, info = self.env.reset()

                while True:
                    self.callbacks.on_step_begin(epoch, len(self._epoch_history))
                    action = self.agent.policy(observation)[0]
                    next_observation, reward, terminated, truncated, info = self.env.step(action)
                    total_reward += reward

                    self.replay_buffer.push(
                        epoch, len(self._epoch_history), action, observation, next_observation, reward
                    )
                    observation = next_observation
                    self._epoch_history.append([observation, info, reward, action])

                    loss = None
                    if self.replay_buffer.can_sample(self.params.batch_size):
                        action, obs, next_obs, reward = self.replay_buffer.sample(self.params.batch_size)
                        loss = self.agent.learn(action, obs, next_obs, reward)
                    self._epoch_history[-1].append(loss)

                    self.callbacks.on_step_end(epoch, len(self._epoch_history))
                    if terminated or truncated:
                        break

                self._train_history.append([total_reward])
                observation, info = self.env.reset()

                self.callbacks.on_epoch_end(epoch)
        except Exception:
            raise
        finally:
            self.env.close()
            self.callbacks.on_train_end()

    # def render(self, history):
    #     #plt.plot([h[2] for h in history])
    #     plt.plot()
