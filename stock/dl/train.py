"""
"""
import numpy as np
import tensorflow as tf
from pydantic import BaseModel

from .dataset import Dataset, DatasetParams
from .models import ModelParams, load_model


class TrainerParams(BaseModel):
    """ """

    dataset_params: DatasetParams
    model_params: ModelParams

    epochs: int = 10


class Trainer:
    def __init__(self, params: TrainerParams):
        """ """
        self.params = params
        self.dataset = Dataset(self.params.dataset_params)
        self.base_model = load_model(params=self.params.model_params)
        self.model = tf.keras.Sequential(
            [
                self.base_model,
                tf.keras.layers.Dense(self.dataset.data.shape[-1]),
            ]
        )

        self.loss_fn = tf.keras.losses.MeanSquaredError()
        self.optimizer = tf.keras.optimizers.Adam()

    def train(self):
        """ """
        train_ds, val_ds, test_ds = self.dataset.get_train_val_test_dataset()

        for i in range(self.params.epochs):

            for x, y in train_ds:
                self.train_step(x, y)

            val_loss = np.array([self.val_step(x, y) for x, y in val_ds]).mean()
            print(f"Epoch {i}: val_loss={val_loss}")

    def train_step(self, x: tf.Tensor, y: tf.Tensor):
        """ """
        with tf.GradientTape() as tape:
            y_pred = self.model(x)
            loss_value = self.loss_fn(y, y_pred)

        grads = tape.gradient(loss_value, self.model.trainable_weights)
        self.optimizer.apply_gradients(zip(grads, self.model.trainable_weights))

    def val_step(self, x: tf.Tensor, y: tf.Tensor) -> np.ndarray:
        """ """
        y_pred = self.model(x, training=False)
        loss_value: tf.Tensor = self.loss_fn(y, y_pred)

        return loss_value.numpy()
