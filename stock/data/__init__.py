"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-08-12 15:45:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import csv
import datetime
from pathlib import Path

import polars as pl
import requests
import xlrd
from fake_useragent import UserAgent

from ..constants import PROJECT_ROOT
from ..kabutan.io import get_code_list, read_data_csv
from ..logger import logger


def update_us_ticker_list(output_path: Path = PROJECT_ROOT / "data" / "us_tickers.csv"):
    ua = UserAgent()
    headers = {"User-Agent": str(ua.chrome)}

    url = "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25&offset=0&download=true"
    response = requests.get(url, headers=headers)
    res = response.json()
    df = pl.from_dicts(res["data"]["rows"])
    if len(df) < 100:
        logger.debug("Something went wrong. Failed to update symbol ticker list.")
        return
    df.write_csv(output_path)
    return df


def update_jp_ticker_list(
    output_csv_path: Path = PROJECT_ROOT / "data" / "data_j.csv",
):
    source_url: str = (
        "https://www.jpx.co.jp/markets/statistics-equities/misc/tvdivq0000001vg2-att/data_j.xls"
    )
    res = requests.get(source_url)
    workbook = xlrd.open_workbook(file_contents=res.content)
    sheets = workbook.sheets()

    rows = []
    for i in range(sheets[0].nrows):
        rows.append([str(col).replace(".0", "") for col in sheets[0].row_values(i)[1:]])
    workbook.release_resources()

    output_csv_path.parent.mkdir(exist_ok=True, parents=True)
    with open(output_csv_path, "w", encoding="utf-8") as f:
        csv_writer = csv.writer(f, lineterminator="\n")
        csv_writer.writerows(rows)


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
