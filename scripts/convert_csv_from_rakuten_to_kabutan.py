"""convert_csv_from_rakuten_to_kabutan.py
market speedから取得したデータを株たんのcsv形式に変換する
"""

import csv
import datetime
from pathlib import Path

import stock


def convert(source_csv_path: Path, output_path: Path):
    with open(source_csv_path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader)
        data = [row for row in reader]

    def convert_row(row):
        date = row[0]
        open_price = stock.util.convert_to_number(row[1])
        high_price = stock.util.convert_to_number(row[2])
        low_price = stock.util.convert_to_number(row[3])
        close_price = stock.util.convert_to_number(row[4])
        volume = stock.util.convert_to_number(row[6])
        return [date, open_price, high_price, low_price, close_price, volume]

    output_header = ["date", "open", "high", "low", "close", "volume"]
    output_data = sorted([convert_row(row) for row in data], key=lambda x: x[0])

    with open(output_path, "w", encoding="utf-8") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(output_header)
        writer.writerows(output_data)

    stock.logger.info(f"Converted {source_csv_path} to {output_path}")


def main(source_dir: Path, output_dir: Path):
    for source_csv_path in source_dir.glob("*.csv"):
        output_csv_path = output_dir / source_csv_path.name
        convert(source_csv_path, output_csv_path)


if __name__ == "__main__":
    source_dir = stock.PROJECT_ROOT / "data" / "ms_data"
    output_dir = stock.PROJECT_ROOT / "data" / "daily"
    main(source_dir, output_dir)
