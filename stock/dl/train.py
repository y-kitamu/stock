"""
"""
from pathlib import Path
from typing import Optional

import numpy as np
import tensorflow as tf
from pydantic import BaseModel

from .. import logger
from .callbacks import SummaryWriter
from .dataset import Dataset, DatasetParams
from .losses import LossParams, get_loss
from .models import ModelParams, load_model

# TODO: 実験管理ツールの導入（omniboard + sacred を試してみる）


class TrainerParams(BaseModel):
    """ """

    dataset_params: DatasetParams
    model_params: ModelParams
    loss_params: LossParams

    epochs: int = 10
    n_output_classes: int = -1
    output_dir: Path


class Trainer:
    LOG_DIR = "logs"
    CHECKPOINT_DIR = "checkpoints"
    CHECKPOINT_TEMPLATE = "ckpt-{step:08d}"

    def __init__(self, params: TrainerParams):
        """ """
        self.params = params
        self.dataset = Dataset(self.params.dataset_params)

        self.step = tf.Variable(0, trainable=False)
        self.base_model = None
        self.model = None
        self.loss_fn = None
        self.optimizer = None
        self.checkpoint = None

        self.callbacks = tf.keras.callbacks.CallbackList([])

    def build(self):
        """モデル、loss関数、optimizerを作成する
        constructorではなく、別メソッドにしているのは、
        これらの初期化に必要な情報をconstructr時には(`self.params`に)持っていない可能性があるため。
        """
        self.base_model = load_model(params=self.params.model_params)
        self.model = tf.keras.Sequential(
            [
                self.base_model,
                tf.keras.layers.Dense(self.params.n_output_classes),
            ]
        )

        inputs = tf.keras.Input(
            shape=(self.params.dataset_params.input_width, self.dataset.num_features)
        )
        self.model(inputs)

        self.loss_fn = get_loss(self.params.loss_params)
        self.optimizer = tf.keras.optimizers.Adam()

        self.checkpoint = tf.train.Checkpoint(
            step=self.step, model=self.model, optimizer=self.optimizer
        )
        self.load()

        self.callbacks = tf.keras.callbacks.CallbackList(
            callbacks=[
                SummaryWriter(self.params.output_dir / self.LOG_DIR, self.step),
            ]
        )

    def train(self):
        """ """
        train_ds, val_ds, test_ds = self.dataset.get_train_val_test_dataset()

        for i in range(self.params.epochs):

            for x, y in train_ds:
                with self.train_writer.as_default(self.step):
                    self.train_step(x, y)
                    self.train_writer.flush()

            with self.val_writer.as_default(self.step):
                val_loss = np.array([self.val_step(x, y) for x, y in val_ds]).mean()

                print(f"Epoch {i}: val_loss={val_loss}")
                tf.summary.scalar("loss", val_loss)
                self.val_writer.flush()

            self.save()

    def train_step(self, x: tf.Tensor, y: tf.Tensor, debug: bool = False):
        """ """
        with tf.GradientTape() as tape:
            y_pred = self.model(x)
            loss_value = self.loss_fn(y, y_pred, debug=debug)

        grads = tape.gradient(loss_value, self.model.trainable_weights)
        self.optimizer.apply_gradients(zip(grads, self.model.trainable_weights))
        self.step.assign_add(1)

        tf.summary.scalar("loss", loss_value)
        if __debug__:
            losses = self.loss_fn.get_loss_detail()
            detail = " + ".join(f"{key:.4f} = {value:.4f}" for key, value in losses.items())
            print(
                "train loss = {:.4f}, ({})".format(loss_value.numpy(), detail),
                end="\r",
            )

    def load(self):
        """保存済みの学習状態（重み、optimizer、step数）を読み込む
        Args:
            checkpoint_dir (Path, optional): checkpointが保存されているディレクトリのパス.
                Noneの場合は最新の重みを読み込む。
        """
        if self.checkpoint is None:
            logger.warning("`self.checkpoint` is not initialized")
            return

        ckpt_file = tf.train.latest_checkpoint(self.params.output_dir / self.CHECKPOINT_DIR)
        if ckpt_file is None:
            logger.info(f"checkpoint is not found: {ckpt_file}")
            return

        self.checkpoint.restore(ckpt_file)
        logger.info(f"checkpoint is loaded: {ckpt_file}")

    def save(self):
        """現在の状態をチェックポイントファイルに保存する"""
        if self.checkpoint is None:
            logger.warning("`self.checkpoint` is not initialized")
            return

        ckpt_dir = self.params.output_dir / self.CHECKPOINT_DIR
        ckpt_dir.mkdir(parents=True, exist_ok=True)

        checkpoint_path = ckpt_dir / self.CHECKPOINT_TEMPLATE.format(step=self.step.numpy())
        output = self.checkpoint.save(checkpoint_path)
        logger.info(f"checkpoint is saved: {output}")

    def val_step(self, x: tf.Tensor, y: tf.Tensor) -> np.ndarray:
        """ """
        y_pred = self.model(x, training=False)
        loss_value: tf.Tensor = self.loss_fn(y, y_pred)

        return loss_value.numpy()
