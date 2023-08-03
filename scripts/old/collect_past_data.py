"""collect_past_data.py
過去30日間のデータを集めてdbに追加する
Author : Yusuke Kitamura
Create Date : 2022-11-26 16:00:26
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import json
import time
from datetime import datetime, timedelta, timezone

import stock


def scrape_and_upload(company_code: str, start_date: datetime):
    """過去のデータを取得してdbに追加する
    Args:
        company_code (str): 企業コード
        start_date (datetime): 開始日
    """
    # USの株式市場(pre-market)はutcの9時から始まる
    start_date = datetime(
        start_date.year, start_date.month, start_date.day, 9, 0, 0, tzinfo=timezone.utc
    )
    end_date = datetime(
        start_date.year, start_date.month, start_date.day, 8, 59, 59, tzinfo=timezone.utc
    ) + timedelta(days=1)
    try:
        ts = stock.scraping.yahoo_finance.get_stock_time_series(
            code=company_code, start_date=start_date, end_date=end_date
        )
    except:
        stock.logger.exception(
            "Failed to fetch data from yahoo finance. code = {}, start_date = {}".format(
                company_code, start_date.strftime("%Y%m%d")
            )
        )
        return

    # TODO: refactor (毎回dbにアクセスするのは無駄, batch処理にする? -> データ量が多くなってきたら考える)
    try:
        handler = stock.storage.dynamodb.DynamoDBHandler()
        handler.add_data(code=company_code, ts=ts)
    except:
        stock.logger.exception(f"Failed to upload data to dynamodb. code = {company_code}")
        return


def main(company_code: str):
    """ """
    stock.logger.debug("Start collecting past data. code = {}".format(company_code))
    # 過去30日間のデータを取得する
    today = datetime.now(timezone.utc)
    for i in range(30):
        start_date = today - timedelta(days=i)
        stock.logger.debug("  start_date = {}".format(start_date.strftime("%Y%m%d")))
        scrape_and_upload(company_code=company_code, start_date=start_date)
        time.sleep(stock.REQUEST_INTERVAL_SEC)


def run_all():
    """ """
    company_list = json.loads(stock.COMPANY_LIST_JSON.read_text())["codes"]

    for code in company_list:
        main(company_code=code)


if __name__ == "__main__":
    run_all()
