"""extremal.py
株価の極値を求めるモジュール
Author : Yusuke Kitamura
"""

import datetime

import polars as pl


def calc_extremal(
    df: pl.DataFrame,
    window_size: int = 7,
    is_exact: bool = True,
    use_future: bool = True,
    start_date: datetime.date | None = None,
    end_date: datetime.date | None = None,
) -> pl.DataFrame:
    """
    極値を求める関数
    Args:
        df (pl.DataFrame):
        window_size (int):https://shikiho.toyokeizai.net/stocks/8233
        is_exact (bool): Trueの場合、極大・極小が交互に並ぶようにする
    Returns:
        pl.DataFrame: 入力の`df`から極値の列を抜き出したDataFrame
    """
    if start_date is not None:
        df = df.filter(pl.col("date") >= start_date)
    if end_date is not None:
        df = df.filter(pl.col("date") <= end_date)
    # チャート上の極値を計算
    df = df.with_columns(
        high_extremal_cand=(
            (pl.col("high").diff() > 0) & (pl.col("high").diff().shift(-1) <= 0)
        ).fill_null(True),
        low_extremal_cand=((pl.col("low").diff() < 0) & (pl.col("low").diff().shift(-1) >= 0)).fill_null(
            True
        ),
        rolling_high=(
            pl.col("high")
            .rolling_max(window_size=window_size, center=use_future)
            .fill_null(strategy="backward")
            .fill_null(strategy="forward")
        ),
        rolling_low=(
            pl.col("low")
            .rolling_min(window_size=window_size, center=use_future)
            .fill_null(strategy="backward")
            .fill_null(strategy="forward")
        ),
    )
    extremal_df = df.filter(
        (pl.col("high_extremal_cand") & (pl.col("rolling_high") == pl.col("high")))
        | (pl.col("low_extremal_cand") & (pl.col("rolling_low") == pl.col("low")))
    ).with_columns(
        high_extremal=(pl.col("high_extremal_cand") & (pl.col("rolling_high") == pl.col("high"))),
        low_extremal=(pl.col("low_extremal_cand") & (pl.col("rolling_low") == pl.col("low"))),
    )

    if len(extremal_df) > 0 and is_exact:
        rows = [extremal_df[0]]
        for i in range(1, len(extremal_df)):
            row = extremal_df[i]
            if (rows[-1]["high_extremal"][0] and rows[-1]["low_extremal"][0]) or (
                row["high_extremal"][0] and row["low_extremal"][0]
            ):
                rows.append(row)  # 一日のうちに極大と極小が現れる場合は追加
            elif (rows[-1]["high_extremal"][0] and row["low_extremal"][0]) or (
                rows[-1]["low_extremal"][0] and row["high_extremal"][0]
            ):
                rows.append(row)
            else:
                # 極大(極小)が連続して並んでいる場合は、高い(低い)方を残す
                if rows[-1]["high_extremal"][0] and rows[-1]["high"][0] < row["high"][0]:
                    rows[-1] = row
                elif rows[-1]["low_extremal"][0] and rows[-1]["low"][0] > row["low"][0]:
                    rows[-1] = row
        extremal_df = pl.concat(rows)
    return extremal_df
