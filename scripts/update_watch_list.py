"""update_watch_list.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 11:19:57
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import argparse
import csv
import json
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
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
    q_dates = sorted(q_data.keys())[::-1]
    y_dates = sorted(y_data.keys())[::-1]

    flag = True
    # 直近四半期の利益がプラス
    try:
        flag &= q_data[q_dates[0]]["Diluted EPS"] > 0
    except:
        stock.logger.exception("Failed to get Diluted EPS")
        flag = False

    # 直近2四半期のepsが前年同期比で20%以上上昇
    try:
        if len(q_dates) > 4:
            flag &= q_data[q_dates[0]]["Diluted EPS"] > q_data[q_dates[4]]["Diluted EPS"] * 1.2
        if len(q_dates) > 5:
            flag &= q_data[q_dates[1]]["Diluted EPS"] > q_data[q_dates[5]]["Diluted EPS"] * 1.2
    except:
        stock.logger.exception("Failed to get Diluted EPS")
        flag = False

    # 直近年度の売上高が前年比で10%以上上昇
    try:
        flag &= y_data[y_dates[0]]["Total Revenue"] > y_data[y_dates[1]]["Total Revenue"] * 1.1
    except:
        stock.logger.exception("Failed to get Total Revenue")
        flag = False

    return flag


def calculate_relative_strengths(
    history: pd.DataFrame,
    sp500_closes: np.ndarray,
    dow_closes: np.ndarray,
    nasdaq_closes: np.ndarray,
    num_division: int = 12,
    division_factor=1.1,
) -> tuple[float, float, float]:
    close_values = history.Close.to_numpy()
    if len(close_values) < 52:
        return 0.0, 0.0, 0.0

    # relative strength
    rs_sp500 = stock.relative_strength.relative_strength_52wk(
        close_values[-52:],
        sp500_closes[-52:],
        num_division=num_division,
        division_factor=division_factor,
    )
    rs_dow = stock.relative_strength.relative_strength_52wk(
        close_values[-52:],
        dow_closes[-52:],
        num_division=num_division,
        division_factor=division_factor,
    )
    rs_nasdaq = stock.relative_strength.relative_strength_52wk(
        close_values[-52:],
        nasdaq_closes[-52:],
        num_division=num_division,
        division_factor=division_factor,
    )

    return rs_sp500, rs_dow, rs_nasdaq


def collect_index_data():
    sp500_history = yf.Ticker("^GSPC", session=session).history(interval="1wk", period="2y")
    sp500_closes = sp500_history.Close.to_numpy()
    dow_history = yf.Ticker("^DJI", session=session).history(interval="1wk", period="2y")
    dow_closes = dow_history.Close.to_numpy()
    nasdaq_history = yf.Ticker("^IXIC", session=session).history(interval="1wk", period="2y")
    nasdaq_closes = nasdaq_history.Close.to_numpy()
    return sp500_closes, dow_closes, nasdaq_closes


def read_ticker_list(ticker_list_path: Path) -> dict[str, Any]:
    with open(ticker_list_path, "r") as f:
        reader = csv.reader(f)
        next(reader)
        rows = list(reader)
    tickers = [row[0] for row in rows]
    sectors_set = set([row[4] for row in rows])
    sectors_dict = {sector: idx for idx, sector in enumerate(sorted(sectors_set))}
    sectors = np.array([sectors_dict[row[4]] for row in rows], dtype=int)
    return {"tickers": tickers, "sectors": sectors, "sectors_dict": sectors_dict}


def calculate_conditions(ticker: str, financial_data_dir: Path) -> dict[str, Any]:
    yf_ticker = yf.Ticker(ticker, session=session)
    history = yf_ticker.history(interval="1wk", period="2y")
    yearly_financials = yf_ticker.financials.to_dict()
    with open(financial_data_dir / f"{ticker}.json", "r") as f:
        quarterly_financials = json.load(f)

    judge = True
    judge &= trand_template_for_stage2(history=history)
    judge &= fundamentals_template_for_stage2(q_data=quarterly_financials, y_data=yearly_financials)

    sp500_closes, dow_closes, nasdaq_closes = collect_index_data()
    rs_sp500, rs_dow, rs_nasdaq = calculate_relative_strengths(
        history=history,
        sp500_closes=sp500_closes,
        dow_closes=dow_closes,
        nasdaq_closes=nasdaq_closes,
    )
    rs = rs_sp500 + rs_dow + rs_nasdaq

    return {
        "judge": judge,
        "relative_strength": rs,
    }


def create_watch_list(
    watch_list_path: Path,
    tickers: list[str],
    judges: np.ndarray,
    rss: np.ndarray,
):
    pt80 = np.percentile(rss, 80)
    is_good = np.logical_and(judges, rss > pt80)

    # watch listの作成
    watch_list = []
    for ticker, judge in zip(tickers, is_good):
        if judge:
            watch_list.append(ticker)

    with open(watch_list_path, "w") as f:
        writer = csv.writer(f)
        writer.writerow(["ticker"])
        for ticker in watch_list:
            writer.writerow([ticker])

    return watch_list


def calculate_relative_strengths_per_sector(
    sectors: np.ndarray,
    rss: np.ndarray,
    sectors_dict: dict[str, int],
) -> dict[str, float]:
    # sectorごとのrelative strengthの計算
    rss_per_sector = {}
    for sector in sectors_dict.keys():
        idx = sectors_dict[sector]
        rss_per_sector[sector] = np.mean(rss[sectors == idx])

    return rss_per_sector


def count_watch_list_per_sector(
    sectors: np.ndarray,
    tickers: list[str],
    watch_list: list[str],
    sectors_dict: dict[str, int],
) -> tuple[dict[str, int], dict[str, int]]:
    # sectorごとのwatch listの銘柄数を計算
    counts = np.zeros(len(sectors_dict), dtype=int)
    for ticker in watch_list:
        counts[sectors[tickers.index(ticker)]] += 1

    total = np.zeros(len(sectors_dict), dtype=int)
    for sector_idx in sectors:
        total[sector_idx] += 1

    watch_list_per_sector = {}
    for setor, indx in sectors_dict.items():
        watch_list_per_sector[setor] = int(counts[indx])

    total_per_sector = {}
    for setor, indx in sectors_dict.items():
        total_per_sector[setor] = int(total[indx])
    return watch_list_per_sector, total_per_sector


def create_summary(
    summary_file: Path,
    tickers: list[str],
    sectors: np.ndarray,
    sectors_dict: dict[str, int],
    rss: np.ndarray,
    watch_list: list[str],
):
    rss_per_sector = calculate_relative_strengths_per_sector(
        sectors=sectors,
        rss=rss,
        sectors_dict=sectors_dict,
    )

    watch_list_per_sector, count_per_sector = count_watch_list_per_sector(
        sectors=sectors,
        tickers=tickers,
        watch_list=watch_list,
        sectors_dict=sectors_dict,
    )
    summary = {
        "rss_per_sector": rss_per_sector,
        "watch_list_per_sector": watch_list_per_sector,
        "sector_per_sector": count_per_sector,
    }
    print(summary)

    with open(summary_file, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=4, ensure_ascii=False)


def main(
    ticker_list_path: Path,
    financial_data_dir: Path = stock.DATA_DIR / "codes",
    watch_list_path: Path = stock.DATA_DIR / "watch_list.csv",
    summary_file: Path = stock.DATA_DIR / "summary.json",
):
    """watch listを作成するために必要な情報を収集し、ファイルに出力する。"""
    # 対象銘柄のtickerとsectorを取得
    ticker_info = read_ticker_list(ticker_list_path)
    tickers: list[str] = ticker_info["tickers"]
    sectors: np.ndarray = ticker_info["sectors"]

    # 対象銘柄の情報の取得、判定
    judges = np.ones(len(tickers), dtype=bool)
    rss = np.zeros(len(tickers))
    for idx, ticker in enumerate(tickers):
        stock.logger.info(f"Processing {ticker} ({idx+1}/{len(tickers)})")
        try:
            res = calculate_conditions(ticker, financial_data_dir)
            judges[idx] = res["judge"]
            rss[idx] = res["relative_strength"]
        except KeyboardInterrupt:
            stock.logger.exception("Keyboard Interrupt.")
            break
        except:
            stock.logger.exception(f"Failed to update financial data. : {ticker}")

    # watch listの作成
    watch_list = create_watch_list(
        watch_list_path=watch_list_path,
        tickers=tickers,
        judges=judges,
        rss=rss,
    )

    # サマリーデータの作成
    create_summary(
        summary_file=summary_file,
        tickers=tickers,
        sectors=sectors,
        sectors_dict=ticker_info["sectors_dict"],
        rss=rss,
        watch_list=watch_list,
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ticker_list", type=Path, default=stock.DATA_DIR / "us_stock_codes.csv")
    parser.add_argument("--watch_list", type=Path, default=stock.DATA_DIR / "watch_list.csv")
    parser.add_argument("--financial_data_dir", type=Path, default=stock.DATA_DIR / "codes")
    parser.add_argument("--summary_file", type=Path, default=stock.DATA_DIR / "summary.json")
    args = parser.parse_args()

    main(
        ticker_list_path=args.ticker_list,
        financial_data_dir=args.financial_data_dir,
        watch_list_path=args.watch_list,
    )
