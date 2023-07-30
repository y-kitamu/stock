"""
"""
import tensorflow as tf
import tensorflow_probability as tfp
from pydantic import BaseModel


class LossParams(BaseModel):
    name: str = "log_prob"


def get_loss(params: LossParams):
    if params.name == "mse":
        return tf.keras.losses.MeanSquaredError()
    elif params.name == "mae":
        return tf.keras.losses.MeanAbsoluteError()
    elif params.name == "simulated":
        params = SimulatedLossParams(**params.dict())
        return SimulatedLoss(params)
    elif params.name == "log_prob":
        return negative_log_likelihood
    else:
        raise ValueError(f"Unknown loss: {params.name}")


def negative_log_likelihood(y_true: tf.Tensor, y_pred: tfp.distributions.Distribution):
    return tf.math.reduce_mean(-y_pred.log_prob(y_true))


from .simulated_loss import SimulatedLoss, SimulatedLossParams
