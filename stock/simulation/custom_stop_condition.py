import datetime

import polars as pl
from pydantic import ConfigDict

from ..algorithm.market import is_limit_high
from .base_condition import BaseCondition


class CustomStopCondition(BaseCondition):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    # 入力パラメータ
    max_loss_rate: float = 0.08  # 買値からの最大損失率
    trailling_stop_rate: float = 0.1  # ここまで値下がりしたら売る
    sell_rate: float = 0.2  # ここまで値上がりしたら半分売る
    max_days: int = 7 * 2  # 最大保持日数
    total_max_days: int = 7 * 4  # 最大保持日数
    # 結果変数
    buying_price: float = -1
    buying_date: datetime.date = datetime.date.today()
    selling_price: float = -1
    selling_date: datetime.date = datetime.date.today()
    # 内部計算用変数
    loss_cut_price: float = -1
    profit_fixed_price: float = -1
    reach_target_price: bool = False
    target_selling_price: float = -1
    highest_updated: bool = False
    index: int = -1
    df: pl.DataFrame = pl.DataFrame()
    src_df: pl.DataFrame = pl.DataFrame()

    def reset_results(self):
        self.buying_price = -1
        self.buying_date = datetime.date.today()
        self.selling_price = -1
        self.selling_date = datetime.date.today()
        self.loss_cut_price = -1
        self.profit_fixed_price = -1
        self.reach_target_price = False
        self.target_selling_price = -1
        self.highest_updated = False
        self.index = -1
        self.df = pl.DataFrame()
        self.src_df = pl.DataFrame()

    def set_start(self, src_df: pl.DataFrame, start_date: datetime.date) -> float:
        self.reset_results()
        df = src_df.filter(pl.col("date") >= start_date).sort(pl.col("date"))
        prev_df = src_df.filter(pl.col("date") < start_date).sort(pl.col("date"))
        if len(df) <= 30:
            return -1

        if df["date"][0] - start_date > datetime.timedelta(days=10):
            return -1

        # stop高は回避
        if is_limit_high(df["close"][0], df["open"][1]):
            return -1

        # ベースから上離れしすぎている場合はスキップ
        if prev_df["close"][-1] * 1.4 < df["open"][1]:
            return -1

        # 前日終値から下がりすぎている場合は買わない
        if df["open"][1] < df["close"][0] * 0.95:
            return -1

        self.buying_price = df["open"][1]
        self.buying_date = df["date"][1]

        self.loss_cut_price = self.buying_price * (1 - self.max_loss_rate)
        self.profit_fixed_price = self.buying_price * (1 + self.sell_rate)
        self.index = 1
        self.df = df
        self.src_df = src_df
        return self.buying_price

    def run_simulation(self) -> float:
        """ """
        # print(df["date"][index], self.target_selling_price, self.loss_cut_price)
        df = self.df
        index = self.index
        # 最大保持日数を超えた場合は売る
        if df["date"][index] - self.buying_date > datetime.timedelta(days=self.total_max_days):
            self.selling_date = df["date"][index]
            if self.reach_target_price:
                self.selling_price = (
                    self.target_selling_price + min(self.loss_cut_price, df["open"][index])
                ) * 0.5
            else:
                self.selling_price = df["open"][index]
            return self.selling_price

        # 値上がりも値下がりもせず、一定期間過ぎた場合は売る
        if not self.reach_target_price and df["date"][index] - self.buying_date > datetime.timedelta(
            days=self.max_days
        ):
            self.selling_price = df["open"][index]
            self.selling_date = df["date"][index]
            return self.selling_price

        # 最大損失率を超えた場合は売る
        if df["low"][index] < self.loss_cut_price:
            self.selling_date = df["date"][index]
            if self.reach_target_price:
                self.selling_price = (
                    self.target_selling_price + min(self.loss_cut_price, df["open"][index])
                ) * 0.5
            else:
                self.selling_price = min(self.loss_cut_price, df["open"][index])
            return self.selling_price

        # ここまで値上がりしたら半分売る
        if df["high"][index] > self.profit_fixed_price and not self.reach_target_price:
            self.reach_target_price = True
            self.target_selling_price = max(self.profit_fixed_price, df["open"][index])

        # 十分値上がりしたらtrailling stop lossを適用
        if self.reach_target_price:
            self.loss_cut_price = max(
                self.loss_cut_price, df["high"][index] * (1 - self.trailling_stop_rate)
            )

        self.index += 1
        return -1.0
