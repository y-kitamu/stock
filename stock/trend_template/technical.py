"""technical.py
"""

from datetime import datetime, timedelta

import numpy as np
import polars as pl

from ..constants import PROJECT_ROOT


def _get_week_arrays(df: pl.DataFrame, weeks: list, cur_day: datetime, target_days: int = 1):
    """ """
    df = df.with_row_index()

    week_arrays = []
    for week in weeks:
        week_df = df.filter(
            pl.col("datetime").is_between(cur_day - timedelta(days=7 * week), cur_day)
        )
        if len(week_df) == 0:
            return []
        start_idx = week_df.get_column("index")[0] - target_days + 1
        if start_idx < 0:
            return []
        end_idx = week_df.get_column("index")[-1] + 1
        week_arrays.append(df[start_idx:end_idx].get_column("close").to_numpy())
    return week_arrays


def _calc_mean_average(df: pl.DataFrame, weeks: list[int], cur_day: datetime, target_days: int = 1):
    """移動平均線を計算する"""
    week_arrays = _get_week_arrays(df, weeks, cur_day, target_days)
    if len(week_arrays) != len(weeks):
        return []

    def mean_average(array: np.ndarray, days: int):
        return np.convolve(array, np.ones(days), mode="valid") / days

    averages = [mean_average(arr, len(arr) - target_days + 1) for arr in week_arrays]
    return averages


def check_higher_than_mean_average(
    df: pl.DataFrame, weeks: list[int] = [10, 30, 40], cur_day: datetime = datetime.today()
):
    """現在の株価が(`weeks`週)移動平均線を上回っているかチェック
    `weeks`週移動平均線が期間が短い順に並んでいるかチェック
    """
    weeks = sorted(weeks)
    averages = _calc_mean_average(df, weeks, cur_day, target_days=1)
    if len(averages) != len(weeks):
        return False
    cur_value = df.filter(pl.col("datetime") <= cur_day).get_column("close").to_numpy()[-1]
    flag = all([cur_value >= avg for avg in averages])
    flag &= all([averages[i] > averages[i + 1] for i in range(len(averages) - 1)])
    return flag


def check_up_trend(
    df: pl.DataFrame, weeks: list[int], days: int, cur_day: datetime = datetime.today()
):
    """`weeks`週移動平均線が過去`days`日間上向きかチェック"""
    week_arrays = _calc_mean_average(df, weeks, cur_day, days)
    if len(week_arrays) != len(weeks):
        return False
    return all([((arr[1:] - arr[:-1]) > 0).sum() / len(arr) > 0.7 for arr in week_arrays])


def check_near_high(
    df: pl.DataFrame,
    week: int,
    max_rate_from_high: float,
    min_rate_from_low: float,
    cur_day: datetime = datetime.today(),
):
    """現在の株価が`week`週高値から`max_rate_from_high`%以内にあるか、
    `week`週安値から`min_rage_from_low`以上にあるかをチェック
    """
    cur_value = df.filter(pl.col("datetime") <= cur_day).get_column("close").to_numpy()[-1]
    arr = _get_week_arrays(df, [week], cur_day)
    if len(arr) == 0:
        return False
    arr = arr[0]
    min_val, max_val = arr.min(), arr.max()
    thresh = max(min_val * (1.0 + min_rate_from_low), max_val * (1.0 - max_rate_from_high))
    return cur_value > thresh


def check_relative_strength():
    """Relative strengthが高いかチェック"""


def check_technical_trend_templates(
    code: str, mean_average_weeeks: list[int] = [10, 30, 40], cur_day: datetime = datetime.today()
) -> bool:
    """トレンドテンプレートをチェックする"""
    csv_path = PROJECT_ROOT / "data" / "daily" / f"{code}.csv"
    df = pl.read_csv(csv_path)
    df = df.select(
        [
            pl.col("date"),
            pl.col("open").cast(pl.Float64),
            pl.col("high").cast(pl.Float64),
            pl.col("low").cast(pl.Float64),
            pl.col("close").cast(pl.Float64),
            pl.col("volume").cast(pl.Int64),
        ]
    ).with_columns(pl.col("date").str.to_datetime("%Y/%m/%d").alias("datetime"))
    df = df.filter((pl.col("volume").is_not_nan().is_not_null()) & (pl.col("volume") > 0)).sort(
        "datetime"
    )
    if len(df.filter(pl.col("datetime") < cur_day - timedelta(days=7 * 52))) == 0:
        return False

    flag = True
    flag &= check_higher_than_mean_average(df, weeks=mean_average_weeeks)
    flag &= check_up_trend(df, [40], 20)
    flag &= check_near_high(df, 52, 0.25, 0.3)
    return flag


if __name__ == "__main__":
    codes = sorted([csv_path.stem for csv_path in (PROJECT_ROOT / "data" / "daily").glob("*.csv")])
    target_codes = []
    for code in codes:
        try:
            if check_technical_trend_templates(code):
                target_codes.append(code)
                # print(code)
        except Exception as e:
            print(code, e)
