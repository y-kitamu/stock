"""yahoo_finance.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 13:53:59
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import re
from typing import Dict

from fake_useragent import UserAgent
import requests
import pandas as pd


BASE_URL: str = "https://finance.yahoo.com/"
REQUEST_HEADER = {
    "User-Agent": UserAgent().chrome
}
REQUEST_CONFIG = {
    "timeout": (3, 10)  # (connect, read)
}


def get_statistics(code: str) -> Dict[str, str]:
    """ """
    url = f"{BASE_URL}quote/{code}/key-statistics"
    r = requests.get(url, headers=REQUEST_HEADER, **REQUEST_CONFIG)
    if r.status_code != requests.codes.ok:
        print(f"Failed to fetch data from {url}. status_code = {r.status_code}")
        return {}

    stats = {}
    tables = re.findall("<table.*</table>", r.text)
    for table in tables:
        table = re.sub("<sup.*?</sup>", "", table)
        table = re.sub(r"\(.*?\)", "", table)
        for df in pd.read_html(table, index_col=0):
            stats.update(df.to_dict()[1])

    return stats
