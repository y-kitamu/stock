"""
"""

import tensorflow as tf
from pydantic import BaseModel


class ModelParams(BaseModel):
    name: str = "lstm"


class NNParams(ModelParams):
    """ """

    n_units: int = 32


class LSTMParams(ModelParams):
    """ """

    n_units: int = 128


def load_model(params: ModelParams):
    """ """
    if params.name == "nn":
        params = NNParams(**params.dict())
        return tf.keras.layers.Dense(params.n_units)
    elif params.name == "lstm":
        params = LSTMParams(**params.dict())
        return tf.keras.layers.LSTM(params.n_units)

    raise ValueError(f"Unknown model: {params.name}")
