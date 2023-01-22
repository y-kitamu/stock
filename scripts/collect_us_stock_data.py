"""collect_us_stock_data.py

Author : Yusuke Kitamura
Create Date : 2023-01-22 22:04:07
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import csv
import time
from datetime import datetime, timezone

import stock


def convert_timestamp_to_day(timestamp: int):
    """取得したTimestampをUTCでYYYY/MM/DD 00:00:00のものに変換する"""
    dt = datetime.fromtimestamp(timestamp)
    return int(datetime(dt.year, dt.month, dt.day, tzinfo=timezone.utc).timestamp())


def run(csv_path, output_dir, interval="1d", time_range="10y", overwrite=False):
    """s&p500のデータを取得する。
    データのタイムスタンプはUTCのYYYY/MM/DD 00:00:00にする。
    """

    with open(csv_path, "r") as f:
        csv_reader = csv.reader(f)
        company_list = list(csv_reader)

    for company in company_list:
        ticker = company[0].replace(".", "-")
        output_csv = output_dir / f"{ticker}.csv"
        if output_csv.exists():
            continue
        try:
            data = stock.scraping.yahoo_finance.get_stock_time_series(
                code=ticker, interval=interval, time_range=time_range
            )
            if len(data) == 0:
                continue

            data.timestamp = [convert_timestamp_to_day(t) for t in data.timestamp]
            data.to_csv(output_csv)
        except:
            stock.logger.exception(f"Failed to get data: {ticker}")

        stock.logger.debug(f"Finish collect data : {ticker}")
        time.sleep(stock.REQUEST_INTERVAL_SEC)


if __name__ == "__main__":
    import argparse

    COMPANY_LIST = "us_etf_codes.csv"
    DEFAULT_OUTPUT_DIR = stock.DATA_DIR / "us_etf"

    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--codes_csv", type=str, default=str(stock.DATA_DIR / COMPANY_LIST))
    parser.add_argument("-o", "--output_dir", type=str, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("-i", "--interval", type=str, default="1d")
    parser.add_argument("-t", "--time_range", type=str, default="10y")
    parser.add_argument("-f", "--force", action="store_true")

    args = parser.parse_args()

    run(
        args.codes_csv,
        args.output_dir,
        interval=args.interval,
        time_range=args.time_range,
        overwrite=args.force,
    )
