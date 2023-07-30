from pathlib import Path
from typing import Any, Dict, Optional

import tensorflow as tf
from numpy import logspace


class SummaryWriter(tf.keras.callbacks.Callback):
    VALIDATION = "val_"  # validationのprefixは記録の際に削除する

    def __init__(self, log_dir: Path, step: tf.Variable, **kwargs):
        super().__init__(**kwargs)
        self.log_dir = log_dir
        self.log_dir.mkdir(parents=True, exist_ok=True)
        self.step = step
        self.train_writer = tf.summary.create_file_writer(str(log_dir / "train"))
        self.val_writer = tf.summary.create_file_writer(str(log_dir / "val"))

    def _write(self, logs: Dict[str, Any] = {}):
        logs = logs or {}
        with self.train_writer.as_default(self.step):
            for name, value in logs.items():
                if name.startswith(self.VALIDATION):
                    continue
                tf.summary.scalar(name, value)
        self.train_writer.flush()

        with self.val_writer.as_default(self.step):
            for name, value in logs.items():
                if name.startswith(self.VALIDATION):
                    tf.summary.scalar(name.replace(self.VALIDATION, ""), value)
        self.val_writer.flush()

    def on_train_batch_end(self, batch, logs: Optional[Dict[str, Any]] = None):
        self._write(logs or {})
        return super().on_train_batch_end(batch, logs)

    def on_test_batch_end(self, batch, logs: Optional[Dict[str, Any]] = None):
        self._write(logs or {})
        return super().on_test_batch_end(batch, logs)

    def on_epoch_end(self, epoch, logs: Optional[Dict[str, Any]] = None):
        self._write(logs or {})

    def on_train_end(self, logs: Optional[Dict[str, Any]] = None):
        self._write(logs or {})
        self.train_writer.close()
        self.val_writer.close()

    def __repr__(self):
        return f"{self.__class__.__name__}({self.log_dir})"
