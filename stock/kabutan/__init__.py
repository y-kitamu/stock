"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-03-23 19:02:22
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from pathlib import Path

import polars as pl

from . import catalyst, data, financial


def read_data_csv(csv_path: Path, exclude_none: bool = True) -> pl.DataFrame:

    df = pl.read_csv(csv_path)
    df = df.select(
        [
            pl.col("date").str.to_datetime("%Y/%m/%d"),
            pl.col("open").cast(pl.Float64),
            pl.col("high").cast(pl.Float64),
            pl.col("low").cast(pl.Float64),
            pl.col("close").cast(pl.Float64),
            pl.col("volume").cast(pl.Int64),
        ]
    )

    if exclude_none:
        df = df.filter((pl.col("volume").is_not_nan().is_not_null()) & (pl.col("volume") > 0)).sort(
            "date"
        )

    return df


def read_financial_csv(csv_path: Path) -> pl.DataFrame:
    df = pl.read_csv(csv_path)
    df = df.select(
        [
            pl.col("year").cast(pl.Int64),
            pl.col("month").cast(pl.Int64),
            pl.col("duration").cast(pl.Int64),
            pl.col("annoounce_date").str.to_datetime("%y/%m/%d"),
            pl.col("is_prediction").cast(pl.Boolean),
            pl.col("total_revenue").cast(pl.Float64),
            pl.col("operating_income").cast(pl.Float64),
            pl.col("ordinary_profit").cast(pl.Float64),
            pl.col("net_income").cast(pl.Float64),
            pl.col("eps").cast(pl.Float64),
            pl.col("divident").cast(pl.Float64),
        ]
    )
    return df


# def read_financial_csv(csv_path: Path) -> list[financial.FinancialStatement]:
#     """Read financial data from csv file."""
#     code = csv_path.stem
#     with open(csv_path, "r") as f:
#         reader = csv.reader(f)
#         next(reader)
#         return [financial.FinancialStatement.from_csv(code, row) for row in reader]
