"""technical.py
"""

from datetime import datetime, timedelta

import numpy as np
import polars as pl

from .. import kabutan, relative_strength
from ..constants import PROJECT_ROOT


def _get_week_arrays(df: pl.DataFrame, weeks: list, cur_day: datetime, target_days: int = 1):
    """ """
    df = df.with_row_index()

    week_arrays = []
    for week in weeks:
        week_df = df.filter(pl.col("date").is_between(cur_day - timedelta(days=7 * week), cur_day))
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


def _calc_relative_strength(
    target_df: pl.DataFrame, reference_df: pl.DataFrame, start_date: datetime, end_date: datetime
):
    target_df = target_df.filter((start_date < pl.col("date")) & (pl.col("date") <= end_date))
    reference_df = reference_df.filter((start_date < pl.col("date")) & (pl.col("date") <= end_date))

    if len(target_df) != len(reference_df):
        return -1

    return relative_strength.relative_strength(
        target_df["close"].to_numpy(), reference_df["close"].to_numpy()
    )


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
    cur_value = df.filter(pl.col("date") <= cur_day).get_column("close").to_numpy()[-1]
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
    cur_value = df.filter(pl.col("date") <= cur_day).get_column("close").to_numpy()[-1]
    arr = _get_week_arrays(df, [week], cur_day)
    if len(arr) == 0:
        return False
    arr = arr[0]
    min_val, max_val = arr.min(), arr.max()
    thresh = max(min_val * (1.0 + min_rate_from_low), max_val * (1.0 - max_rate_from_high))
    return cur_value > thresh


def check_relative_strength(code: str, cur_day: datetime = datetime.today()):
    """Relative strengthが高いかチェック"""
    csv_dir = PROJECT_ROOT / "data" / "daily"

    nikkei_df = kabutan.read_data_csv(csv_dir / "0000.csv", exclude_none=False)
    topix_df = kabutan.read_data_csv(csv_dir / "0010.csv", exclude_none=False)

    df = kabutan.read_data_csv(csv_dir / f"{code}.csv", exclude_none=False)
    start_date = cur_day - timedelta(days=365)
    end_date = cur_day
    rs_nikkei = _calc_relative_strength(df, nikkei_df, start_date, end_date)
    rs_topix = _calc_relative_strength(df, topix_df, start_date, end_date)
    return rs_nikkei > 100 and rs_topix > 100


def check_technical_trend_templates(
    code: str, mean_average_weeeks: list[int] = [10, 30, 40], cur_day: datetime = datetime.today()
) -> bool:
    """トレンドテンプレートをチェックする"""
    csv_path = PROJECT_ROOT / "data" / "daily" / f"{code}.csv"
    df = kabutan.read_data_csv(csv_path, exclude_none=False)
    if len(df.filter(pl.col("date") < cur_day - timedelta(days=7 * 52))) == 0:
        return False

    flag = True
    flag &= check_higher_than_mean_average(df, weeks=mean_average_weeeks, cur_day=cur_day)
    if not flag:
        return False
    flag &= check_up_trend(df, [40], 20, cur_day=cur_day)
    if not flag:
        return False
    flag &= check_near_high(df, 52, 0.25, 0.3, cur_day=cur_day)
    if not flag:
        return False
    flag &= check_relative_strength(code, cur_day)
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
