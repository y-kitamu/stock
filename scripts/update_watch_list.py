"""update_watch_list.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 11:19:57
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
"""update_financial_data.py

Update financial data from Yahoo Finance.
Data is saved in ${PROJECT_ROOT}/data/codes/${ticker}.json.
33
Author : Yusuke Kitamura
Create Date : 2023-08-03 09:50:02
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import argparse
import csv
import json
from pathlib import Path
from typing import Any

import numpy as np
import yfinance as yf
from pyrate_limiter import Duration, Limiter, RequestRate
from requests import Session
from requests_cache import CacheMixin, SQLiteCache
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket

import stock


class CachedLimiterSession(CacheMixin, LimiterMixin, Session):
    pass


session = CachedLimiterSession(
    limiter=Limiter(RequestRate(2, Duration.SECOND * 0.2)),
    bucket_class=MemoryQueueBucket,
    backend=SQLiteCache("yfinance.cache"),
)


def trand_template_for_stage2(history: pd.DataFrame) -> bool:
    """第2ステージを特定するためのトレンドテンプレート"""
    close_values = history.Close.to_numpy()
    if len(close_values) < 60:
        return False
    ma10 = np.convolve(close_values, np.ones(10) / 10, mode="valid")
    ma30 = np.convolve(close_values, np.ones(30) / 30, mode="valid")
    ma40 = np.convolve(close_values, np.ones(40) / 40, mode="valid")
    current_value = close_values[-1]

    low52 = np.min(history.Low.to_numpy()[-52:])
    high52 = np.max(history.High.to_numpy()[-52:])

    flag = True
    # 現在の株価が30週移動平均線と40週移動平均線を上回っている
    flag &= current_value > ma40[-1] and current_value > ma30[-1]
    # 150日(30週)移動平均線が200日(40週)移動平均線を上回っている
    flag &= ma30[-1] > ma40[-1]
    # 200日(40週)移動平均線は少なくとも1ヶ月上昇トレンドにある
    flag &= np.all([ma40[-i - 1] - ma40[-i - 2] > 0 for i in range(4)])
    # 50日(10週)移動平均線は150日(30週)移動平均線と200日(40週)移動平均線を上回っている
    flag &= ma10[-1] > ma30[-1] and ma10[-1] > ma40[-1]
    # 現在の株価は50日移動平均線を上回っている
    flag &= current_value > ma10[-1]
    # 現在の株価は52週安値より少なくとも30%高い
    flag &= current_value > 1.3 * low52
    # 現在の株価は52週高値から少なくとも25%以内にある
    flag &= current_value > 0.75 * high52

    return flag


def fundamentals_template_for_stage2(q_data: dict[str, Any], y_data: dict[str, Any]) -> bool:
    """
    第2ステージを特定するためのファンダメンタルテンプレート
    Args:
        q_data (dict[str, Any]): Quarterly financial data
        y_data (dict[str, Any]): Yearly financial data
    """
    dates = sorted(q_data.keys())[::-1]

    flag = True
    # 直近四半期の利益がプラス
    try:
        flag &= q_data[dates[0]]["Diluted EPS"] > 0
    except:
        stock.logger.exception("Failed to get Diluted EPS")
        flag = False

    # 直近2四半期のepsが前年同期比で20%以上上昇
    try:
        if len(dates) > 4:
            flag &= q_data[dates[0]]["Diluted EPS"] > q_data[dates[4]]["Diluted EPS"] * 1.2
        if len(dates) > 5:
            flag &= q_data[dates[1]]["Diluted EPS"] > q_data[dates[5]]["Diluted EPS"] * 1.2
    except:
        stock.logger.exception("Failed to get Diluted EPS")
        flag = False

    # 直近年度の売上高が前年比で10%以上上昇
    try:
        flag &= y_data[dates[0]]["Total Revenue"] > y_data[dates[1]]["Total Revenue"] * 1.1
    except:
        stock.logger.exception("Failed to get Total Revenue")
        flag = False

    return flag


def calculate_relative_strengths(
    history: pd.DataFrame, num_division: int = 12, division_factor=1.1
) -> tuple[float, float, float]:
    close_values = history.Close.to_numpy()
    if len(close_values) < 52:
        return 0.0

    # relative strength
    rs_sp500 = relative_strength_52wk(
        close_values[-52:],
        sp500_closes[-52:],
        num_division=num_division,
        division_factor=division_factor,
    )
    rs_dow = relative_strength_52wk(
        close_values[-52:],
        dow_closes[-52:],
        num_division=num_division,
        division_factor=division_factor,
    )
    rs_nasdaq = relative_strength_52wk(
        close_values[-52:],
        nasdaq_closes[-52:],
        num_division=num_division,
        division_factor=division_factor,
    )

    return rs_sp500, rs_dow, rs_nasdaq


def main(ticker_list_path: Path, financial_data_dir: Path = stock.DATA_DIR / "codes"):
    """ """
    sp500_history = yf.Ticker("^GSPC").history(interval="1wk", period="2y")
    sp500_closes = sp500_history.Close.to_numpy()
    dow_history = yf.Ticker("^DJI").history(interval="1wk", period="2y")
    dow_closes = dow_history.Close.to_numpy()
    nasdaq_history = yf.Ticker("^IXIC").history(interval="1wk", period="2y")
    nasdaq_closes = nasdaq_history.Close.to_numpy()

    with open(ticker_list_path, "r") as f:
        reader = csv.reader(f)
        next(reader)
        tickers = [row[0] for row in reader]

    watch_list = []
    for ticker in tickers:
        try:
            yf_ticker = yf.Ticker(ticker, session=session)
            history = yf_ticker.history(interval="1wk", period="2y")
            yearly_financials = yf_ticker.financials.to_dict()
            with open(financial_data_dir / f"{ticker}.json", "r") as f:
                quarterly_financials = json.load(f)

            trand_template_for_stage2(history=history)
            fundamentals_template_for_stage2(q_data=quarterly_financials, y_data=yearly_financials)
        except KeyboardInterrupt:
            stock.logger.exception("Keyboard Interrupt.")
            break
        except:
            stock.logger.exception(f"Failed to update financial data. : {ticker}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--watch_list", type=Path, default=stock.DATA_DIR / "watch_list.csv")
    parser.add_argument("--financial_data_dir", type=Path, default=stock.DATA_DIR / "codes")
    args = parser.parse_args()

    main(ticker_list_path=args.ticker_list, output_dir=args.output_dir)
