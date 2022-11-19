"""yf2db.py
Yahoo Finance to database adapter.
Author : Yusuke Kitamura
Create Date : 2022-08-27 17:18:04
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import datetime
import json
import time

from .. import COMPANY_LIST_JSON, REQUEST_INTERVAL_SEC, logger, models
from ..scraping import yahoo_finance as yf

STAT_KEYS_MAP = {
    "yield": "dividendYield",
    "52WeekChange": "FiftyTwoWeekChange",
}
#
STAT_UNNECESSARY_KEYS = ["maxAge"]
#


def _get_interval_sec(interval: str) -> int:
    """Get interval sec.
    Args:
        interval (str): Interval.
    Returns:
        int: Interval sec.
    """
    if interval == "1m":
        return 60
    elif interval == "1d":
        return 60 * 60 * 24
    else:
        raise ValueError("Invalid interval.")


def store_stock_time_series(code: str, interval: str = "1m", time_range: str = "1d") -> bool:
    """Store stock time series data to database.
    Args:
        code (str): Stock code.
    Returns:
        bool: True if success.
    """
    data = yf.get_stock_time_series(code, interval=interval, time_range=time_range)
    assert (
        len(data.timestamp)
        == len(data.open)
        == len(data.high)
        == len(data.low)
        == len(data.close)
        == len(data.volume)
    )
    num_rows = len(data.timestamp)
    interval_sec = _get_interval_sec(interval)
    with models.DATABASE.context() as db:
        for i in range(num_rows):
            if models.StockTimeSeries.exists(
                db, company_code=code, timestamp=data.timestamp[i], interval=interval_sec
            ):
                continue
            models.StockTimeSeries.create(
                db,
                with_commit=False,
                company_code=code,
                timestamp=data.timestamp[i],
                interval=interval_sec,
                open=data.open[i],
                high=data.high[i],
                low=data.low[i],
                close=data.close[i],
                volume=data.volume[i] or 0,
            )
        try:
            db.commit()
        except Exception:
            logger.exception(
                f"Failed to commit time series data. code = {code}, interval = {interval}, range = {time_range}"
            )
            return False

    logger.info(
        f"Stored stock time series data to database. code = {code}, interval = {interval}, range = {time_range}"
    )
    return True


def store_statistics(code: str) -> bool:
    """Store stock statistics data to database.
    Args:
        code (str): Stock code.
    Returns:
        bool: True if success.
    """
    data = yf.get_statistics(code)

    # Replace statistics keys if necessary
    for from_key, to_key in STAT_KEYS_MAP.items():
        if from_key in data:
            data[to_key] = data.pop(from_key)
    # Remove unnecessary stats
    for key in STAT_UNNECESSARY_KEYS:
        if key in data:
            data.pop(key)

    today = datetime.date.today()
    with models.DATABASE.context() as db:
        if models.Statistics.exists(db, company_code=code, archive_date=today):
            return True
        is_success = models.Statistics.create(
            db, with_commit=True, company_code=code, archive_date=today, **data
        )

    return is_success


def update_database():
    """ """
    logger.info("Update statistics")
    company_list = json.loads(COMPANY_LIST_JSON.read_text())["codes"]

    for code in company_list:
        try:
            if models.create_company(code):
                store_statistics(code)
                store_stock_time_series(code)
            else:
                logger.error(f"Failed to create company: {code}")
        except Exception:
            logger.exception(f"Failed to update statistics : {code}")

        time.sleep(REQUEST_INTERVAL_SEC)
    logger.info("Update statistics completed")
