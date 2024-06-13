"""simulate.py
"""

from datetime import date, datetime, timedelta
from pathlib import Path
from types import NotImplementedType

import polars as pl
from pydantic import BaseModel

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


class OnielStopCondition(BaseCondition):
    """William Onielのストップ条件"""

    max_loss_rate: float = 0.08  # 買値からの最大損失率
    sell_rate: float = 0.2  # ここまで値上がりしたら売る
    max_days: int = 7 * 6  # 最大保持日数
    buying_price: float = -1
    loss_cut_price: float = -1
    profit_fixed_price: float = -1
    buy_date: date = date.today()

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
    df = df.filter(df["date"] > start_date)

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
    for i in range(len(df)):
        selling_price = condition.run_simulation(df, i)
        if selling_price > 0:
            selling_date = df["date"][i]
            break

    if selling_price == -1:
        selling_price = df["close"][-1]
        selling_date = df["date"][-1]

    return SimulationResult(
        buying_price=buying_price,
        buying_date=df["date"][0],
        selling_price=selling_price,
        selling_date=selling_date,
        profit=(selling_price - buying_price) / buying_price,
        duration=selling_date - start_date,
    )
