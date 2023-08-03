"""daily_update.py
Daily update script for the stock data
Author : Yusuke Kitamura
Create Date : 2022-08-28 12:02:58
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import json
import time

import stock


def scrape_and_upload(company_code: str):
    """yahoo financeから1日分のデータを取得して、dynamodbにアップする"""
    try:
        timeseries = stock.scraping.yahoo_finance.get_stock_time_series(code=company_code)
    except:
        stock.logger.exception(f"Failed to fetch data from yahoo finance. code = {company_code}")
        return

    try:
        handler = stock.storage.dynamodb.DynamoDBHandler()
        handler.add_data(code=company_code, ts=timeseries)
    except:
        stock.logger.exception(f"Failed to upload data to dynamodb. code = {company_code}")
        return


def main():
    """company_list"""
    company_list = json.loads(stock.COMPANY_LIST_JSON.read_text())["codes"]

    for code in company_list:
        stock.logger.debug(f"Start scraping and uploading data. code = {code}")
        scrape_and_upload(code)
        # 通信制限かけられないようにscrapingの間隔をあける
        time.sleep(stock.REQUEST_INTERVAL_SEC)


if __name__ == "__main__":
    main()
