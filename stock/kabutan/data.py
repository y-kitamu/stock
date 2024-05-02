"""data.py

Author : Yusuke Kitamura
Create Date : 2024-03-24 17:27:13
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime
from typing import Any

import requests
from bs4 import BeautifulSoup

from ..util import convert_to_number


def get_stock_data(
    code: str, base_url: str = "https://kabutan.jp/stock/kabuka?code={}&ashi=day"
) -> list[list[Any]]:
    res = requests.get(base_url.format(code))
    soup = BeautifulSoup(res.text, features="lxml")

    daily_data = []
    stock_tables = soup.find("div", {"id": "stock_kabuka_table"})
    if stock_tables is None:
        return daily_data
    for table in stock_tables.find_all("table"):
        tbody = table.find("tbody")
        if tbody is None:
            continue
        for table_row in tbody.find_all("tr"):
            thead = table_row.find("th")
            tdata = table_row.find_all("td")
            if thead is None or len(tdata) < 7:
                break
            date = datetime.datetime.strptime(thead.text, "%y/%m/%d")
            start = convert_to_number(tdata[0].text)
            high = convert_to_number(tdata[1].text)
            low = convert_to_number(tdata[2].text)
            end = convert_to_number(tdata[3].text)
            volume = convert_to_number(tdata[6].text)
            daily_data.append([date, start, high, low, end, volume])

    return daily_data
