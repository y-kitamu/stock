"""v1.py

Author : Yusuke Kitamura
Create Date : 2024-08-01 18:53:09
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime

import polars as pl
from tqdm import tqdm

from ..kabutan import read_data_csv, read_financial_csv, get_code_list
from ..kabutan.data import calc_estimated_capitalization


def get_watch_list_all() -> pl.DataFrame:
    stacked: list[pl.DataFrame] = []
    codes = get_code_list()
    for code in tqdm(codes):
        capt = calc_estimated_capitalization(code)
        if capt > 100000000000:  # 時価総額1000億円以上の場合はスキップ
            continue

        # df = calc_for_watch_list(code)
        df = calc_for_watch_list(code)
        stacked.append(
            df.filter(pl.col("watch_list"))
            .with_columns(pl.lit(code).alias("code"))
            .select(pl.col("code"), pl.col("date"))
        )
    stacked_df = pl.concat(stacked)
    return stacked_df


def get_watch_list(current_date: datetime.date) -> list[str]:
    """ """
    watch_list: list[str] = []
    code_list = get_code_list()

    for code in code_list:
        capt = calc_estimated_capitalization(code)
        if capt > 100000000000:  # 時価総額1000億円以上の場合はスキップ
            continue
        df = calc_for_watch_list(
            code, start_date=current_date - datetime.timedelta(days=60), end_date=current_date
        )
        if len(df) > 0 and df["watch_list"][-1]:
            watch_list.append(code)
    return watch_list


def calc_for_watch_list(
    code: str,
    start_date: datetime.date | None = None,
    end_date: datetime.date = datetime.date.today(),
):
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

    # 直近の安値が安すぎない & 値幅が狭すぎない
    window_size = 10
    df = df.with_columns(
        (pl.col("close").rolling_min(window_size=window_size)).alias("min_close")
    ).with_columns(
        (
            (pl.col("min_close") > pl.col("close") * 0.7)
            & (pl.col("min_close") < pl.col("close") * 0.95)
        ).alias("price_range")
    )

    # 高値が多すぎない
    df = df.with_columns(
        pl.col("close")
        .rolling_map(
            function=lambda d: sum(d > d[-1]),
            window_size=30,
        )
        .alias("high_count")
    )

    # 出来高が増加（急増）
    window_size = 10
    df = df.with_columns(
        pl.col("volume").rolling_max(window_size=window_size).shift().alias("max_volume")
    )
    df = df.with_columns(
        (
            (pl.col("volume") > pl.col("max_volume") * 2)
            & (pl.col("volume") * pl.col("close") > 20000 * 100)
            & (pl.col("volume").rolling_max(window_size=30).shift() * 0.9 < pl.col("volume"))
        ).alias("volume_increase")
    )

    # watch listの条件判定
    df = df.with_columns(
        (
            pl.col("breakpoint")
            & pl.col("price_range")
            & pl.col("volume_increase")
            & (pl.col("high_count") < 7)
            & ((pl.col("close") >= pl.col("open")) | (pl.col("volume") > pl.col("max_volume") * 20))
        ).alias("watch_list")
    )

    # 直前にwatch list候補になっている場合はwatch listから除く
    df = df.with_columns(
        (
            (pl.col("watch_list").cast(int).rolling_max(window_size=5).shift() == 0)
            & pl.col("watch_list")
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
                        announce_date - datetime.timedelta(7), announce_date + datetime.timedelta(7)
                    )
                )
            ).alias("watch_list")
        )
    return df
