"""simulate.py
"""

from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

import polars as pl
from pydantic import BaseModel

from ..algorithm.market import is_limit_high
from ..constants import PROJECT_ROOT
from ..kabutan import read_data_csv


class BaseCondition(BaseModel):
    """ """

    def set_start(self, df: pl.DataFrame, start_date: date) -> float:
        raise NotImplementedError

    def run_simulation(self, df: pl.DataFrame, index: int) -> float:
        """`index`の日付のsimulationを実行
        Returns:
            float: 売値 (売らない場合は-1)
        """
        raise NotImplementedError

    def get_selling_price(self, df: pl.DataFrame, index: int) -> float:
        """`index`の日付での売値を取得
        Returns:
            float: 売値
        """
        raise NotImplementedError


class MultiStepStopCondition(BaseCondition):
    """利食いを複数段階で行う"""

    max_loss_rate: float = 0.08  # 買値からの最大損失率
    sell_rates: list[float] = [0.1, 0.2]  # ここまで値上がりしたら売る
    max_days: int = 7 * 6  # 最大保持日数
    buying_price: float = -1
    loss_cut_price: float = -1
    profit_fixed_price: float = -1
    buy_date: date = date.today()


class CustomStopCondition(BaseCondition):

    max_loss_rate: float = 0.1  # 買値からの最大損失率
    trailling_stop_rate: float = 0.2  # ここまで値下がりしたら売る
    sell_rate: float = 0.5  # ここまで値上がりしたら半分売る
    max_days: int = 7  # 最大保持日数
    total_max_days: int = 7 * 4  # 最大保持日数
    buying_price: float = -1
    loss_cut_price: float = -1
    profit_fixed_price: float = -1
    buy_date: date = date.today()
    reach_target_price: bool = False
    target_selling_price: float = -1

    def set_start(self, df: pl.DataFrame, start_date: date) -> float:
        df = df.filter(pl.col("date") >= start_date).sort(pl.col("date"))
        if df["date"][0] - start_date > timedelta(days=10):
            return -1

        if is_limit_high(df["close"][0], df["open"][1]):
            return -1

        self.buying_price = df["open"][1]
        self.loss_cut_price = self.buying_price * (1 - self.max_loss_rate)
        self.profit_fixed_price = self.buying_price * (1 + self.sell_rate)
        self.buy_date = df["date"][1]
        return self.buying_price

    def run_simulation(self, df: pl.DataFrame, index: int) -> float:
        """ """
        # 最大保持日数を超えた場合は売る
        if df["date"][index] - self.buy_date > timedelta(days=self.total_max_days):
            if self.reach_target_price:
                return (self.target_selling_price + min(self.loss_cut_price, df["open"][index])) * 0.5
            return df["open"][index]

        # 値上がりも値下がりもせず、一定期間過ぎた場合は売る
        if not self.reach_target_price and df["date"][index] - self.buy_date > timedelta(
            days=self.max_days
        ):
            return df["open"][index]

        # 最大損失率を超えた場合は売る
        if df["low"][index] < self.loss_cut_price:
            if self.reach_target_price:
                return (self.target_selling_price + min(self.loss_cut_price, df["open"][index])) * 0.5
            return min(self.loss_cut_price, df["open"][index])

        # ここまで値上がりしたら半分売る
        if df["high"][index] > self.profit_fixed_price:
            self.reach_target_price = True
            self.target_selling_price = max(self.profit_fixed_price, df["open"][index])

        # 十分値上がりしたらtrailling stop lossを適用
        if self.reach_target_price:
            self.loss_cut_price = max(
                self.loss_cut_price, df["hight"][index] * (1 - self.trailling_stop_rate)
            )

        return -1.0


class OnielStopCondition(BaseCondition):
    """William Onielのストップ条件"""

    max_loss_rate: float = 0.08  # 買値からの最大損失率
    sell_rate: float = 0.2  # ここまで値上がりしたら売る
    max_days: int = 7 * 6  # 最大保持日数
    buying_price: float = -1
    loss_cut_price: float = -1
    profit_fixed_price: float = -1
    buy_date: date = date.today()
    data: dict[str, Any] = {}

    def set_start(self, df: pl.DataFrame, start_date: date) -> float:
        df = df.filter(pl.col("date") > start_date).sort(pl.col("date"))
        if df["date"][0] - start_date > timedelta(days=10):
            return -1
        self.buying_price = df["open"][0]
        self.loss_cut_price = self.buying_price * (1 - self.max_loss_rate)
        self.profit_fixed_price = self.buying_price * (1 + self.sell_rate)
        self.buy_date = start_date
        return self.buying_price

    def run_simulation(self, df: pl.DataFrame, index: int) -> float:
        """ """
        # 値上がりも値下がりもせず、最大保持日数を超えた場合は売る
        if df["date"][index] - self.buy_date > timedelta(days=self.max_days):
            return df["open"][index]

        # 最大損失率を超えた場合は売る
        if df["low"][index] < self.loss_cut_price:
            return min(self.loss_cut_price, df["open"][index])

        # ここまで値上がりしたら売る
        if df["high"][index] > self.profit_fixed_price:
            return max(self.profit_fixed_price, df["open"][index])

        return -1.0

    def get_selling_price(self, df: pl.DataFrame, index: int) -> float:
        """ """

        return -1.0


class SimulationResult(BaseModel):
    """ """

    buying_price: float
    buying_date: date
    selling_price: float
    selling_date: date
    profit: float
    duration: timedelta


def run(code: str, start_date: date, condition: BaseCondition) -> SimulationResult:
    """ """
    csv_path = PROJECT_ROOT / Path(f"data/daily/{code}.csv")
    df = read_data_csv(csv_path, exclude_none=True)
    df = df.filter(pl.col("date") >= start_date)
    if len(df) == 0:
        return SimulationResult(
            buying_price=-1,
            buying_date=start_date,
            selling_price=-1,
            selling_date=start_date,
            profit=0,
            duration=timedelta(days=0),
        )

    buying_price = condition.set_start(df, start_date)
    if buying_price == -1:
        return SimulationResult(
            buying_price=-1,
            buying_date=start_date,
            selling_price=-1,
            selling_date=start_date,
            profit=0,
            duration=timedelta(days=0),
        )

    selling_price = -1
    selling_date = df["date"][-1]
    for i in range(1, len(df)):
        selling_price = condition.run_simulation(df, i)
        if selling_price > 0:
            selling_date = df["date"][i]
            break

    if selling_price == -1:
        selling_price = df["close"][-1]
        selling_date = df["date"][-1]

    return SimulationResult(
        buying_price=buying_price,
        buying_date=df["date"][1],
        selling_price=selling_price,
        selling_date=selling_date,
        profit=(selling_price - buying_price) / buying_price,
        duration=selling_date - start_date,
    )
