"""
"""
from typing import List

import tensorflow as tf
from pydantic import BaseModel


class LossParams(BaseModel):
    name: str


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


class SimulatedLossParams(LossParams):
    n_classes: int
    fee_rate: float = 0.005  # 手数料（デフォルト：約定代金の0.5%）
    high_lows: List[List[int]] = []


class SimulatedLoss(tf.keras.losses.Loss):
    """実際の売買を想定した損失関数
    Args:
        high_lows (List[List[int]]): 入力配列中の高値と安値の列indexのペアリスト
            [[high column index, low column index], ...]
    """

    def __init__(self, params: SimulatedLossParams, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.n_classes = params.n_classes
        self.fee_rate = params.fee_rate
        self.high_lows = params.high_lows

        self.profit_loss = 0.0
        self.variance_loss = 0.0

        self.relu = tf.keras.layers.ReLU()
        assert len(self.high_lows) > 0

    def __call__(self, y_true: tf.Tensor, y_pred: tf.Tensor, sample_weight=None):
        """
        Args:
            y_true (tf.Tensor): [batch_size, features].
            y_pred (tf.Tensor): [batch_size, preds].
        """
        # 翌日の高値・安値の間で儲かるように売買するようにlossを計算する
        profit = 0.0
        for idx, (high_idx, low_idx) in enumerate(self.high_lows):
            high = y_true[:, high_idx]
            low = y_true[:, low_idx]

            ratio = y_pred[:, idx]  # 資産の何割をこの銘柄の売買に使うか
            sell = y_pred[:, self.n_classes + idx] * (1.0 - self.fee_rate)  # 買値
            buy = y_pred[:, self.n_classes * 2 + idx] * (1.0 + self.fee_rate)  # 売値

            # 儲け額
            profit = (sell - buy) * ratio
            # 高値、安値の両方で取引成立しなかった場合は0
            # 高値、安値のどちらかのみで取引成立した場合は、マイナス
            # 高値、安値の両方で取引成立した場合は、プラス
            factor = (sell - high) * self.relu(low - buy) + self.relu(sell - high) * (buy - low)
            profit += tf.reduce_sum(profit * factor)
        self.profit_loss = tf.exp(-profit)

        # できるだけ投資する銘柄数を少なくするようにlossを追加
        self.variance_loss = 1.0 - tf.reduce_mean(tf.math.square(y_pred[:, : self.n_classes]))

        return self.profit_loss + self.variance_loss

    def get_config(self):
        pass
