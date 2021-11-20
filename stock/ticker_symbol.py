"""utility.py

Author : Yusuke Kitamura
Create Date : 2021-11-18 21:08:22
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import csv
import traceback
from pathlib import Path

from stock import PROJECT_ROOT, logger


def getLatestTickerSymbols(input_dir: Path, output_csv: Path) -> bool:
    """`input_dir`内の最新のcsvから証券codeの情報を取得、保存する
    """
    try:
        stock_file = sorted(input_dir.glob("nasdaq_screener_*.csv"))[-1]
        etf_file = sorted(input_dir.glob("nasdaq_etf_screener_*.csv"))[-1]
    except IndexError as exc:
        logger.error(f"Failed to find input csv file: {input_dir}/nasdaq_screener_*.csv.", exc_info=exc)
        return False
    return getUSTickerSymbols(stock_file, etf_file, output_csv)


def getUSTickerSymbols(stock_csv: Path, etf_csv: Path, output_csv: Path) -> bool:
    """Nasdaqのhome pageからdownloadしたstock listのcsvとetf listのcsvから
    証券codeを抜き出す。
    https://www.nasdaq.com/market-activity/stocks/screener
    Args:
       stock_csv (Path) : stock listを保存したcsv
       etf_csv (Path) : etr listを保存したcsv
       output_csv (Path) : 出力csv
    Output:
       (output_csv) : length of column = 1, header = (code)
    Return:
       (bool) : if True, process is success, else failure.
    """
    code_list = []
    for csv_path in [stock_csv, etf_csv]:
        if not csv_path.exists():
            logger.warning(f"Input csv file does not exist : {csv_path}")
            continue
        with open(csv_path, 'r') as f:
            csv_reader = csv.reader(f)
            next(csv_reader)
            code_list += [[row[0]] for row in csv_reader if "Data as of" not in row[0]]
    if len(code_list) == 0:
        logger.error("No ticker symbol is found.")
        return False

    with open(output_csv, 'w') as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow(["code"])
        csv_writer.writerows(code_list)
    logger.info(f"Save code list to {output_csv}")
    return True


if __name__ == "__main__":
    input_dir = PROJECT_ROOT / "data"
    output_csv = PROJECT_ROOT / "data" / "code.csv"
    getLatestTickerSymbols(input_dir, output_csv)
