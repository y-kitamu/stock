"""rs_short_simulator.py
Relative Strengthが高い（高すぎる）銘柄を空売りする戦略のsimulation
Author : Yusuke Kitamura
Create Date : 2024-05-01 21:11:19
"""

import datetime
from typing import Any

import numpy as np
import polars as pl
from pydantic import BaseModel

from ..constants import PROJECT_ROOT
from ..kabutan import read_data_csv


def collect_relative_strengths_to_df(start_date, end_date):
    # csvを読み込んでrelative strengthを取得
    dfs = []
    for csv_path in sorted((PROJECT_ROOT / "data" / "daily").glob("*.csv")):
        df = (
            read_data_csv(csv_path, exclude_none=False)
            .select(pl.col("date"), pl.col("rs_topix").alias(csv_path.stem))
            .filter((start_date <= pl.col("date")) & (pl.col("date") <= end_date))
        )
        if (df[csv_path.stem] < 0).any():
            continue
        dfs.append(df)

    # 銘柄別のdataframeを一つのdataframeにまとめる
    max_length = max([len(df) for df in dfs])
    dfs = [df for df in dfs if len(df) == max_length]
    codes = [df.columns[1] for df in dfs]
    rs_array = np.stack([df[df.columns[1]].to_numpy() for df in dfs]).transpose()
    df = pl.from_numpy(rs_array, codes)
    df = df.hstack([dfs[0]["date"]])
    return df  # columns ; 銘柄ごとの日毎のrelative strength


class Transaction(BaseModel):
    code: str
    buy_date: datetime.datetime
    buy_value: float
    sell_date: datetime.datetime | None = None
    sell_value: float | None = None
    profit_rate: float | None = None
    values: dict[str, Any] = {}


class BaseSimulator:

    def __init__(
        self,
        patient_rate: float = 0.1,
        trailing_start_rate: float = 0.15,
        trailing_stop_rate: float = 0.1,
    ):
        self.patient_rate = patient_rate
        self.trailing_start_rate = trailing_start_rate
        self.trailing_stop_rate = trailing_stop_rate

        self.portfolio: dict[str, Transaction] = {}  # 現在保有している銘柄
        self.current_dfs: dict[str, pl.DataFrame] = {}  # 現在保有している銘柄の株価データ
        self.total_profit = 0.0
        self.unrealized_gain = 0.0
        self.results: list[Transaction] = []  # 取引結果

        self.valid_dates = read_data_csv(
            PROJECT_ROOT / "data/daily/0000.csv", exclude_none=False, with_rs=False
        )["date"]

    def _get_target_codes_of(self, date: datetime.datetime):
        """指定した日付のportfolioの銘柄を取得する。Noneを返した場合はその日は売買を行わない。"""

    def _calc_realized_gain(
        self, df: pl.DataFrame, result: Transaction, end_date: datetime.datetime
    ):
        """ """

    def _update_portfolio(self, date: datetime.datetime, new_codes: list[str]):
        """portfolioを更新する"""
        current_codes = sorted(self.portfolio.keys())
        # target_codesの銘柄がcurrent_codesに含まれていない場合はその日の始値で新しく購入
        for new_code in new_codes:
            if new_code in current_codes:
                continue
            df = read_data_csv(PROJECT_ROOT / f"data/daily/{new_code}.csv")
            df = df.filter(date <= pl.col("date")).sort(pl.col("date"))
            self.portfolio[new_code] = Transaction(
                code=new_code, buy_date=date, buy_value=df["open"][0]
            )
            self.current_dfs[new_code] = df

        # portfolioの銘柄がnew_codesに含まれていない場合は損切り or 売却
        for cur_code in current_codes:
            if cur_code in new_codes:
                continue
            df = self.current_dfs.pop(cur_code)
            result = self.portfolio.pop(cur_code)
            self._calc_realized_gain(df, result, date)
            self.results.append(result)
            if result.profit_rate is not None:
                self.total_profit += result.profit_rate

        # 含み益を計算
        self.unrealized_gain = 0.0
        for code, transaction in self.portfolio.items():
            df = self.current_dfs[code].filter(date <= pl.col("date"))
            close_value = df["close"][0]
            self.unrealized_gain += close_value / transaction.buy_value - 1.0

    def _simulate_day(self, date: datetime.datetime):
        """ """
        new_codes = self._get_target_codes_of(date)
        if new_codes is None:
            return

        self._update_portfolio(date, new_codes)
        print(
            "date: {}, Realized profit : {}, Unrealized profit : {}, codes : {}".format(
                date, self.total_profit, self.unrealized_gain, self.portfolio.keys()
            )
        )

    def _simulate(
        self, start_date: datetime.datetime, end_date: datetime.datetime = datetime.datetime.today()
    ):
        """ """
        self.valid_dates = self.valid_dates.filter(
            (start_date <= self.valid_dates) & (self.valid_dates <= end_date)
        )
        date = start_date
        while date <= end_date:
            date += datetime.timedelta(days=1)
            if date.date() not in [d.date() for d in self.valid_dates]:
                # print("date not in valid_dates : {}".format(date))
                continue
            self._simulate_day(date)


class RSShortSimulator(BaseSimulator):
    def __init__(
        self,
        *args,
        is_sell: bool,
        num_distribution: int = 5,
        rs_min: float = 0.0,
        rs_max: float = 10000.0,
        **kwargs,
    ):
        super().__init__(*args, **kwargs)
        self.rs_min = rs_min
        self.rs_max = rs_max
        self.is_sell = is_sell
        self.num_distribution = num_distribution

    def _collect_relative_strength(
        self, start_date: datetime.datetime, end_date: datetime.datetime, rs_min, rs_max
    ):
        """ """
        df = collect_relative_strengths_to_df(start_date, end_date)
        # 日毎にrelative strenghが高い上位5銘柄を取得
        self.daily_codes = {}
        for row in df.iter_rows():
            date = row[-1]
            vals = np.array(row[:-1])
            codes = df.columns
            rs_indices = vals.argsort()[::-1]
            self.daily_codes[date] = [
                codes[idx] for idx in rs_indices if rs_min < vals[idx] < rs_max
            ][: self.num_distribution]

    def _get_target_codes_of(self, date: datetime.datetime):
        """ """
        df = self.valid_dates.filter(self.valid_dates < date)
        if len(df) == 0:
            return None
        return self.daily_codes[df[-1]]

    def _calc_realized_gain(self, df: pl.DataFrame, result: Transaction, end_date: Any):
        if self.is_sell:
            return self._calc_realized_gain_sell(df, result, end_date)
        return self._calc_reslized_gain_buy(df, result, end_date)

    def _calc_reslized_gain_buy(
        self, df: pl.DataFrame, result: Transaction, end_date: datetime.datetime
    ):
        """買いシミュレーション"""
        df = df.filter(pl.col("date") <= end_date).sort("date")
        patient_value = result.buy_value * (1.0 - self.patient_rate)
        trailint_start = result.buy_value * (1.0 + self.trailing_start_rate)
        sell_value = df["open"][-1]
        sell_date = df["date"][-1]
        for i in range(len(df) - 1):
            if df["high"][i] > trailint_start:
                patient_value = df["high"][i] * (1.0 - self.trailing_stop_rate)
            if df["low"][i] < patient_value:
                sell_value = min(df["high"][i], patient_value)
                sell_date = df["date"][i]
                break

        result.sell_value = sell_value
        result.sell_date = sell_date
        result.profit_rate = result.sell_value / result.buy_value - 1.0
        result.values["rs_topix_start"] = df["rs_topix"][0]
        result.values["rs_topix_end"] = df["rs_topix"][i]
        # print("Realize gain ; code = {}, buy = {}, sell = {}, end = {}, profit = {}".format(
        #    result.code, result.buy_date.date(), result.sell_date.date(), end_date.date(), result.profit_rate
        # ))

    def _calc_realized_gain_sell(
        self, df: pl.DataFrame, result: Transaction, end_date: datetime.datetime
    ):
        """空売りシミュレーション"""
        df = df.filter(pl.col("date") <= end_date).sort("date")
        patient_value = result.buy_value * (1.0 + self.patient_rate)
        trailint_start = result.buy_value * (1.0 - self.trailing_start_rate)
        sell_value = df["open"][-1]
        sell_date = df["date"][-1]
        for i in range(len(df) - 1):
            if df["low"][i] < trailint_start:
                patient_value = df["low"][i] * (1.0 + self.trailing_stop_rate)
            if df["high"][i] > patient_value:
                sell_value = max(df["low"][i], patient_value)
                sell_date = df["date"][i]
                break

        result.sell_value = result.buy_value
        result.sell_date = result.buy_date
        result.buy_value = sell_value
        result.buy_date = sell_date
        result.profit_rate = result.sell_value / result.buy_value - 1.0
        result.values["rs_topix_start"] = df["rs_topix"][0]
        result.values["rs_topix_end"] = df["rs_topix"][i]

    def simulate(
        self, start_date: datetime.datetime, end_date: datetime.datetime = datetime.datetime.today()
    ):
        self._collect_relative_strength(
            start_date, end_date, rs_min=self.rs_min, rs_max=self.rs_max
        )
        return self._simulate(start_date, end_date)
