"""
"""
import tensorflow as tf

from . import LossParams


class SimulatedLossParams(LossParams):
    n_classes: int = -1
    fee_rate: float = 0.005  # 手数料（デフォルト：約定代金の0.5%）
    profit_scale: float = 1.0  # 利益のスケール（デフォルト：100倍、値が小さくなりすぎるのを回避）
    profit_loss_weight: float = 1.0  # 儲けが大きくなるようにするlossの重み
    variance_loss_weight: float = 1.0  # lossの正規化項の重み
    no_contract_weight: float = 0.1  # 何も取引しなかった場合のペナルティの重み


class SimulatedLoss(tf.keras.losses.Loss):
    """実際の売買を想定した損失関数
    Args:
        high_lows (List[List[int]]): 入力配列中の高値と安値の列indexのペアリスト
            [[high column index, low column index], ...]
    """

    def __init__(self, params: SimulatedLossParams, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.params = params

        self.profit_loss = 0.0
        self.variance_loss = 0.0

        self.relu = tf.keras.layers.ReLU()
        assert len(self.params.high_lows) > 0

    def __call__(self, y_true: tf.Tensor, y_pred: tf.Tensor, debug=False):
        """
        TODO: lossの妥当性、値は検証の必要あり
        Args:
            y_true (tf.Tensor): [batch_size, features].
            y_pred (tf.Tensor): [batch_size, preds].
        """
        if debug:
            self.debug_info = []

        # 資産の割合の合計が1になるように正規化
        ratios = tf.nn.softmax(y_pred[:, : self.params.n_classes], axis=1)
        # 翌日の高値・安値の間で儲かるように売買するようにlossを計算する
        total_profit = 0.0
        for idx, (high_idx, low_idx) in enumerate(self.params.high_lows):
            high = y_true[:, high_idx]
            low = y_true[:, low_idx]
            ratio = ratios[:, idx]  # 資産の何割をこの銘柄の売買に使うか
            sell = y_pred[:, self.params.n_classes + idx] * (1.0 - self.params.fee_rate)  # 買値
            buy = y_pred[:, self.params.n_classes * 2 + idx] * (1.0 + self.params.fee_rate)  # 売値

            # 儲け額
            profit = (
                ratio * tf.abs(sell - buy) / (tf.abs(sell + buy) + 1e-5) * self.params.profit_scale
            )
            # 高値、安値の両方で取引成立しなかった場合は0
            # 高値、安値のどちらかのみで取引成立した場合は、マイナス
            # 高値、安値の両方で取引成立した場合は、プラス
            factor = (high - sell) * self.relu(buy - low) + self.relu(high - sell) * (buy - low)
            # 高値、安値の両方で取引成立しなかった場合はマイナスfactorを加える
            factor -= self.params.no_contract_weight * self.relu(sell - high) * self.relu(low - buy)

            # 銘柄ごとの価格差によるscaleを考慮して補正
            # factor /= tf.square((high + low + 1e-3) / 100.0)

            total_profit += tf.reduce_sum(profit * factor)

            if debug:
                self.debug_info.append(
                    {
                        "high": high.numpy(),
                        "low": low.numpy(),
                        "ratio": ratio.numpy(),
                        "sell": sell.numpy(),
                        "buy": buy.numpy(),
                        "profit": profit.numpy(),
                        "factor": factor.numpy(),
                    }
                )

        self.profit_loss = tf.exp(-total_profit / len(self.params.high_lows))

        # できるだけ投資する銘柄数を少なくするようにlossを追加
        self.variance_loss = tf.reduce_sum(1.0 - tf.reduce_mean(tf.math.square(ratios), axis=1))

        return (
            self.params.profit_loss_weight * self.profit_loss
            + self.params.variance_loss_weight * self.variance_loss
        )

    def get_loss_detail(self):
        """ """
        return {
            "profit_loss": self.profit_loss.numpy(),
            "variance_loss": self.variance_loss.numpy(),
        }

    def get_config(self):
        pass
