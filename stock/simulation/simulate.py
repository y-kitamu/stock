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
from .base_condition import BaseCondition


class MultiStepStopCondition(BaseCondition):
    """利食いを複数段階で行う"""

    max_loss_rate: float = 0.08  # 買値からの最大損失率
    sell_rates: list[float] = [0.1, 0.2]  # ここまで値上がりしたら売る
    max_days: int = 7 * 6  # 最大保持日数
    buying_price: float = -1
    loss_cut_price: float = -1
    profit_fixed_price: float = -1
    buy_date: date = date.today()


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
    # df = df.filter(pl.col("date") >= start_date)
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
    selling_date = start_date
    while True:
        selling_price = condition.run_simulation()
        if selling_price > 0:
            selling_date = condition.selling_date
            break

    return SimulationResult(
        buying_price=buying_price,
        buying_date=condition.buying_date,
        selling_price=selling_price,
        selling_date=selling_date,
        profit=(selling_price - buying_price) / buying_price,
        duration=selling_date - start_date,
    )
