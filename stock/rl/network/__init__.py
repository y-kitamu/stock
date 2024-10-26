"""__init__.py
"""

import tensorflow as tf


class FCModel(tf.keras.Model):
    def __init__(
        self, output_dim: int, hidden_dim: int, num_hidden_layers: int, hidden_activation: str = "relu"
    ):
        super().__init__()
        self.hidden_layers = [
            tf.keras.layers.Dense(hidden_dim, activation=hidden_activation)
            for _ in range(num_hidden_layers)
        ]
        self.out_layer = tf.keras.layers.Dense(output_dim)

    def call(self, x):
        for layer in self.hidden_layers:
            x = layer(x)
        x = self.out_layer(x)
        return x
