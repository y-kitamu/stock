"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-08-12 15:45:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime

import polars as pl

from ..kabutan.io import get_code_list, read_data_csv


def get_jumpups(
    code_list: list[str] = get_code_list(),
    start_date: datetime.date | None = None,
    end_date: datetime.date = datetime.date.today(),
    window_size: int = 10,
    min_growing_rate: float = 0.5,
    exclude_duplicate: bool = False,
) -> dict[str, pl.DataFrame]:
    # 直近一年間の中で、数日で大きく値上がりした銘柄のリストを取得
    target_dict: dict[str, pl.DataFrame] = {}
    for code in code_list:
        df = read_data_csv(code, start_date=start_date, end_date=end_date)
        df = df.with_columns(
            pl.col("close")
            .rolling_max(window_size=window_size)
            .shift(-window_size)
            .interpolate("nearest")
            .alias("maximum"),
            # pl.col("close").rolling_min(window_size=window_size).alias("minimum"),
        )
        df = df.with_columns(
            (((pl.col("maximum")) / pl.col("close")) - 1.0).alias("growing_rate"),
            (pl.col("maximum") > pl.col("close") * (1.0 + min_growing_rate)).alias("flag"),
        )
        if exclude_duplicate:
            df = df.with_columns(
                (
                    (
                        pl.col("growing_rate").rolling_max(window_size=window_size * 2, center=True)
                        == pl.col("growing_rate")
                    )
                    & pl.col("flag")
                ).alias("flag")
            )

        if len(df.filter(pl.col("flag"))) > 0:
            target_dict[code] = df.filter(pl.col("flag"))

    return target_dict
