"""gmo_fetcher.py
"""

import datetime
import io
from pathlib import Path

import polars as pl
import requests
from tqdm import tqdm

from ...constants import PROJECT_ROOT
from ..session import get_session

# base_url = "https://api.coin.z.com/data/trades/{ticker}/{yyyy}/{mm:02d}/{yyyymmdd}_{ticker}.csv.gz"
# output_root_dir = stock.PROJECT_ROOT / "data" / "tick_data"


class GMOFethcer:
    _API_ENDPOINT = "https://api.coin.z.com"

    def __init__(self, data_dir: Path = PROJECT_ROOT / "data" / "tick_data"):
        self.data_dir = data_dir
        self.available_tickers = self.get_available_tickers()
        self.session = get_session()

    def get_available_tickers(self) -> list[str]:
        path = "/public/v1/ticker"
        response = requests.get(self._API_ENDPOINT + path)
        response.raise_for_status()
        return [row["symbol"] for row in response.json()["data"]]

    def download_all(self):
        for ticker in tqdm(self.available_tickers):
            date = datetime.date.today() - datetime.timedelta(days=1)
            while True:
                output_path = self.data_dir / "{date}/{date}_{ticker}.csv.gz".format(
                    date=date.strftime("%Y%m%d"), ticker=ticker
                )
                if output_path.exists():  # Already downloaded
                    break
                df = self.download(ticker, date, output_path)
                if len(df) == 0:  # No data
                    break
                date -= datetime.timedelta(days=1)

    def download(
        self, ticker: str, date: datetime.date, output_path: Path | None = None
    ) -> pl.DataFrame:
        """Download tick data for the specified date"""
        path = "/data/trades/{ticker}/{year}/{month:02d}/{date}_{ticker}.csv.gz".format(
            ticker=ticker, year=date.year, month=date.month, date=date.strftime("%Y%m%d")
        )
        response = self.session.get(self._API_ENDPOINT + path)
        if response.status_code != 200:
            return pl.DataFrame()

        if output_path is not None:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            with output_path.open("wb") as f:
                f.write(response.content)
        return pl.read_csv(io.BytesIO(response.content))

    def fetch_ticker(
        self,
        symbol: str,
        start_date: datetime.datetime | None = None,
        end_date: datetime.datetime | None = None,
    ) -> pl.DataFrame:
        if symbol not in self.available_tickers:
            raise ValueError(f"{symbol} is not available")

        ticker_file_list = sorted(self.data_dir.rglob(f"*_{symbol}.csv.gz"))
        if start_date is None:
            start_date = datetime.datetime(1970, 1, 1)
        if end_date is None:
            end_date = datetime.datetime.now()

        dfs = []
        for file_path in ticker_file_list:
            date = datetime.datetime.strptime(file_path.parent.name, "%Y%m%d")
            if start_date.date() <= date.date() <= end_date.date():
                dfs.append(pl.read_csv(file_path))
        if len(dfs) == 0:
            return pl.DataFrame()

        df = (
            pl.concat(dfs)
            .lazy()
            .select(
                pl.col("symbol"),
                pl.col("side"),
                pl.col("price"),
                pl.col("size"),
                pl.col("timestamp").str.to_datetime("%Y-%m-%d %H:%M:%S.%3f").alias("datetime"),
            )
            .filter(pl.col("datetime").is_between(start_date, end_date))
            .collect()
        )
        return df

    def fetch_ohlc(
        self,
        symbol: str,
        inteval: datetime.timedelta,
        start_date: datetime.datetime | None = None,
        end_date: datetime.datetime | None = None,
        fill_missing_date: bool = False,
    ) -> pl.DataFrame:
        if symbol not in self.available_tickers:
            raise ValueError(f"{symbol} is not available")

    def fetch_volume_bar(
        self,
        symbol: str,
        volume_size: float,
        start_date: datetime.datetime | None = None,
        end_date: datetime.datetime | None = None,
    ) -> pl.DataFrame:
        if symbol not in self.available_tickers:
            raise ValueError(f"{symbol} is not available")
        pass
