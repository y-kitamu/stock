"""technical.py
"""

from datetime import date, datetime, timedelta

import numpy as np
import polars as pl
from pydantic import BaseModel

from .. import kabutan
from ..constants import PROJECT_ROOT


def _get_week_arrays(df: pl.DataFrame, weeks: list, cur_day: date, target_days: int = 1):
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


def calc_mean_average(df: pl.DataFrame, weeks: list[int], cur_day: date, target_days: int = 1):
    """移動平均線を計算する"""
    week_arrays = _get_week_arrays(df, weeks, cur_day, target_days)
    if len(week_arrays) != len(weeks):
        return []

    def mean_average(array: np.ndarray, days: int):
        return np.convolve(array, np.ones(days), mode="valid") / days

    averages = [mean_average(arr, len(arr) - target_days + 1) for arr in week_arrays]
    return averages


def check_higher_than_mean_average(
    df: pl.DataFrame, weeks: list[int] = [10, 30, 40], cur_day: date = date.today()
):
    """現在の株価が(`weeks`週)移動平均線を上回っているかチェック
    `weeks`週移動平均線が期間が短い順に並んでいるかチェック
    """
    weeks = sorted(weeks)
    averages = calc_mean_average(df, weeks, cur_day, target_days=1)
    if len(averages) != len(weeks):
        return False
    cur_value = df.filter(pl.col("date") <= cur_day).get_column("close").to_numpy()[-1]
    flag = all([cur_value >= avg for avg in averages])
    flag &= all([averages[i] > averages[i + 1] for i in range(len(averages) - 1)])
    return flag


def check_up_trend(df: pl.DataFrame, weeks: list[int], days: int, cur_day: date = date.today()):
    """`weeks`週移動平均線が過去`days`日間上向きかチェック"""
    week_arrays = calc_mean_average(df, weeks, cur_day, days)
    if len(week_arrays) != len(weeks):
        return False
    return all([((arr[1:] - arr[:-1]) > 0).sum() / len(arr) > 0.7 for arr in week_arrays])


def check_near_high(
    df: pl.DataFrame,
    week: int,
    max_rate_from_high: float,
    min_rate_from_low: float,
    cur_day: date = date.today(),
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


def check_relative_strength(df: pl.DataFrame, cur_day: date = date.today()):
    """Relative strengthが高いかチェック"""
    df = df.filter(pl.col("date") <= cur_day).sort("date")
    return df["rs_nikkei"][-1] > 100 and df["rs_topix"][-1] > 100


def check_technical_trend_templates(
    code: str, mean_average_weeeks: list[int] = [10, 30, 40], cur_day: date = date.today()
) -> bool:
    """トレンドテンプレートをチェックする"""
    csv_path = PROJECT_ROOT / "data" / "daily" / f"{code}.csv"
    df = kabutan.read_data_csv(csv_path, exclude_none=False)
    if len(df.filter(pl.col("date") < cur_day - timedelta(days=7 * 52))) == 0:
        return False

    flag = True
    # 移動平均線より株価が高いか
    flag &= check_higher_than_mean_average(df, weeks=mean_average_weeeks, cur_day=cur_day)
    if not flag:
        return False
    # 週移動平均線が上向きか
    flag &= check_up_trend(df, [40], 20, cur_day=cur_day)
    if not flag:
        return False
    # 高値に近いく、安値から離れているか
    flag &= check_near_high(df, 52, 0.25, 0.3, cur_day=cur_day)
    if not flag:
        return False
    # Relative strengthが高いか
    flag &= check_relative_strength(df, cur_day)
    return flag


class TechnicalTrendTemplateParams(BaseModel):
    """ """

    high_ma_weeks: list[int] = [10, 30, 40]  # 移動平均線より株価が高いか
    uptrend_ma_weeks: list[int] = [40]  # 週移動平均線が上向きか
    uptrend_days: int = 20  # 週移動平均線が上向きかチェックする日数
    near_high_week: int = 52  # 高値に近いか
    max_rate_from_high: float = 0.25  # 高値からの最大割合
    min_rate_from_low: float = 0.3  # 安値からの最小割合


class TechnicalTrendTemplate:
    def __init__(
        self,
        code: str,
        cur_day: date = date.today(),
        params: TechnicalTrendTemplateParams = TechnicalTrendTemplateParams(),
    ):
        self.code = code
        self.cur_day = cur_day
        self.params = params

        self.df = self._load_data()

        self.is_higher_than_ma = False
        self.is_up_trend = False
        self.is_near_high = False
        self.is_relative_strength = False

    def _load_data(self):
        csv_path = PROJECT_ROOT / "data" / "daily" / f"{self.code}.csv"
        df = kabutan.read_data_csv(csv_path, exclude_none=False)
        return df

    def check(self, day: datetime | None = None):
        """ """
        self.cur_day = day or self.cur_day
        self.is_higher_than_ma = check_higher_than_mean_average(
            self.df, weeks=self.params.high_ma_weeks, cur_day=self.cur_day
        )
        self.is_up_trend = check_up_trend(
            self.df, self.params.uptrend_ma_weeks, self.params.uptrend_days, self.cur_day
        )
        self.is_near_high = check_near_high(
            self.df,
            self.params.near_high_week,
            self.params.max_rate_from_high,
            self.params.min_rate_from_low,
            self.cur_day,
        )
        self.is_relative_strength = check_relative_strength(self.df, self.cur_day)

        return (
            self.is_higher_than_ma
            and self.is_up_trend
            and self.is_near_high
            and self.is_relative_strength
        )

    def get_debug_info(self):
        """ """
        return {
            "code": self.code,
            "cur_day": self.cur_day,
            "is_higher_than_ma": self.is_higher_than_ma,
            "is_up_trend": self.is_up_trend,
            "is_near_high": self.is_near_high,
            "is_relative_strength": self.is_relative_strength,
            "higher_ma": calc_mean_average(
                self.df, self.params.high_ma_weeks, self.cur_day, target_days=1
            ),
            "up_trend_ma": calc_mean_average(
                self.df, self.params.uptrend_ma_weeks, self.cur_day, self.params.uptrend_days
            ),
            "near_high": _get_week_arrays(self.df, [self.params.near_high_week], self.cur_day),
            "rs_nikkei": self.df["rs_nikkei"][-1],
            "rs_topix": self.df["rs_topix"][-1],
        }


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
