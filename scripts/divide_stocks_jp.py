"""divide_stocks_jp.py
"""

import re
from datetime import datetime, timedelta

import polars as pl
import requests
from bs4 import BeautifulSoup

import stock


def divide_stock(code: str, date: datetime, rate: float):
    csv_path = stock.PROJECT_ROOT / "data" / "daily" / f"{code}.csv"
    df = stock.kabutan.read_data_csv(csv_path, exclude_none=False)

    def _get_expression(key: str, date: datetime, rate):
        return pl.when(pl.col("date") < date).then(pl.col(key) / rate).otherwise(pl.col(key))

    target_df = df.with_columns(
        pl.col("date").dt.strftime("%Y/%m/%d"),
        _get_expression("open", date, rate),
        _get_expression("high", date, rate),
        _get_expression("low", date, rate),
        _get_expression("close", date, rate),
        _get_expression("volume", date, 1.0 / rate),
    )
    target_df.write_csv(csv_path)


def main():
    target_date = datetime.today() + timedelta(days=1)
    res = requests.get(
        "https://www.sbisec.co.jp/ETGate/WPLETmgR001Control?OutSide=on&getFlg=on&burl=search_domestic&cat1=domestic&cat2=corporate&dir=corporate&file=stock_ca_bunkatsu.html"
    )
    soup = BeautifulSoup(res.content)

    re_date = re.compile("\d\d/\d\d/\d\d")
    main = soup.find("div", {"id": "main"})
    if main is not None:
        for tr in main.find_all("tr", {"align": "center"}):
            tds = tr.find_all("td")
            if len(tds) != 4:
                continue
            res = re_date.search(tds[0].text)
            if res is None:
                continue
            date = datetime.strptime(res.group(0), "%y/%m/%d")
            if date == target_date:
                code = tds[1].text.split("\xa0")[1]
                splits = tds[3].text.split("\xa0")
                rate = float(splits[3]) / float(splits[1])
                divide_stock(code, date, rate)
                print(f"Divide stock : code = {code}, rate = {rate}")


if __name__ == "__main__":
    main()
