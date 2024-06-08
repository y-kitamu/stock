"""__init__.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 13:53:21
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import polars as pl

from . import algorithm, kabutan, simulation, trend_template, util, visualize
from .constants import *
from .debug import run_debug
from .logger import logger


def get_code_df() -> pl.DataFrame:
    code_csv_path = PROJECT_ROOT / "data/data_j.csv"
    code_df = pl.read_csv(code_csv_path)
    code_df = code_df.filter(pl.col("市場・商品区分").str.contains("内国株式"))
    return code_df


def get_code_list() -> list[str]:
    code_df = get_code_df()
    return code_df["コード"].to_list()
