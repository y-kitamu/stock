"""downloader.py

Author : Yusuke Kitamura
Create Date : 2021-11-14 16:11:52
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import csv
import time
from datetime import date, timedelta
from io import StringIO
from pathlib import Path
from typing import Optional

import pandas as pd
import requests
from fake_useragent import UserAgent

import stock
from stock import PROJECT_ROOT, logger


class Downloader:
    """Download stock data from yahoo finance.
    Args:
        save_dir (Path) : directory in which downloaed data is stored.
        timeout (int) : timeout limit of requesting.
        interval (int) : http request interval.
    """
    URL_TEMPLATE = "https://query1.finance.yahoo.com/v7/finance/download/{code}?{url_params}"

    def __init__(self, save_dir: Path, timeout: int = 100, interval: int = 1):
        start_epoch: int = 0
        day_sec = 24 * 60 * 60
        end_epoch: int = int(time.time()) // day_sec * day_sec
        self.url_params = {
            "period1": start_epoch,
            "period2": end_epoch,
            "interval": "1d",
            "events": "history",
            "includeAdjustedClose": "true",
        }
        self.timeout = timeout
        self.interval = interval  #
        self.last_time = time.time() - self.interval  # 最後にdataをdownloadした(http requestをした)日時
        self.save_dir = save_dir
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def get_random_user_agent(self):
        ua = UserAgent()
        return ua.random

    def get_all(self, csv_path: Path) -> bool:
        """csv_pathに記載されているすべての証券codeの株式dataを取得する
        Args:
            csv_path (Path) : csv file in which ticker symbols are listed.
        Output:
            (csv files) : csv files of stock historical data saved in `self.save_dir`
        """
        if not csv_path.exists():
            logger.warning(f"Ticker symbol csv does not exist : {csv_path}")
            return False
        with open(csv_path, 'rt') as f:
            csv_reader = csv.reader(f)
            next(csv_reader)
            ticker_symbols = [row[0] for row in csv_reader]

        logger.info("Number of tickers = {}".format(len(ticker_symbols)))
        for i, symbol in enumerate(ticker_symbols):
            res = self.download(symbol, is_save=True)
            if res is not None:
                logger.info("[{} / {}] Download success : ticker symbol = {}, save file = {}".format(
                    i, len(ticker_symbols), symbol, self.save_dir / f"{symbol}.csv"))
        return True

    def tick(self):
        """`self.last_time`からの経過時間が`self.interval`以下の場合、
        `self.last_time`から`self.interval`秒経過するまで待機する
        """
        now = time.time()
        sleep = self.interval - (now - self.last_time)
        if sleep > 0:
            time.sleep(sleep)
        self.last_time = now + sleep

    def get_output_csv_path(self, code: str) -> Path:
        return self.save_dir / f"{code}.csv"

    def download(self, code: str, is_save: bool = True) -> Optional[pd.DataFrame]:
        """指定した証券codeの株式dataをdownload、保存する
        Args:
           code (str) : stock code
         Return:
           (bool) : Return True if download is success, else False.
           (List) : stock data. [Date, Open, High, Low, Close, Adj Close, Volume]
        """
        if not self.is_need_update(code):
            return pd.read_csv(self.get_output_csv_path(code))
        self.tick()
        header = {'User-Agent': self.get_random_user_agent()}
        url_param_str = "&".join(["{}={}".format(key, val) for key, val in self.url_params.items()])
        url = self.URL_TEMPLATE.format(code=code, url_params=url_param_str)
        try:
            res = requests.get(url, headers=header, timeout=self.timeout)
        except Exception as exc:
            stock.logger.error("Failed to download data from {}".format(url), exc_info=exc)
            return None

        if not res.status_code == requests.codes.ok:
            stock.logger.warning("Status = {}. Failed to get data from {}".format(res.status_code, url))
            return None

        with StringIO(res.text) as ss:
            df = pd.read_csv(ss)

        if is_save:
            df.to_csv(self.get_output_csv_path(code))
        return df

    def is_need_update(self, code: str) -> bool:
        csv_path = self.get_output_csv_path(code)
        if not csv_path.exists():
            return True

        today = date.today()
        latest = today - timedelta(days=max(0, today.weekday() - 4))
        latest_str = latest.strftime("%Y-%m-%d")
        df = pd.read_csv(str(csv_path))
        return latest_str not in df["Date"].unique()


if __name__ == "__main__":
    import argparse

    STOCK_DATA_FILENAME = "stock_data.zip"

    parser = argparse.ArgumentParser()
    parser.add_argument("-s", "--save_dir", default=str(PROJECT_ROOT / "data" / "stock"))
    parser.add_argument("-t", "--ticker_symbol_csv", default=str(PROJECT_ROOT / "data" / "code.csv"))
    parser.add_argument("--timeout", default=int(100), type=int)
    parser.add_argument("--interval", default=int(2), type=int)

    args = parser.parse_args()
    save_dir = Path(args.save_dir)

    # download old data from gdrive
    zip_file = stock.gdr.download(STOCK_DATA_FILENAME, save_dir.parents[1])
    stock.zip.unzip(zip_file, save_dir.parents[1])

    # download stock data from yahoo finance
    # downloader = Downloader(save_dir, args.timeout, args.interval)
    # downloader.get_all(Path(args.ticker_symbol_csv))

    # search data on gdrive
    delete_target = stock.gdr.delete_file_by_name("stock_data.zip", dry_run=True)

    # upload
    zip_path = save_dir.parents[1] / "stock_data.zip"
    stock.zip.zip_directory(zip_path, save_dir.parent)
    stock.gdr.upload(zip_path)

    # delete old files
    stock.gdr.delete_all(delete_target)
