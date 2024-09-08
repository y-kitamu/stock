"""fetch_data_from_gmo.py
GMOコインからデータを取得する
"""

# us株、仮想通貨の分足データを取得する
from pathlib import Path
import datetime

import polars as pl
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

symbols = [
    "BTC",
    "ETH",
    "BCH",
    "LTC",
    "XRP",
    "XEM",
    "XLM",
    "BAT",
    "XTZ",
    "QTUM",
    "ENJ",
    "DOT",
    "ATOM",
    "MKR",
    "DAI",
    "XYM",
    "MONA",
    "FCR",
    "ADA",
    "LINK",
    "DOGE",
    "SOL",
    "ASTR",
    "BTC_JPY",
    "ETH_JPY",
    "BCH_JPY",
    "LTC_JPY",
    "XRP_JPY",
    "DOT_JPY",
    "ATOM_JPY",
    "ADA_JPY",
    "LINK_JPY",
    "DOGE_JPY",
    "SOL_JPY",
]


def fetch_and_save(symbol: str, date: datetime.date, output_path: Path):
    endPoint = "https://api.coin.z.com/public"
    path = f'/v1/klines?symbol={symbol}&interval=1min&date={date.strftime("%Y%m%d")}'

    response = session.get(endPoint + path)
    res = response.json()
    if "data" not in res or len(res["data"]) == 0:
        stock.logger.warning(f"No data for {symbol} on {date}")
        return

    df = (
        pl.from_dicts(res["data"])
        .with_columns(
            pl.col("openTime").cast(pl.Float64),
            pl.col("open").cast(pl.Int64),
            pl.col("high").cast(pl.Int64),
            pl.col("low").cast(pl.Int64),
            pl.col("close").cast(pl.Int64),
            pl.col("volume").cast(pl.Float64),
        )
        .with_columns(
            (pl.from_epoch("openTime", time_unit="ms") + pl.duration(hours=9)).alias(
                "datetime"
            ),  # JST
        )
    )
    df.write_csv(output_path)


if __name__ == "__main__":
    # start_date = datetime.date(2021, 4, 15)
    # end_date = datetime.date.today() - datetime.timedelta(days=1)
    # date = start_date

    # while date <= end_date:
    #     stock.logger.debug("Fetching data for {}".format(date))
    #     for symbol in symbols:
    #         date_str = date.strftime("%Y%m%d")
    #         save_path = stock.DATA_DIR / "minutes_gmo" / date_str / f"{symbol}_{date_str}.csv"
    #         save_path.parent.mkdir(exist_ok=True, parents=True)
    #         fetch_and_save("BTC", date, save_path)
    #     date += datetime.timedelta(days=1)
    if datetime.datetime.now().hour >= 6:
        date = datetime.date.today() - datetime.timedelta(days=1)
    else:
        date = datetime.date.today() - datetime.timedelta(days=2)

    stock.logger.debug("Fetching data for {}".format(date))
    for symbol in symbols:
        date_str = date.strftime("%Y%m%d")
        save_path = stock.DATA_DIR / "minutes_gmo" / date_str / f"{symbol}_{date_str}.csv"
        if save_path.exists():
            stock.logger.debug(f"{save_path} already exists. Skipping.")
            continue
        save_path.parent.mkdir(exist_ok=True, parents=True)
        fetch_and_save("BTC", date, save_path)
