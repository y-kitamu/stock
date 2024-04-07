"""update_stock_data_jp.py
日本の企業の株価データを更新する
"""

import bisect
import csv
from pathlib import Path

import stock
from stock.util import convert_to_number


def update_csv(code: str):
    csv_path = stock.PROJECT_ROOT / Path("data/daily/{}.csv".format(code))
    data = []
    if csv_path.exists():
        with open(csv_path, "r") as f:
            csv_reader = csv.reader(f)
            next(csv_reader)
            data += [[row[0]] + [convert_to_number(col) for col in row[1:]] for row in csv_reader]
    data = sorted(data, key=lambda x: x[0])
    num_data = len(data)

    new_data = stock.kabutan.data.get_stock_data(code)
    for d in new_data:
        if bisect.bisect_left(
            data, d[0].strftime("%Y/%m/%d"), key=lambda x: x[0]
        ) == bisect.bisect_right(data, d[0].strftime("%Y/%m/%d"), key=lambda x: x[0]):
            data.append([d[0].strftime("%Y/%m/%d")] + d[1:])

    if num_data < len(data):
        header = ["date", "open", "high", "low", "close", "volume"]
        with open(csv_path, "w", encoding="utf-8") as f:
            csv_writer = csv.writer(f)
            csv_writer.writerow(header)
            csv_writer.writerows(data)
        stock.logger.info(f"Update csv : {csv_path}")


def main():
    codes_csv = stock.PROJECT_ROOT / "data" / "data_j.csv"
    with open(codes_csv, "r") as f:
        csv_reader = csv.reader(f)
        next(csv_reader)
        codes = [row[0] for row in csv_reader]

    for code in codes:
        update_csv(code)

    # 株価指数
    update_csv("0000")  # 日経平均
    update_csv("0010")  # topix


if __name__ == "__main__":
    main()
    # update_csv("6254")
