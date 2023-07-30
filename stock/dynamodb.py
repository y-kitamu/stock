"""dynamodb.py
収集したデータをdynamo dbに保存するためのスクリプト。
AWSのcredentialは開発環境では環境変数に設定されているとする。
(`AWS_ACCESS_KEY_ID`と`AWS_SECRET_ACCESS_KEY`)

Author : Yusuke Kitamura
Create Date : 2022-11-26 09:10:03
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import decimal
from datetime import datetime
from typing import Dict, List, Optional

import boto3
from boto3.dynamodb.conditions import Key
from pydantic import BaseModel

# TODO: class (`TImeSeries`)を適切な場所に配置する
from stock.scraping.yahoo_finance import TimeSeries

from .. import logger

MISSING_VALUE = -1e9


class DynamoDBHandler:
    DEFAULT_REGION = "ap-northeast-1"
    STOCK_TABLE_NAME = "StockStats"

    def __init__(self, region_name: str = DEFAULT_REGION):
        self.dynamodb = boto3.resource("dynamodb", region_name=region_name)
        self.stock_table = self.prepare_stock_data_table()

    def is_table_exist(self, table_name: str = STOCK_TABLE_NAME):
        return len([tbl for tbl in self.dynamodb.tables.all() if tbl.name == table_name]) > 0

    def prepare_stock_data_table(self, table_name: str = STOCK_TABLE_NAME):
        if self.is_table_exist(table_name):
            return self.dynamodb.Table(table_name)

        table = self.dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {"AttributeName": "code", "KeyType": "HASH"},
                {"AttributeName": "date", "KeyType": "RANGE"},
            ],
            AttributeDefinitions=[
                {"AttributeName": "code", "AttributeType": "S"},
                {"AttributeName": "date", "AttributeType": "S"},
            ],
            ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
        )
        table.wait_until_exists()
        return table

    def add_data(self, code: str, ts: TimeSeries, overwrite=False):
        record = StockRecord.from_timeseries(code, ts)

        if self.is_record_exist(record):
            if not overwrite:
                logger.info(f"Record already exist. Skip add item : {record.get_key()}")
                return
            # `overwrite == True`ですでにkeyが存在する場合は一旦削除
            self.stock_table.delete_item(Key=record.get_key())

        self.stock_table.put_item(Item=record.dict())

    def get_data(self, code: str, max_scan_size: int = 10):
        """指定したcodeの株価データを取得する。"""
        stmt = Key("code").eq(code)
        kwargs = {
            "KeyConditionExpression": stmt,
            "Limit": max_scan_size,
        }
        items = []
        while True:
            res = self.stock_table.query(**kwargs)
            if "Items" not in res:
                break
            items += [StockRecord(**item).to_timeseries() for item in res["Items"]]

            if "LastEvaluatedKey" not in res:
                break
            kwargs["ExclusiveStartKey"] = res["LastEvaluatedKey"]

        return items
