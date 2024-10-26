"""train_logger.py
"""

from datetime import datetime
from pathlib import Path

import tensorflow as tf

from ...logging import enable_logging_to_file, logger
from ..base.base_callback import BaseCallback


class TrainLogger(BaseCallback):

    def __init__(self, tensorboard_dir: Path | None = None, log_dir: Path | None = None):
        self.train_summary_writer = None
        if tensorboard_dir is not None:
            tensorboard_dir.mkdir(parents=True, exist_ok=True)
            self.train_summary_writer = tf.summary.create_file_writer(str(tensorboard_dir / "train"))

        if log_dir is not None:
            log_file = log_dir / "train_{}.log".format(datetime.now().strftime("%Y%m%d_%H%M%S"))
            enable_logging_to_file(log_file)

    def on_train_begin(self):
        logger.debug("Training is started")

    def on_train_step_end(self, epoch: int, step: int):
        action, obs, next_obs, reward, loss = self.trainer.epoch_history[-1]
        if loss is None:
            return

        print("epoch: {:5d}, step: {:5d}, loss: {:.3f}".format(epoch, step, loss), end="\r")

    def on_epoch_end(self, epoch: int):
        (total_reward,) = self.trainer.train_history[-1]
        logger.debug(f"End epoch {epoch}. total  reward = {total_reward}")

        if self.train_summary_writer is not None:
            with self.train_summary_writer.as_default():
                tf.summary.scalar("total_reward", total_reward, step=epoch)
