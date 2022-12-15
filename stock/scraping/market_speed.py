"""Power automateでMarket Speedから取得したデータを加工する
"""
import csv
from datetime import datetime
from pathlib import Path
from typing import Any, List

import pandas as pd


def create_formatted_csv(csv_path: Path, output_dir: Path):
    """Market Speedから取得したcsvをS&P500のcsvデータと同じ形式のcsvにする
    Args:
        csv_path (Path): Market Speedから取得したcsvのパス
        output_dir (Path): 出力先のディレクトリ
    """
    df = pd.read_csv(csv_path)
    df = df.sort_values("日付")
    df = df[df["始値"] != "-"]  # remove rows with no data
    rows: List[Any] = [["timestamp", "start", "high", "low", "end", "volume"]]
    for _, row in df.iterrows():
        date = datetime.strptime(row["日付"], "%Y/%m/%d")
        date = datetime(
            year=date.year,
            month=date.month,
            day=date.day,
            tzinfo=datetime.now().astimezone().tzinfo,
        )
        timestamp = date.timestamp() - date.utcoffset().seconds
        rows.append(
            [
                int(timestamp),
                str(row["始値"]).replace(",", ""),
                str(row["高値"]).replace(",", ""),
                str(row["安値"]).replace(",", ""),
                str(row["終値"]).replace(",", ""),
                str(row["出来高"]).replace(",", ""),
            ]
        )

    output_path = output_dir / csv_path.name
    with open(output_path, "w", encoding="utf8") as f:
        csv_writer = csv.writer(f)
        csv_writer.writerows(rows)
