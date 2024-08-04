"""short_term_condition.py

Author : Yusuke Kitamura
Create Date : 2024-08-04 17:24:12
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
from typing import override

import polars as pl
from pydantic import ConfigDict

from .base_condition import BaseCondition
from ..algorithm.market import is_limit_high


class ShortTermCondition(BaseCondition):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    # parameter
    max_loss_rate: float = 0.01
    sell_rate: float = 0.01
    max_days: int = 7 * 2
    # results
    buying_price: float = -1
    buying_date: datetime.date = datetime.date.today()
    selling_price: float = -1
    selling_date: datetime.date = datetime.date.today()
    # internal
    loss_cut_price: float = -1
    target_price: float = -1
    index: int = -1
    df: pl.DataFrame = pl.DataFrame()

    def reset_results(self):
        self.buying_price = -1
        self.buying_date = datetime.date.today()
        self.selling_price = -1
        self.selling_date = datetime.date.today()
        self.loss_cut_price = -1
        self.target_price = -1
        self.index = -1
        self.df = pl.DataFrame()

    @override
    def set_start(self, src_df: pl.DataFrame, start_date: datetime.date) -> float:
        # print(src_df)
        self.reset_results()
        df = src_df.filter(pl.col("date") >= start_date).sort(pl.col("date"))
        if len(df) < 15:
            return -1

        if df["date"][0] - start_date > datetime.timedelta(days=10):
            return -1

        if is_limit_high(df["close"][0], df["open"][1]):
            return -1

        self.buying_price = df["open"][1]
        self.buying_date = df["date"][1]

        self.loss_cut_price = self.buying_price * (1 - self.max_loss_rate)
        self.target_price = self.buying_price * (1 + self.sell_rate)
        self.df = df
        self.index = 1
        return self.buying_price

    @override
    def run_simulation(self) -> float:

        if self.df["date"][self.index] - self.buying_date > datetime.timedelta(days=self.max_days):
            self.selling_date = self.df["date"][self.index]
            self.selling_price = self.df["open"][self.index]

        if self.df["low"][self.index] < self.loss_cut_price:
            self.selling_date = self.df["date"][self.index]
            self.selling_price = min(self.df["open"][self.index], self.loss_cut_price)

        if self.df["high"][self.index] > self.target_price:
            self.selling_date = self.df["date"][self.index]
            self.selling_price = max(self.df["open"][self.index], self.target_price)

        self.index += 1
        return self.selling_price
