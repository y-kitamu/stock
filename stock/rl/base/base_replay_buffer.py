"""base_replay_buffer.py
"""


class BaseReplayBuffer:
    def push(self, epoch: int, step: int, action, observation, next_observation, reward):
        raise NotImplementedError

    def sample(self, batch_size: int):
        raise NotImplementedError

    def can_sample(self, batch_size: int) -> bool:
        raise NotImplementedError
