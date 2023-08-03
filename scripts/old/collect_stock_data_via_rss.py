"""MarketSpeed RSSを使用して株価データを取得するスクリプト
RSSを使用するためにexcelを仲介する。
このスクリプトを実行する前に、excelファイルを開き、MarketSpeedに接続しておく必要がある。
"""

import argparse
import asyncio
import csv
from pathlib import Path

import xlwings as xw

import stock
import stock.marketspeed.constants as mc

DEFAULT_EXCEL_PATH = stock.constants.PROJECT_ROOT / "data/rss_data_collection_workbook.xlsx"
DEFAULT_CODE_LIST_CSV = stock.constants.PROJECT_ROOT / "data/margin_trade_target_list.csv"
DEFAULT_OUTPUT_DIR = Path(r"G:\マイドライブ\stock\data")
DEFAULT_COUNT = 5 * 60 + 2

VALID_INTERVALS = [
    "T",
    "1M",
    "2M",
    "3M",
    "4M",
    "5M",
    "10M",
    "15M",
    "30M",
    "60M",
    "2H",
    "4H",
    "8H",
    "D",
    "W",
    "M",
]


async def collect_data(
    sheet: xw.Sheet, code: str, output_dir: Path, interval: str, count: int = DEFAULT_COUNT
):
    """RSSを使用して株価データを取得、csvに出力する
    Args:
        sheet (xw.Sheet): excelのシート
        code (str): 銘柄コード
        output_dir (Path): 出力先ディレクトリ
        interval (str): 取得するデータの間隔。RSSの仕様に従う。
            (T, 1M, 2M, 3M, 4M, 5M, 10M, 15M, 30M, 60M, 2H, 4H, 8H, D, W, M)
        count (int) : 取得するデータ数。最大値はRSSの仕様に従う。
    """
    sheet.range("A1").value = f'=RssChart(,"{code}.T",{interval},{count})'
    await asyncio.sleep(1)
    values = sheet[f"D3:J{3 + count - 1}"].options(ndim=2).value

    timestamp = values[0][0].replace("/", "")
    output_path = output_dir / f"{timestamp}_{code}.csv"
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["day", "time", "open", "high", "low", "close", "volume"])
        writer.writerows(values)

    return output_path


async def run(
    code_list_csv: Path, output_dir: Path, interval: str, excel_path: Path = DEFAULT_EXCEL_PATH
):
    wb = xw.Book(excel_path)
    sheet = wb.sheets[0]

    with open(code_list_csv, "r", encoding="utf-8") as f:
        csv_reader = csv.reader(f)
        header = next(csv_reader)
        codes = [row[0] for row in csv_reader]

    output_dir.mkdir(exist_ok=True, parents=True)
    for code in codes:
        output_path = await collect_data(sheet, code, output_dir, interval)
        stock.logger.debug(output_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--code_csv", type=Path, default=DEFAULT_CODE_LIST_CSV)
    parser.add_argument("-o", "--output_dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("-i", "--interval", type=str, default="1M")

    args = parser.parse_args()

    if args.interval not in VALID_INTERVALS:
        raise ValueError(f"interval must be one of {VALID_INTERVALS}")

    code_list_csv = Path(args.code_csv)
    output_dir = Path(args.output_dir)
    asyncio.run(run(code_list_csv=code_list_csv, output_dir=output_dir, interval=args.interval))
