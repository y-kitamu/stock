"""technical_v2.py
Create Date : 2024-05-05 11:06:16
"""

import datetime
from pathlib import Path

import numpy as np
import polars as pl

from ..constants import PROJECT_ROOT
from ..kabutan import read_data_csv
from ..algorithm.relative_strength import relative_strength_v2
from .technical import calc_mean_average

csv_dir = PROJECT_ROOT / "data" / "daily"


def get_relative_strength_codes(
    target_date: datetime.date, csv_list: list[Path] | None = None
) -> list[Path]:
    """relative strengthが100以下から100以上になった銘柄を取得"""
    target_list = []
    csv_list = sorted(csv_dir.glob("*.csv")) if csv_list is None else csv_list
    for csv_path in csv_list:
        df = read_data_csv(csv_path, end_date=target_date)
        if len(df) < 2:
            continue
        target_rs, prev_rs = df["rs"][-1], df["rs"][-2]
        if target_rs < 0 or prev_rs < 0:
            continue
        if prev_rs < 1.0 and 1.0 < target_rs:
            target_list.append(csv_path)
    return target_list


def get_near_high_codes(
    target_date: datetime.date,
    csv_list: list[Path] | None = None,
    min_rate_from_low: float = 0.2,  # 安値から何割以上高くなっているか
    near_from_high: float = 0.2,  # 高値からどれくらい近くにいるか
) -> list[Path]:
    """株価が過去の高値に近い銘柄を取得"""
    target_list = []
    csv_list = sorted(csv_dir.glob("*.csv")) if csv_list is None else csv_list
    for csv_path in csv_list:
        df = read_data_csv(
            csv_path, start_date=target_date - datetime.timedelta(days=365), end_date=target_date
        )
        min_val = float(df["low"].min())
        max_val = float(df["high"].max())
        cur_val = float(df["close"][-1])
        if cur_val > min_val * (1 + min_rate_from_low) and cur_val > max_val * (1 - near_from_high):
            target_list.append(csv_path)
    return target_list


def get_uptrend_codes(target_date: datetime.date, csv_list: list[Path] | None = None) -> list[Path]:
    """株価が上昇トレンドの銘柄を取得"""
    csv_list = sorted(csv_dir.glob("*.csv")) if csv_list is None else csv_list
    target_list = []
    higher_price_weeks = [10, 30, 40]
    up_trend_weeks = [40]
    for csv_path in csv_list:
        df = read_data_csv(csv_path, end_date=target_date)

        flag = True
        # 移動平均線より株価が高いか
        avgs = calc_mean_average(df, weeks=higher_price_weeks, cur_day=target_date, target_days=1)
        flag &= all([avg[0] < df["close"][-1] for avg in avgs])
        # 移動平均線が上昇トレンドかチェック
        avgs = calc_mean_average(df, weeks=up_trend_weeks, cur_day=target_date, target_days=10)
        flag &= all([avg[0] < avg[-1] for avg in avgs])

        if flag:
            target_list.append(csv_path)
    return target_list


def get_watch_list(target_date: datetime.date) -> list[str]:
    """指定した日付(`date`)時点のウォッチリストを取得する"""
    target_list = get_relative_strength_codes(target_date)
    target_list = get_near_high_codes(target_date, target_list)
    target_list = get_uptrend_codes(target_date, target_list)
    return [p.stem for p in target_list]


def calc_rs(df: pl.DataFrame, ref_df: pl.DataFrame):
    """relative strengthを計算する"""

    def _calc_rs(dates, days=30):
        min_date = df["date"].min()
        res = -np.ones(len(dates))
        for idx, date in enumerate(sorted(dates)):
            start_date = date - datetime.timedelta(days=days)
            if start_date < min_date:
                continue
            res[idx] = relative_strength_v2(df, ref_df, start_date=start_date, end_date=date)
        return pl.Series(res)

    df = df.with_columns(pl.col("date").map_batches(_calc_rs).alias("rs"))
    return df
