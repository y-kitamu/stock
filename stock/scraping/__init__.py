"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-08-04 21:29:23
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from . import yahoo_finance


from pathlib import Path

import polars as pl


def read_data(path: Path) -> pl.DataFrame:
    """ """
    return pl.read_csv(path).select(
        pl.from_epoch(pl.col("timestamp")).cast(pl.Date).alias("date"),
        pl.col("open").cast(pl.Float64),
        pl.col("high").cast(pl.Float64),
        pl.col("low").cast(pl.Float64),
        pl.col("close").cast(pl.Float64),
        pl.col("volume").cast(pl.Int64),
    )
