"""io.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 15:46:38
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from pathlib import Path
import datetime

import numpy as np
import polars as pl

from ..constants import DATA_DIR


def fill_empty_date(df: pl.DataFrame) -> pl.DataFrame:
    """GMOコインから取得したデータに欠損がある場合に埋める"""
    df = df.sort("datetime")
    date: datetime.datetime = df["datetime"][0]
    end_date: datetime.datetime = df["datetime"][-1]
    delta = int((end_date - date) / datetime.timedelta(minutes=1) + 1)
    datetime_set = set(df["datetime"].to_list())
    all_set = set(
        [
            datetime.datetime(date.year, date.month, date.day, 6, 0) + datetime.timedelta(minutes=i)
            for i in range(delta)
        ]
    )
    add_dates = list(all_set - datetime_set)

    pad_df = pl.DataFrame(
        {
            "openTime": [date.timestamp() * 1000 for date in add_dates],
            "open": [None] * len(add_dates),
            "high": [None] * len(add_dates),
            "low": [None] * len(add_dates),
            "close": [None] * len(add_dates),
            "volume": np.zeros(len(add_dates)),
        }
    ).with_columns(
        pl.from_epoch("openTime", time_unit="ms").alias("datetime") + pl.duration(hours=9),
    )

    merged_df = pl.concat([df, pad_df]).sort("datetime")
    # nullを埋める
    merged_df = merged_df.with_columns(
        pl.col("close").fill_null(strategy="forward"),
        pl.when(pl.col("volume").is_null()).then(pl.lit(0)).otherwise(pl.col("volume")).alias("volume"),
    ).with_columns(
        pl.when(pl.col("open").is_null()).then(pl.col("close")).otherwise(pl.col("open")).alias("open"),
        pl.when(pl.col("high").is_null()).then(pl.col("close")).otherwise(pl.col("high")).alias("high"),
        pl.when(pl.col("low").is_null()).then(pl.col("close")).otherwise(pl.col("low")).alias("low"),
    )
    return merged_df


def read_csv(filepath: str | Path) -> pl.DataFrame:
    df = pl.read_csv(filepath).with_columns(
        pl.from_epoch("openTime", time_unit="ms").alias("datetime") + pl.duration(hours=9),
    )
    return df


def read_data(
    code: str,
    start: datetime.datetime,
    end_or_delta: datetime.datetime | datetime.timedelta,
    include_end: bool = False,
) -> pl.DataFrame:

    if start.hour < 6:
        start_date = start.date() - datetime.timedelta(days=1)
    else:
        start_date = start.date()

    if isinstance(end_or_delta, datetime.datetime):
        end = end_or_delta
    else:
        end = start + end_or_delta
    if not include_end:
        end = end - datetime.timedelta(minutes=1)
    if end.hour < 6:
        end_date = end.date() - datetime.timedelta(days=1)
    else:
        end_date = end.date()

    date = start_date
    df_list: list[pl.DataFrame] = []
    while date <= end_date:
        date_str = date.strftime("%Y%m%d")
        filepath = DATA_DIR / "minutes_gmo" / date_str / "{}_{}.csv".format(code, date_str)
        assert filepath.exists(), "File not found : {}".format(filepath)
        df_list.append(read_csv(filepath))
        date += datetime.timedelta(days=1)

    df = fill_empty_date(pl.concat(df_list))
    return df.filter(df["datetime"].is_between(start, end, closed="both"))
