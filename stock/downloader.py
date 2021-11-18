"""downloader.py

Author : Yusuke Kitamura
Create Date : 2021-11-14 16:11:52
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import datetime
import sys
import traceback
from io import StringIO
from pathlib import Path
from typing import Any, List, Optional

import numpy as np
import pandas as pd
import requests
from fake_useragent import UserAgent

import stock


class Downloader:
    """Download stock data from yahoo finance.
    Args:
    """
    URL_TEMPLATE = "https://query1.finance.yahoo.com/v7/finance/download/{code}?{url_params}"

    # period1=0&period2=1636761600&interval=1d&events=history&includeAdjustedClose=true

    def __init__(self, save_dir: Path, timeout: int = 100):
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
        self.save_dir = save_dir
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def download(self, code: str, is_save: bool = True) -> Optional[pd.DataFrame]:
        """指定した証券codeの株式dataをdownload、保存する
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
        except Exception:
            stock.logger.error("Failed to download data from {}\n{}".format(url, traceback.format_exc()))
            return None

        if not res.status_code == requests.codes.ok:
            stock.logger.warning("Status = {}. Failed to get data from {}".format(res.status_code, url))
            return None

        with StringIO(res.text) as ss:
            df = pd.read_csv(ss)

        if is_save:
            df.to_csv(self.save_dir / f"{code}.csv")
        return df
