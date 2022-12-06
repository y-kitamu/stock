"""
"""

import tensorflow as tf
from pydantic import BaseModel


class ModelParams(BaseModel):
    name: str


class LSTMParams(ModelParams):
    """ """

    n_units: int = 128


def load_model(params: ModelParams):
    """ """
    if params.name == "lstm":
        params = LSTMParams(**params.dict())
        return tf.keras.layers.LSTM(params.n_units)

    raise ValueError(f"Unknown model: {params.name}")
