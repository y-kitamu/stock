"""collect_minutes_data_jp.py

Author : Yusuke Kitamura
Create Date : 2024-08-25 20:14:19
"""

from pathlib import Path
import datetime

import numpy as np
import yfinance as yf
from requests import Session
from requests_cache import CacheMixin, SQLiteCache
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket
from pyrate_limiter import Duration, RequestRate, Limiter

import stock


class CachedLimiterSession(CacheMixin, LimiterMixin, Session):
    pass


session = CachedLimiterSession(
    limiter=Limiter(RequestRate(1, Duration.SECOND)),  # max 2 requests per 1 seconds
    bucket_class=MemoryQueueBucket,
    backend=SQLiteCache("yfinance.cache"),
)


def run():
    all_codes = stock.get_code_list(include_etf=True)
    output_dir = stock.PROJECT_ROOT / "data" / "minutes"

    for code in all_codes:
        date = datetime.date(2024, 7, 26)
        while date <= datetime.date.today():
            ticker = yf.Ticker(f"{code}.T", session=session)
            df = stock.util.pd_to_pl(
                ticker.history(
                    interval="1m",
                    start=date.strftime("%Y-%m-%d"),
                    end=(date + datetime.timedelta(days=1)).strftime("%Y-%m-%d"),
                )
            )
            if len(df) > 0:
                output_path = (
                    output_dir / date.strftime("%Y%m%d") / f"{code}_{date.strftime('%Y%m%d')}.arrow"
                )
                output_path.parent.mkdir(parents=True, exist_ok=True)
                df.write_ipc(output_path)
            date += datetime.timedelta(days=1)


if __name__ == "__main__":
    run()
