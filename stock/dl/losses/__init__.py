"""
"""
import tensorflow as tf
from pydantic import BaseModel


class LossParams(BaseModel):
    name: str = "mae"


def get_loss(params: LossParams):
    if params.name == "mse":
        return tf.keras.losses.MeanSquaredError()
    elif params.name == "mae":
        return tf.keras.losses.MeanAbsoluteError()
    elif params.name == "simulated":
        params = SimulatedLossParams(**params.dict())
        return SimulatedLoss(params)
    else:
        raise ValueError(f"Unknown loss: {params.name}")


from .simulated_loss import SimulatedLoss, SimulatedLossParams
