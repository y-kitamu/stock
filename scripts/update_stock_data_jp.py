"""update_stock_data_jp.py
日本の企業の株価データを更新する
"""

import csv
from datetime import date, datetime, timedelta
from pathlib import Path

import polars as pl

import stock
from stock.util import convert_to_number


def calc_relative_strength(df: pl.DataFrame, ref_df: pl.DataFrame, end: date, rs: float):
    if rs > -10.0:
        return rs
    start = end - timedelta(days=365)
    if start < df["date"][0]:
        return -1.0
    df = df.filter((start < pl.col("date")) & (pl.col("date") <= end))
    df = df.filter(pl.col("volume").is_not_nan().is_not_null() & (pl.col("volume") > 0))
    ref_df = ref_df.filter((start < pl.col("date")) & (pl.col("date") <= end))
    if len(df) != len(ref_df):
        return -1.0

    return stock.algorithm.relative_strength.relative_strength(
        df["close"].to_numpy(), ref_df["close"].to_numpy()
    )


def calc_relative_strength_v2(df: pl.DataFrame, ref_df: pl.DataFrame, end: date, rs: float):
    if rs > -10.0:
        return rs
    return stock.algorithm.relative_strength.relative_strength_v2(
        df, ref_df, start_date=end - timedelta(30), end_date=end
    )


def update_csv(code: str, update_rs: bool = True):
    csv_path = stock.PROJECT_ROOT / Path("data/daily/{}.csv".format(code))
    stock.logger.info(f"Start update csv : {csv_path}")
    if not csv_path.exists():
        with open(csv_path, "w") as f:
            f.write("date,open,high,low,close,volume,rs_nikkei,rs_topix,rs\n")

    df = stock.kabutan.read_data_csv(csv_path, exclude_none=False, with_rs=update_rs)
    df_with_epoch = df.with_columns(pl.col("date").dt.epoch(time_unit="d").alias("epoch"))

    new_data = stock.kabutan.data.get_stock_data(code)
    new_data = [
        d
        for d in new_data
        if df_with_epoch["epoch"].search_sorted((d[0].date() - date(1970, 1, 1)).days, side="left")
        == df_with_epoch["epoch"].search_sorted((d[0].date() - date(1970, 1, 1)).days, side="right")
    ]

    if len(new_data) > 0:
        header = ["date", "open", "high", "low", "close", "volume"]
        data = {head: [d[idx] for d in new_data] for idx, head in enumerate(header)}
        new_df = pl.DataFrame(data).with_columns(
            pl.col("date").cast(pl.Date),
            pl.col("open").cast(pl.Float64),
            pl.col("high").cast(pl.Float64),
            pl.col("low").cast(pl.Float64),
            pl.col("close").cast(pl.Float64),
            pl.col("volume").cast(pl.Int64),
        )

        if update_rs:
            nikkei_df = stock.kabutan.read_data_csv(
                stock.PROJECT_ROOT / "data/daily/0000.csv", exclude_none=False, with_rs=False
            )
            topix_df = stock.kabutan.read_data_csv(
                stock.PROJECT_ROOT / "data/daily/0010.csv", exclude_none=False, with_rs=False
            )

            new_df = new_df.with_columns(
                pl.lit(-10.0).alias("rs_nikkei"),
                pl.lit(-10.0).alias("rs_topix"),
                pl.lit(-10.0).alias("rs"),
            )
            df = pl.concat([df, new_df]).sort("date")
            df = df.with_columns(
                pl.struct("date", "rs_nikkei")
                .map_elements(
                    lambda val: calc_relative_strength(
                        df, nikkei_df, val["date"], val["rs_nikkei"]
                    ),
                    return_dtype=pl.Float64,
                )
                .alias("rs_nikkei"),
                pl.struct("date", "rs_topix")
                .map_elements(
                    lambda val: calc_relative_strength(df, topix_df, val["date"], val["rs_topix"]),
                    return_dtype=pl.Float64,
                )
                .alias("rs_topix"),
                pl.struct("date", "rs")
                .map_elements(
                    lambda val: calc_relative_strength_v2(df, topix_df, val["date"], val["rs"]),
                    return_dtype=pl.Float64,
                )
                .alias("rs"),
            )
        else:
            df = pl.concat([df, new_df])

        df.with_columns(pl.col("date").dt.to_string("%Y/%m/%d")).write_csv(csv_path)


def main():
    # 株価指数
    update_csv("0000", update_rs=True)  # 日経平均
    update_csv("0010", update_rs=True)  # topix

    # 個別銘柄
    codes_csv = stock.PROJECT_ROOT / "data" / "data_j.csv"
    with open(codes_csv, "r") as f:
        csv_reader = csv.reader(f)
        next(csv_reader)
        codes = [row[0] for row in csv_reader]

    for code in codes:
        update_csv(code)


if __name__ == "__main__":
    main()
    # update_csv("6254")
