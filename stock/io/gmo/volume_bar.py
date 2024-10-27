"""volume_bar.py

Author : Yusuke Kitamura
Create Date : 2024-10-26 16:45:22
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from pathlib import Path

import polars as pl


def convert_ticker_to_volume_bar(
    ticker_df: pl.DataFrame, volume_size: float, last_row: list | None = None
) -> pl.DataFrame:
    """
    tickerデータをvolume barデータに変換する
    Args:
        ticker_df (pl.DataFrame): tickerデータ (symbol, type, volume, price, date)
        volume_size (float): volume barのサイズ
    Return:
        pl.DataFrame: volume barデータ (open, high, low, close, volume, start_date, end_date)
    """
    volume_bar = {
        "open": [],
        "high": [],
        "low": [],
        "close": [],
        "volume": [],
        "start_date": [],
        "end_date": [],
    }
    cum_volume = 0
    high, low = 0, 0

    if last_row is not None:
        volume_bar["open"].append(last_row[0])
        volume_bar["start_date"].append(last_row[5])
        high = last_row[1]
        low = last_row[2]
        cum_volume = last_row[4]

    # volume barの作成
    for row in ticker_df.to_numpy():
        _, _, volume, price, date = row
        if cum_volume == 0:  # cum_volume == 0のときは新しいbarを作成
            volume_bar["open"].append(price)
            volume_bar["start_date"].append(date)
            high, low = price, price

        cum_volume += volume
        high = max(high, price)
        low = min(low, price)
        if cum_volume > volume_size:  # volume_sizeを超えたらbarを閉じる
            volume_bar["high"].append(high)
            volume_bar["low"].append(low)
            volume_bar["close"].append(price)
            volume_bar["volume"].append(cum_volume)
            volume_bar["end_date"].append(date)
            cum_volume = 0

    # 最後のbarが閉じられていない場合
    if len(volume_bar["open"]) != len(volume_bar["close"]):
        volume_bar["high"].append(high)
        volume_bar["low"].append(low)
        volume_bar["close"].append(price)
        volume_bar["volume"].append(cum_volume)
        volume_bar["end_date"].append(date)

    return pl.DataFrame(volume_bar)


def create_volume_bar_csv(input_csv_lists: list[Path], volume_size: float, output_dir: Path):
    """
    tickerデータをvolume barデータに変換してcsvファイルに保存する
    Args:
        input_csv_lists (list[Path]): tickerデータのcsvファイルのリスト
        volume_size (float): volume barのサイズ
        output_dir (Path): 出力先のディレクトリ
    """
    last_row = None
    for i in range(len(input_csv_lists)):
        csv_path = input_csv_lists[i]
        df = pl.read_csv(csv_path)
        volume_df = convert_ticker_to_volume_bar(df, volume_size, last_row)

        if len(volume_df) == 0:
            continue

        if i < len(input_csv_lists) - 1:
            if volume_df["volume"][-1] < volume_size:
                last_row = volume_df[-1].to_numpy()[0]
                volume_df = volume_df[:-1]
            else:
                last_row = None

        output_path = output_dir / csv_path.name.replace(
            ".csv.gz", "_{}.csv".format(str(volume_size).replace(".", "_"))
        )
        volume_df.write_csv(output_path)
