"""fetch_data_from_yf.py
yahoo finance apiを使用してデータを取得する
Author : Yusuke Kitamura
Create Date : 2024-09-08 14:01:35
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
from pathlib import Path
import requests
import json

from tqdm import tqdm
import yfinance as yf
import polars as pl
from fake_useragent import UserAgent
from requests import Session
from requests_cache import CacheMixin, SQLiteCache
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket
from pyrate_limiter import Duration, RequestRate, Limiter

import stock


class CachedLimiterSession(CacheMixin, LimiterMixin, Session):
    pass


session = CachedLimiterSession(
    limiter=Limiter(RequestRate(10, Duration.SECOND)),  # max 2 requests per 1 seconds
    bucket_class=MemoryQueueBucket,
    backend=SQLiteCache("yfinance.cache"),
)
ua = UserAgent()
headers = {"User-Agent": str(ua.chrome)}


def update_us_ticker_list(output_path: Path = stock.PROJECT_ROOT / "data" / "us_tickers.csv"):
    url = (
        "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25&offset=0&download=true"
    )
    response = requests.get(url, headers=headers)
    res = response.json()
    df = pl.from_dicts(res["data"]["rows"])
    if len(df) < 100:
        stock.logger.debug("Something went wrong. Failed to update symbol ticker list.")
        return
    df.write_csv(output_path)
    return df


def fetch_data(symbol: str, date: datetime.date, output_path: Path):
    if date.weekday() >= 5:  # 土日はスキップ
        return

    try:
        df = yf.Ticker(symbol, session=session).history(
            interval="1m",
            start=date.strftime("%Y-%m-%d"),
            end=(date + datetime.timedelta(days=1)).strftime("%Y-%m-%d"),
        )
    except:
        return

    if len(df) > 0:
        output_path = (
            stock.DATA_DIR
            / "minutes_yf"
            / date.strftime("%Y%m%d")
            / f"{symbol}_{date.strftime('%Y%m%d')}.csv"
        )
        output_path.parent.mkdir(parents=True, exist_ok=True)
        df = stock.util.pd_to_pl(df)
        df.write_csv(output_path)


if __name__ == "__main__":
    start_date = datetime.date.today() - datetime.timedelta(days=1)
    end_date = start_date  # datetime.date.today()
    date = start_date

    ticker_csv_path = stock.PROJECT_ROOT / "data" / "us_tickers.csv"
    df = update_us_ticker_list(ticker_csv_path)
    if df is None:
        df = pl.read_csv(ticker_csv_path)

    symbol_list = df["symbol"].to_list()
    for symbol in tqdm(symbol_list):
        date = start_date
        while date <= end_date:
            date_str = date.strftime("%Y%m%d")
            output_path = stock.DATA_DIR / "minutes_yf" / date_str / f"{symbol}_{date_str}.csv"
            if output_path.exists() or date.weekday() >= 5 or date == datetime.date(2024, 9, 2):
                date += datetime.timedelta(days=1)
                continue

            fetch_data(symbol, date, output_path)
            date += datetime.timedelta(days=1)
