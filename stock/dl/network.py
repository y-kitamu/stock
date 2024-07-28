"""network.py

Author : Yusuke Kitamura
Create Date : 2024-07-15 18:54:15
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import keras
import tensorflow as tf
from pydantic import BaseModel

import gnn


class Network(gnn.layers.BaseNetwork):

    class Params(BaseModel):
        hidden_dim: int = 128
        layer_num: int = 2
        output_dim: int = 1

    def __init__(self, params: Params):
        super().__init__()
        self.parms = params
        self.layers = [
            keras.layers.Dense(params.hidden_dim, activation="relu")
            for _ in range(params.layer_num)
        ] + [keras.layers.Dense(params.output_dim)]

    def call(self, x: tf.Tensor) -> dict[str, tf.Tensor]:
        for layer in self.layers:
            x = layer(x)
        return {"y_pred": x}


class Network2D(gnn.layers.BaseNetwork):
    class Params(BaseModel):
        num_base_filter: int = 32
        num_pools: int = 3
        convs_per_pool: int = 2
        num_classes: int = 1

    def __init__(self, params: Params):
        super().__init__()
        self.params = params
        self.layers = []
