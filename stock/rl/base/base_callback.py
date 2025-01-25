"""base_callback.py
"""

from .base_trainer import BaseTrainer


class BaseCallback:

    @property
    def trainer(self) -> BaseTrainer:
        return self._trainer

    def set_trainer(self, trainer: BaseTrainer):
        self._trainer = trainer

    def on_train_begin(self):
        pass

    def on_train_end(self):
        pass

    def on_epoch_begin(self, epoch: int):
        pass

    def on_epoch_end(self, epoch: int):
        pass

    def on_step_begin(self, epoch: int, step: int):
        pass

    def on_step_end(self, epoch: int, step: int):
        pass


class CallbackList(BaseCallback):
    def __init__(self, callbacks: list[BaseCallback]):
        self.callbacks = callbacks

    def set_trainer(self, trainer: BaseTrainer):
        for callback in self.callbacks:
            callback.set_trainer(trainer)

    def on_train_begin(self):
        for callback in self.callbacks:
            callback.on_train_begin()

    def on_train_end(self):
        for callback in self.callbacks:
            callback.on_train_end()

    def on_epoch_begin(self, epoch: int):
        for callback in self.callbacks:
            callback.on_epoch_begin(epoch)

    def on_epoch_end(self, epoch: int):
        for callback in self.callbacks:
            callback.on_epoch_end(epoch)

    def on_step_begin(self, epoch: int, step: int):
        for callback in self.callbacks:
            callback.on_step_begin(epoch, step)

    def on_step_end(self, epoch: int, step: int):
        for callback in self.callbacks:
            callback.on_step_end(epoch, step)
