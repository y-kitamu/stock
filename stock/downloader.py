"""downloader.py

Author : Yusuke Kitamura
Create Date : 2021-11-14 16:11:52
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import csv
import datetime
import sys
from io import StringIO
from typing import Any, List, Tuple

import numpy as np
import requests
from fake_useragent import UserAgent

import stock


class Downloader:
    """Download stock data from yahoo finance.
    Args:
    """
    URL_TEMPLATE = "https://query1.finance.yahoo.com/v7/finance/download/{code}?{url_params}"

    # period1=0&period2=1636761600&interval=1d&events=history&includeAdjustedClose=true

    def __init__(self, timeout: int = 100):
        start_epoch: int = 0
        day_sec = 24 * 60 * 60
        end_epoch: int = int(datetime.datetime.today().timestamp()) // day_sec * day_sec
        self.url_params = {
            "period1": start_epoch,
            "period2": end_epoch,
            "interval": "1d",
            "events": "history",
            "includeAdjustedClose": "true",
        }
        ua = UserAgent()
        self.header = {'User-Agent': ua.chrome}
        self.timeout = 100

    def download(self, code: str) -> Tuple[bool, List]:
        """指定した証券codeの株式dataをdownloadする
        Args:
           code (str) : stock code
         Return:
           (bool) : Return True if download is success, else False.
           (List) : stock data. [Date, Open, High, Low, Close, Adj Close, Volume]
        """
        url_param_str = "&".join(["{}={}".format(key, val) for key, val in self.url_params.items()])
        url = self.URL_TEMPLATE.format(code, url_param_str)
        try:
            res = requests.get(url, timeout=self.timeout)
        except Exception as e:
            tb = sys.exc_info()[2]
            stock.logger.error("Failed to get data from {}. message: {}".format(
                url, e.with_traceback(tb)))
            return (False, [])

        if not res.status_code == requests.codes.ok:
            stock.logger.warning("Status = {}. Failed to get data from {}".format(res.status_code, url))
            return (False, [])

        with StringIO(res.text) as ss:
            csv_reader = csv.reader(ss)
            next(csv_reader)
            rows = [process_row(row) for row in csv_reader]
        return (True, rows)


def to_float(val_str: str) -> float:
    try:
        val = float(val_str)
        return val
    except:
        return np.nan


def process_row(row: List[str]) -> List[Any]:
    return [row[0]] + [to_float(val) for val in row[1:]]
