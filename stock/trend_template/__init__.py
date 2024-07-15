"""__init__.py
"""

from datetime import date, timedelta

import polars as pl

from ..constants import DATA_DIR, PROJECT_ROOT
from ..kabutan import get_code_list, read_data_csv, read_financial_csv
from ..kabutan.data import get_market_capitalization, get_number_of_shares
from .fundamental import check_fundamental_trend_templates, check_growing
from .technical import (TechnicalTrendTemplate, TechnicalTrendTemplateParams,
                        check_technical_trend_templates)
from .technical_v2 import calc_rs as calc_rs_v2
from .technical_v2 import get_watch_list as get_watch_list_v2


def calc_for_watch_list(code, start_date=None, end_date=date.today()):
    df = read_data_csv(code, start_date=start_date, end_date=end_date)
    # 過去10日の値動きの大きさを計算
    window_size = 10
    avg_key = "avg{}".format(window_size)
    stddev_key = "stddev{}".format(window_size)
    df = df.with_columns(
        pl.col("close").rolling_mean(window_size=window_size).alias(avg_key),
        pl.col("close").rolling_std(window_size=window_size).alias(stddev_key),
    )

    # ギャップアップしている
    df = df.with_columns(
        (pl.col("close") > pl.col(avg_key) + pl.col(stddev_key)).alias("breakpoint")
    )

    # 出来高が増加（急増）
    df = df.with_columns(
        pl.col("volume").rolling_max(window_size=window_size).shift().alias("max_volume")
    )
    df = df.with_columns((pl.col("volume") > pl.col("max_volume") * 2).alias("volume_increase"))

    # watch listの条件判定
    df = df.with_columns(
        (
            (pl.col("breakpoint") & pl.col("volume_increase"))
            & ((pl.col("close") >= pl.col("open")) | (pl.col("volume") > pl.col("max_volume") * 20))
        ).alias("watch_list")
    )

    # 決算発表前後の日はwatch_listから除く
    fdf = (
        read_financial_csv(code)
        .filter(pl.col("annoounce_date") <= end_date)
        .sort(pl.col("annoounce_date"))
    )
    for announce_date in fdf["annoounce_date"]:
        df = df.with_columns(
            (
                pl.col("watch_list")
                & (
                    ~pl.col("date").is_between(
                        announce_date - timedelta(3), announce_date + timedelta(3)
                    )
                )
            ).alias("watch_list")
        )
    return df


def is_watch_list(code, current_date):
    start_date = current_date - timedelta(days=365)
    df = read_data_csv(code, start_date=start_date, end_date=current_date)
    fdf = (
        read_financial_csv(code)
        .filter(pl.col("annoounce_date") <= current_date)
        .sort(pl.col("annoounce_date"))
    )
    if len(fdf) > 0 and current_date - fdf["annoounce_date"][-1] < timedelta(days=1):
        return False

    # 過去10日の値動きの大きさを計算
    window_size = 10
    avg_key = "avg{}".format(window_size)
    stddev_key = "stddev{}".format(window_size)
    df = df.with_columns(
        pl.col("close").rolling_mean(window_size=window_size).alias(avg_key),
        pl.col("close").rolling_std(window_size=window_size).alias(stddev_key),
    )

    # ギャップアップしている
    df = df.with_columns(
        (pl.col("close") > pl.col(avg_key) + pl.col(stddev_key)).alias("breakpoint")
    )

    # 出来高が増加（急増）
    df = df.with_columns(
        pl.col("volume").rolling_max(window_size=window_size).shift().alias("max_volume")
    )
    df = df.with_columns((pl.col("volume") > pl.col("max_volume") * 2).alias("volume_increase"))

    if len(df) > 0 and df["breakpoint"][-1] and df["volume_increase"][-1]:
        # 高値で引けている
        flag = False
        # if (df["close"][-1] - df["low"][-1]) / max(df["high"][-1] - df["low"][-1], 1e-5) > 0.8:
        #     flag = True
        if df["close"][-1] >= df["open"][-1]:
            flag = True
        # 出来高が急増
        if df["volume"][-1] > df["max_volume"][-1] * 20:
            flag = True
        # if df["close"][-1] > df["open"][-1]:
        # 小型株
        market_cap = get_market_capitalization(code)
        if flag and market_cap is not None and market_cap < 1000:
            return True
            # watch_list.append(code)
    return False


def get_watch_list_v4(current_date):
    """ """
    # 特に何も材料がないのに大きく値上がりしている銘柄を探す
    code_list = get_code_list()
    watch_list = []
    for code in code_list:
        if is_watch_list(code, current_date):
            watch_list.append(code)
    return watch_list


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
