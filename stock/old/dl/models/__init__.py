"""
"""

import tensorflow as tf
from pydantic import BaseModel


class ModelParams(BaseModel):
    name: str = "mlp"


class LSTMParams(ModelParams):
    """ """

    n_units: int = 128


def load_model(params: ModelParams):
    """ """
    if params.name == "mlp":
        params = MLPParams(**params.dict())
        return MultiLayerPerceptron(params)
    elif params.name == "lstm":
        params = LSTMParams(**params.dict())
        return tf.keras.layers.LSTM(params.n_units)

    raise ValueError(f"Unknown model: {params.name}")


from .mlp import MLPParams, MultiLayerPerceptron
