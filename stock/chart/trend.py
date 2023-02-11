"""trend.py

Author : Yusuke Kitamura
Create Date : 2023-02-07 22:12:24
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from typing import Optional, Tuple

import numpy as np


def moving_average(
    data: np.ndarray, window_size: int = 5, weights: Optional[np.ndarray] = None
) -> np.ndarray:
    """移動平均線

    Args:
        data (np.ndarray): time series data
        window_size (int, optional): Range of averaging. Defaults to 5.

    Returns:
        np.ndarray: moving average
    """
    if weights is None:
        weights = np.ones(window_size)
    weights = weights / weights.sum()
    return np.convolve(data, weights, mode="full")[: len(data)]


def ema(data: np.ndarray, window_size: int = 5, alpha: float = 2.0) -> np.ndarray:
    """指数平滑化移動平均"""
    weights = np.array([alpha**i for i in range(window_size)][::-1])
    return moving_average(data, window_size, weights=weights)


def bollinger_bands():
    pass


def ichimoku_cloud():
    pass


def dmi():
    pass


def parabolic():
    pass


def envelope():
    pass


def macd(prices, short=12, long=26, signal=9, alpha=2) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    """MACDの計算
    Args:
        prices (list): 株価のリスト
        short (int, optional): 短期のパラメーター. Defaults to 12.
        long (int, optional): 長期のパラメーター. Defaults to 26.
        signal (int, optional): シグナルのパラメーター. Defaults to 9.
    Returns:
        list: MACDのリスト
        list: シグナルのリスト
        list: ヒストグラムのリスト
    """
    macd = []
    signal_line = []
    histogram = []

    short_ema = ema(prices, short, alpha)
    long_ema = ema(prices, long, alpha)
    macd = short_ema - long_ema
    signal_line = moving_average(macd, signal)
    histogram = macd - signal_line
    macd[:long] = 0
    signal_line[: long + signal] = 0
    histogram[: long + signal] = 0

    return macd, signal_line, histogram
