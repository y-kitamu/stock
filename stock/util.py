"""util.py
"""

import re

import pandas as pd
import polars as pl
import yfinance as yf

# import polars as pl


def convert_to_number(val_str: str) -> int | float | None:
    val_str = val_str.replace(",", "")
    res = re.search("-*\d+\.*\d*", val_str)
    if res is None:
        return None
    if "." in val_str:
        return float(res.group(0))
    return int(res.group(0))


def pd_to_pl(df: pd.DataFrame) -> pl.DataFrame:
    """yfinanceで取得したのpd.DataFrameをpolarsのDataFrameに変換する"""
    df = df.reset_index()
    if len(df) == 0:
        return pl.DataFrame()
    if "Date" in df:
        pdf = pl.DataFrame(
            {
                "date": df["Date"].to_list(),
                "open": df["Open"],
                "high": df["High"],
                "low": df["Low"],
                "close": df["Close"],
                "volume": df["Volume"],
                "dividends": df["Dividends"],
                "stock_splits": df["Stock Splits"],
            }
        ).with_columns(pl.col("date").cast(pl.Date))
    elif "Datetime" in df:
        pdf = pl.DataFrame(
            {
                "datetime": df["Datetime"].to_list(),
                "open": df["Open"],
                "high": df["High"],
                "low": df["Low"],
                "close": df["Close"],
                "volume": df["Volume"],
                "dividends": df["Dividends"],
                "stock_splits": df["Stock Splits"],
            }
        ).with_columns(pl.col("datetime").cast(pl.Datetime))
    else:
        raise ValueError("Date or Datetime column is not found in the DataFrame.")
    return pdf


def get_history_data(code: str, **kwargs) -> pl.DataFrame:
    ticker = yf.Ticker(code)
    res = ticker.history(period="max", interval="1d", **kwargs).reset_index()
    return pd_to_pl(res)
