"""update_rs_short_list.py
relative strengthが高い銘柄のリストを更新する
Author : Yusuke Kitamura
Create Date : 2024-05-01 22:21:03
"""

import csv
from datetime import datetime
from pathlib import Path

import numpy as np

import stock


def main(
    num_collect: int = 10, output_path: Path = stock.PROJECT_ROOT / "data" / "rs_short_list.csv"
):
    cur_day = datetime.today().date()
    df = stock.simulation.collect_relative_strengths_to_df(cur_day, cur_day)

    for row in df.iter_rows():
        vals = np.array(row[:-1])
        codes = df.columns
        rs_indices = vals.argsort()[::-1][:num_collect]
        targets = [[codes[idx], vals[idx]] for idx in rs_indices]

        with open(output_path, "w", encoding="utf-8", newline="\n") as f:
            csv_writer = csv.writer(f, lineterminator="\n")
            csv_writer.writerow(["code", "relative_strength"])
            csv_writer.writerows(targets)

        stock.logger.debug("Updated rs_short_list.csv")
        break


if __name__ == "__main__":
    main()
