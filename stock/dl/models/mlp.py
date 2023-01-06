"""
"""
import tensorflow as tf
from keras.api._v2.keras.layers import LayerNormalization

from . import ModelParams


class MLPParams(ModelParams):
    """ """

    activation: str = "relu"
    n_hidden_layers: int = 2
    n_hidden_layer_units: int = 1024
    dropout_rate: float = 0.5


class MultiLayerPerceptron(tf.keras.layers.Layer):
    def __init__(self, params: MLPParams, **kwargs):
        super().__init__(**kwargs)

        # 変数名を`layers`にすることで`Model.summary`で`expand_nested=True`にするときに表示される
        self.layers = []
        for i in range(params.n_hidden_layers):
            self.layers.append(
                tf.keras.layers.Dense(
                    params.n_hidden_layer_units,
                    activation=params.activation,
                    name=f"hidden_layer_{i}",
                ),
            )
            self.layers.append(tf.keras.layers.LayerNormalization(name=f"hidden_layer_{i}_norm"))
            self.layers.append(
                tf.keras.layers.Dropout(params.dropout_rate, name=f"hidden_layer_{i}_dropout")
            )

    def call(self, inputs):
        for layer in self.layers:
            inputs = layer(inputs)
        return inputs
