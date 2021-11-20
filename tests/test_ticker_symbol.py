"""test_ticker_symbol.py

Author : Yusuke Kitamura
Create Date : 2021-11-20 11:40:53
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from stock import PROJECT_ROOT
from stock.ticker_symbol import getLatestTickerSymbols, getUSTickerSymbols


def test_getUSTickerSymbols1(tmp_path):
    stock_csv = PROJECT_ROOT / "data" / "nasdaq_screener_1637240144272.csv"
    etf_csv = PROJECT_ROOT / "data" / "nasdaq_etf_screener_1637241065934.csv"
    output_csv = tmp_path / "code.csv"

    res = getUSTickerSymbols(stock_csv, etf_csv, output_csv)
    assert res
    assert output_csv.exists()


def test_getUSTickerSymbols2(tmp_path):
    stock_csv = PROJECT_ROOT / "data" / "foo.csv"
    etf_csv = PROJECT_ROOT / "data" / "nasdaq_etf_screener_1637241065934.csv"
    output_csv = tmp_path / "code.csv"

    res = getUSTickerSymbols(stock_csv, etf_csv, output_csv)
    assert res
    assert output_csv.exists()


def test_getUSTickerSymbols3(tmp_path):
    stock_csv = PROJECT_ROOT / "data" / "foo.csv"
    etf_csv = PROJECT_ROOT / "data" / "bar.csv"
    output_csv = tmp_path / "code.csv"

    res = getUSTickerSymbols(stock_csv, etf_csv, output_csv)
    assert not res
    assert not output_csv.exists()


def test_getLatestTickerSymbols(tmp_path):
    output_csv = tmp_path / "code.csv"
    input_dir = PROJECT_ROOT / "foo"
    res = getLatestTickerSymbols(input_dir, output_csv)
    assert not res
    assert not output_csv.exists()

    input_dir = PROJECT_ROOT / "data"
    res = getLatestTickerSymbols(input_dir, output_csv)
    assert res
    assert output_csv.exists()
