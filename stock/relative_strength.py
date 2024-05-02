"""relative_strength.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 11:21:00
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import datetime

import numpy as np
import polars as pl


def strength(target: np.ndarray):
    pct_change = np.diff(target) / target[:-1]
    return np.cumprod((1 + pct_change))[-1] - 1


def relative_strength(target: np.ndarray, reference: np.ndarray) -> float:
    """Calculate relative strength of target to reference.
    Args:
        target (np.ndarray): target stock price (1D-array)
        reference (np.ndarray): reference stock price (1D-array)
    """
    target_strength = strength(target)
    ref_strength = strength(reference)
    rs = (target_strength + 1) / (ref_strength + 1) * 100
    return rs


def relative_strength_52wk(
    target: np.ndarray, reference: np.ndarray, num_division: int = 52, division_factor: float = 1.02
):
    weights = np.array([division_factor**i for i in range(num_division)], dtype=float)
    weights /= np.linalg.norm(weights, ord=1)

    rs = 0.0
    for i in range(num_division):
        start = max(i * len(target) // num_division - 1, 0)
        end = min((i + 1) * len(target) // num_division + 1, len(target))
        # print(start, end)
        rs += weights[i] * relative_strength(target[start:end], reference[start:end])
    return rs


def relative_strength_v2(
    df: pl.DataFrame,
    ref_df: pl.DataFrame,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
):
    df = df.filter(pl.col("date").is_between(start_date, end_date)).with_columns(
        ((pl.col("high") - pl.col("low")) / pl.col("open")).alias("diff")
    )
    ref_df = ref_df.filter(pl.col("date").is_between(start_date, end_date)).with_columns(
        ((pl.col("high") - pl.col("low")) / pl.col("open")).alias("diff")
    )
    if len(df) != len(ref_df):
        return -1.0

    ## 株価（終値）の動きの強さを数値化
    close_arr = df["close"].to_numpy()
    pct_change = np.diff(close_arr) / close_arr[:-1]
    ref_close_arr = ref_df["close"].to_numpy()
    ref_pct_change = np.diff(ref_close_arr) / ref_close_arr[:-1]
    ## 日中の値動きの大きさで重み付け
    diff_std, ref_diff_std = df["diff"].std(), ref_df["diff"].std()
    diff, ref_diff = (
        df["diff"].to_numpy() / diff_std,
        ref_df["diff"].to_numpy() / ref_diff_std,
    )  # 正規化
    weight = (diff / ref_diff)[1:]  # 指数に比べての値動きの大きさ
    ## 出来高の多さで重み付け -> これを入れると、df == ref_dfの場合に1.0にならないので一旦コメントアウト
    # volume = df["volume"].to_numpy()
    # volume_diff = volume[1:] / volume[:-1]
    # weight *= volume_diff

    pct_change = pct_change * weight
    strength = np.cumprod((1 + pct_change))[-1] - 1
    ref_strength = np.cumprod((1 + ref_pct_change))[-1] - 1

    return (strength + 1) / (ref_strength + 1)
