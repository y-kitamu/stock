"""Markert Speedから取得したデータ (csv) をs&p500と同じ形式のcsvに変換するスクリプト
"""
import stock
from tqdm import tqdm


def run(input_dir, output_dir):

    for csv_path in tqdm(sorted(input_dir.glob("*.csv"))):
        stock.scraping.market_speed.create_formatted_csv(csv_path, output_dir)


if __name__ == "__main__":
    import argparse
    import pathlib

    parser = argparse.ArgumentParser()
    parser.add_argument("--input_dir", type=pathlib.Path, default=stock.DATA_DIR / "etfs/raw")
    parser.add_argument("--output_dir", type=pathlib.Path, default=stock.DATA_DIR / "etfs")
    args = parser.parse_args()

    stock.run_debug(run, args.input_dir, args.output_dir)
