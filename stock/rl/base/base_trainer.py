"""trainer.py
"""

from typing import Any


class BaseTrainer:

    @property
    def epoch_history(self) -> list[Any]:
        raise NotImplementedError()

    @property
    def train_history(self) -> list[Any]:
        raise NotImplementedError()

    def train(self):
        raise NotImplementedError()

    # def render(self, history):
    #     raise NotImplementedError()
