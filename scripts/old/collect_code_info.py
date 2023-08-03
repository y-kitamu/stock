"""collect_code_info.py

Author : Yusuke Kitamura
Create Date : 2023-02-11 21:55:21
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import argparse
import csv
import json
from pathlib import Path

import stock

DEFAULT_CODE_LIST_CSV = stock.DATA_DIR / Path("margin_trade_target_list.csv")
DEFAULT_OUTPUT_DIR = stock.DATA_DIR / "code_info"


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-c",
        "--code_list_csv",
        type=Path,
        help="stock code list csv",
        default=DEFAULT_CODE_LIST_CSV,
    )
    parser.add_argument(
        "-o", "--output_dir", type=Path, help="output directory", default=DEFAULT_OUTPUT_DIR
    )

    args = parser.parse_args()
    code_list_csv = args.code_list_csv
    output_dir = Path(args.output_dir)

    with open(code_list_csv, "r") as f:
        csv_reader = csv.reader(f)
        header = next(csv_reader)
        code_list = [row[0] for row in csv_reader]

    code_list = [
        1419,
        1420,
        1431,
        1436,
        1439,
        1449,
        1451,
        1757,
        1840,
        1841,
        1873,
        1911,
        1925,
        1928,
        2721,
        2983,
        2999,
        3228,
        3241,
        3291,
        3293,
        3297,
        3407,
        3465,
        3467,
        3477,
        4204,
        5527,
        6192,
        6343,
        7837,
        8089,
        8860,
        8886,
        8904,
        8917,
        8919,
        8995,
        8999,
    ]

    output_dir.mkdir(exist_ok=True, parents=True)
    data = stock.scraping.monex_scouter.run(code_list)

    for code, info in data.items():
        with open(output_dir / Path(f"{code}.json"), "w") as f:
            json.dump(info, f, indent=4, ensure_ascii=False)
