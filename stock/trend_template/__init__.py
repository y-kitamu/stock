"""__init__.py
"""

from datetime import date, timedelta

import polars as pl

from ..constants import DATA_DIR, PROJECT_ROOT
from ..kabutan import get_code_list, read_data_csv, read_financial_csv
from ..kabutan.data import get_number_of_shares
from .fundamental import check_fundamental_trend_templates, check_growing
from .technical import (TechnicalTrendTemplate, TechnicalTrendTemplateParams,
                        check_technical_trend_templates)
from .technical_v2 import calc_rs as calc_rs_v2
from .technical_v2 import get_watch_list as get_watch_list_v2


def get_watch_list_v3(target_date: date = date.today()) -> list[str]:
    """watch listのデータを取得する"""
    code_list = get_code_list()
    watch_list = []
    for code in code_list:
        data_csv_path = DATA_DIR / f"daily/{code}.csv"
        original_df = read_data_csv(data_csv_path)
        # 3ヶ月高値付近
        df = original_df.filter(
            pl.col("date").is_between(target_date - timedelta(days=120), target_date)
        ).sort(pl.col("date"))
        if len(df) == 0 or df["close"].max() * 0.99 > df["close"][-1]:
            continue

        # 1ヶ月の平均出来高が5000以上
        df = original_df.filter(
            pl.col("date").is_between(target_date - timedelta(days=30), target_date)
        )
        if len(df) == 0 or df["volume"].mean() < 5000:
            continue

        # 直近の値動きが激しすぎない
        df = original_df.filter(
            pl.col("date").is_between(target_date - timedelta(days=30), target_date)
        )
        if len(df) < 5 or df["close"].std() > df["close"].mean() * 0.05:
            continue

        # 直近の4半期決算が良い
        fdf = read_financial_csv(DATA_DIR / f"financial/{code}.csv")
        fdf = fdf.filter((pl.col("annoounce_date") < target_date) & (pl.col("duration") == 3)).sort(
            pl.col("annoounce_date")
        )
        if len(fdf) == 0:
            continue
        if len(fdf) >= 5:
            if (
                fdf["total_revenue"][-1] < fdf["total_revenue"][-5] * 1.1
                and fdf["net_income"][-1] < fdf["net_income"][-5] * 1.1
            ):
                continue
        else:
            if fdf["net_income"][-1] < 0:
                continue

        # 直前の決算発表から70日以内
        if fdf["annoounce_date"][-1] < target_date - timedelta(days=70):
            continue

        # 時価総額が大きすぎない
        num_shares = get_number_of_shares(code)
        if num_shares * df["close"][-1] > 100000000000:  # 1000億
            continue

        watch_list.append(code)
    return watch_list


def get_watch_list(cur_day: date) -> list[str]:
    """指定した日付(`date`)時点のウォッチリストを取得する"""
    csv_dir = PROJECT_ROOT / "data" / "daily"
    watch_list = []
    for csv_path in sorted(csv_dir.glob("*.csv")):
        code = csv_path.stem
        if check_technical_trend_templates(
            code, cur_day=cur_day
        ) and check_fundamental_trend_templates(code, current_date=cur_day):
            watch_list.append(code)
    return watch_list


def calc_watch_list_duration_of(
    code: str,
    start_date: date,
    end_date: date = date.today(),
    use_technical: bool = True,
    use_fundamental: bool = True,
) -> list[list[date]]:
    """`code`の銘柄がウォッチリストに入っていた期間を計算する"""
    assert use_technical or use_fundamental, "use_technical or use_fundamental must be True"
    duration = []
    date = start_date
    start = None
    while date <= end_date:
        if (not use_technical or check_technical_trend_templates(code, cur_day=date)) and (
            not use_fundamental or check_fundamental_trend_templates(code, current_date=date)
        ):
            if start is None:
                start = date
        else:
            if start is not None:
                duration.append([start, date - timedelta(1)])
            start = None
        date += timedelta(days=1)

    if start is not None:
        duration.append([start, end_date])

    return duration
