"""yahoo_finance.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 13:53:59
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import json
import re
from typing import Dict, List, Optional

import requests
from fake_useragent import UserAgent

try:
    from .. import logger
except:
    from stock import logger


BASE_URL: str = "https://finance.yahoo.com/"
REQUEST_HEADER = {"User-Agent": UserAgent().chrome}
REQUEST_CONFIG = {"timeout": (3, 10)}  # (connect, read)

# Regex for extract statistics from respond html of yahoo finance
STATISTICS_REGEX = re.compile("root\.App\.main = (\{.*\});")
STAT_KEYS_MAP = {
    "yield": "dividendYield",
    "52WeekChange": "FiftyTwoWeekChange",
}
#
STAT_UNNECESSARY_KEYS = ["maxAge"]


def get_statistics(code: str) -> Dict[str, Optional[float]]:
    """ """
    # Get html from yahoo finance
    url = f"{BASE_URL}quote/{code}/key-statistics?p={code}"
    response = requests.get(url, headers=REQUEST_HEADER, **REQUEST_CONFIG)
    if response.status_code != requests.codes.ok:
        logger.error(f"Failed to fetch data from {url}. status_code = {response.status_code}")
        return {}

    # Extract statistics from html
    result = STATISTICS_REGEX.search(response.text)
    if result is None:
        logger.error(f"Failed to extract data from {url}")
        return {}

    # Convert json string to dict
    try:
        html_context = json.loads(result.group(1))
        quote_summary = html_context["context"]["dispatcher"]["stores"]["QuoteSummaryStore"]
    except Exception:
        logger.exception(f"Failed to parse json. code = {code}, url = {url}")
        return {}

    raw_stat_dict = {
        **quote_summary["defaultKeyStatistics"],
        **quote_summary["financialData"],
    }

    # Replace statistics keys if necessary
    for from_key, to_key in STAT_KEYS_MAP.items():
        if from_key in raw_stat_dict:
            raw_stat_dict[to_key] = raw_stat_dict.pop(from_key)
    # Remove unnecessary stats
    for key in STAT_UNNECESSARY_KEYS:
        if key in raw_stat_dict:
            raw_stat_dict.pop(key)

    stats = {}
    for key, value in raw_stat_dict.items():
        if value is None:
            stats[key] = None
        elif isinstance(value, dict):
            if value and "raw" in value:
                stats[key] = value["raw"]
            else:
                stats[key] = None

    return stats


def get_stock_time_series(code: str, interval="1m", time_range="1d") -> Dict[str, List[float]]:
    """ """
    kwargs = {
        "region": "US",
        "lang": "en-US",
        "includePrePost": "false",
        "interval": interval,
        "range": time_range,
    }
    kwargs_str = "&".join([f"{key}={value}" for key, value in kwargs.items()])
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{code}?{kwargs_str}"
    response = requests.get(url, headers=REQUEST_HEADER, **REQUEST_CONFIG)

    if response.status_code != requests.codes.ok:
        logger.error(
            f"Failed to fetch data from {url}. status_code = {response.status_code}\n{response.text}"
        )
        return {}

    data = json.loads(response.text)["chart"]["result"][0]
    return {
        "timestamp": data["timestamp"],
        "open": data["indicators"]["quote"][0]["open"],
        "high": data["indicators"]["quote"][0]["high"],
        "low": data["indicators"]["quote"][0]["low"],
        "close": data["indicators"]["quote"][0]["close"],
        "volume": data["indicators"]["quote"][0]["volume"],
    }
