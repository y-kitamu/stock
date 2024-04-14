"""simulate.py
"""

from datetime import datetime, timedelta
from pathlib import Path

from pydantic import BaseModel

from ..constants import PROJECT_ROOT
from ..kabutan import read_data_csv


class StopCondition(BaseModel):
    """ """

    end_date: datetime | None = None
    max_loss_rate: float = 0.1  # 買値からの最大損失率
    trailing_start_rate: float = 0.2  # 利益が出た場合のトレイリングストップ開始率
    trailing_stop_rate: float = 0.1  # トレイリングストップ率
    # max_duration: int = 30
    # max_loss: float = 0.1
    # max_profit: float = 0.1


class SimulationResult(BaseModel):
    """ """

    buying_price: float
    buying_date: datetime
    selling_price: float
    selling_date: datetime
    profit: float
    duration: timedelta


def run(code: str, start_date: datetime, stop_condition: StopCondition) -> SimulationResult:
    """ """
    csv_path = PROJECT_ROOT / Path(f"data/daily/{code}.csv")
    df = read_data_csv(csv_path, exclude_none=True)
    df = df.filter(df["date"] > start_date)
    if stop_condition.end_date is not None:
        df = df.filter(df["date"] < stop_condition.end_date)

    buying_price = df["open"][0]
    stop_loss_price = buying_price * (1.0 - stop_condition.max_loss_rate)
    trailing_start_price = buying_price * (1.0 + stop_condition.trailing_start_rate)

    selling_price = -1
    selling_date = df["date"][-1]
    for i in range(len(df)):
        if df["high"][i] > trailing_start_price:
            stop_loss_price = max(
                stop_loss_price, df["high"][i] * (1.0 - stop_condition.trailing_stop_rate)
            )

        if df["low"][i] < stop_loss_price:
            selling_price = min(stop_loss_price, df["open"][i])
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
