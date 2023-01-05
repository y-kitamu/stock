"""
"""
from pathlib import Path
from typing import Optional

import numpy as np
import tensorflow as tf
import tensorflow_probability as tfp
from pydantic import BaseModel

from .. import logger
from .callbacks import SummaryWriter
from .dataset import Dataset, DatasetParams
from .losses import LossParams, get_loss
from .models import ModelParams, load_model

# TODO: 実験管理ツールの導入（omniboard + sacred を試してみる）


class TrainerParams(BaseModel):
    """ """

    dataset_params: DatasetParams = DatasetParams()
    model_params: ModelParams = ModelParams()
    loss_params: LossParams = LossParams()

    epochs: int = 10
    output_dir: Path


class Trainer:
    LOG_DIR = "logs"
    CHECKPOINT_DIR = "checkpoints"
    CHECKPOINT_TEMPLATE = "ckpt-{step:08d}"

    def __init__(self, params: TrainerParams):
        """ """
        self.params = params
        self.dataset = Dataset(self.params.dataset_params)

        self.step = tf.Variable(0, trainable=False, dtype=tf.int64)
        self.base_model = load_model(params=self.params.model_params)
        n_output = self.dataset.num_output_features
        self.model = tf.keras.Sequential(
            [
                self.base_model,
                tf.keras.layers.Dense(n_output * 2),
                tfp.layers.DistributionLambda(
                    lambda t: tfp.distributions.Normal(
                        t[..., :n_output], tf.math.softplus(t[..., n_output:]) + 1e-5
                    )
                ),
            ]
        )
        self.loss_fn = get_loss(self.params.loss_params)
        self.optimizer = tf.keras.optimizers.Adam()
        self.checkpoint = tf.train.Checkpoint(
            step=self.step, model=self.model, optimizer=self.optimizer
        )

        self.callbacks = tf.keras.callbacks.CallbackList(
            [(SummaryWriter(self.params.output_dir / self.LOG_DIR, self.step))]
        )
        self.callbacks._should_call_train_batch_hooks = True

        self.build()

    def build(self):
        """モデル、loss関数、optimizerを作成する
        constructorではなく、別メソッドにしているのは、
        これらの初期化に必要な情報をconstructr時には(`self.params`に)持っていない可能性があるため。
        """
        inputs = tf.keras.Input(shape=(self.dataset.num_input_features))
        self.model(inputs)
        # 過去の学習状態を読み込む
        self.load()

    def train(self):
        """ """
        if self.model is None or self.loss_fn is None or self.optimizer is None:
            logger.warning("model, loss_fn or optimizer is not initialized")
            return

        train_ds, val_ds, test_ds = self.dataset.get_train_val_test_dataset()

        for i in range(self.params.epochs):
            self.callbacks.on_epoch_begin(i, {})

            for x, y in train_ds:
                self.train_step(x, y)

            val_losses = tf.stack([self.val_step(x, y) for x, y in val_ds])
            val_loss = tf.reduce_mean(val_losses)

            self.save()
            self.callbacks.on_epoch_end(i, {"val_loss": val_loss})

    def train_step(self, x: tf.Tensor, y: tf.Tensor, debug: bool = False) -> np.ndarray:
        """ """
        self.callbacks.on_train_batch_begin(self.step.numpy(), {})

        with tf.GradientTape() as tape:
            y_pred = self.model(x)
            loss_value = self.loss_fn(y, y_pred)

        grads = tape.gradient(loss_value, self.model.trainable_weights)
        self.optimizer.apply_gradients(zip(grads, self.model.trainable_weights))

        self.callbacks.on_train_batch_end(
            self.step.numpy(),
            {"lr": self.optimizer.lr, "loss": loss_value},
        )

        # if __debug__:
        #     losses = self.loss_fn.get_loss_detail()
        #     detail = " + ".join(f"{key:.4f} = {value:.4f}" for key, value in losses.items())
        #     print(
        #         "train loss = {:.4f}, ({})".format(loss_value.numpy(), detail),
        #         end="\r",
        #     )
        self.step.assign_add(1)
        return loss_value

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

    def val_step(self, x: tf.Tensor, y: tf.Tensor) -> tf.Tensor:
        """ """
        self.callbacks.on_test_batch_begin(self.step.numpy(), {})

        y_pred = self.model(x, training=False)
        loss_value: tf.Tensor = self.loss_fn(y, y_pred)

        self.callbacks.on_test_batch_end(self.step.numpy(), {})

        return loss_value
