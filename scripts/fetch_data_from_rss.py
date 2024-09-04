"""RSSからデータを収集するスクリプト
"""
import time
import csv
from pathlib import Path

import xlwings as xw
import polars as pl
from tqdm import tqdm

import stock

def main():
    excel_path = stock.PROJECT_ROOT / "data" / "rss.xlsx"
    wb = xw.Book(excel_path)
    sheet = wb.sheets[0]
    code_list = stock.get_code_list(include_etf=True)

    data_num = 302 * 8
    output_root_dir = Path("/d/stock/data/minutes")
    if not output_root_dir.exists():
        output_root_dir = stock.PROJECT_ROOT / "data/minutes"
    #output_root_dir.mkdir(exist_ok=True)

    for code in tqdm(code_list):
        sheet["A1"].formula = f"=RssChart(A2:J2,\"{code}\", \"1M\", {data_num})"
        time.sleep(0.5)
        data = sheet[f"D3:J{3 + data_num - 1}"].value

        cnt = 0
        while data[0][0] is None and cnt < 5:
            time.sleep(0.5)
            cnt += 1
            data = sheet[f"D3:J{3 + data_num - 1}"].value

        if data[0][0] is None:
            print("Failed to fetch data : {}".format(code))

        for date in set([d[0] for d in data]):
            day_data = [d for d in data if d[0] == date]
            if not len(day_data) == 302:
                print("Invalid day data : {} - {}".format(code, date))
                continue
            date = date.replace("/", "")
            output_path = output_root_dir / date / f"{code}_{date}.csv"
            output_path.parent.mkdir(exist_ok=True)

            with open(output_path, "w", encoding="utf-8") as f:
                writer = csv.writer(f, lineterminator="\n")
                writer.writerow([
                    "date", "minutes", "open", "high", "low", "close", "volume"
                ])
                writer.writerows(day_data)
        # break

if __name__ == "__main__":
    main()