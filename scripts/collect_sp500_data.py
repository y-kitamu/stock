"""s&p500のデータを取得するスクリプト
デフォルトでは日毎の10年分のデータを取得する。
"""
import csv
import time

import stock

SP500_COMPANY_LIST = "sp500_companies.csv"
DEFAULT_OUTPUT_DIR = stock.DATA_DIR / "sp500"


def run(output_dir, interval="1d", time_range="10y", overwrite=False):
    """ """
    csv_path = stock.DATA_DIR / SP500_COMPANY_LIST
    with open(csv_path, "r") as f:
        csv_reader = csv.reader(f)
        company_list = list(csv_reader)[1:]

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
             data.to_csv(output_csv)
        except:
            stock.logger.exception(f"Failed to get data: {ticker}")

        stock.logger.debug(f"Finish collect data : {ticker}")
        time.sleep(stock.REQUEST_INTERVAL_SEC)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output_dir", type=str, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("-i", "--interval", type=str, default="1d")
    parser.add_argument("-t", "--time_range", type=str, default="10y")
    parser.add_argument("-f", "--force", action="store_true")

    args = parser.parse_args()

    run(args.output_dir, interval=args.interval, time_range=args.time_range, overwrite=args.force)
