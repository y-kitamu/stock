"""oscillator.py
オシレーター系の指標の計算
Author : Yusuke Kitamura
Create Date : 2023-02-02 21:57:28
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""


def rsi(prices, period=14):
    """RSIの計算
    Args:
        prices (list): 株価のリスト
        period (int, optional): パラメーター. Defaults to 14.
    Returns:
        list: RSIのリスト
    """
    rsi = []
    for i in range(len(prices)):
        if i < period:
            rsi.append(0)
        else:
            up = 0
            down = 0
            for j in range(period):
                if prices[i - j] > prices[i - j - 1]:
                    up += prices[i - j] - prices[i - j - 1]
                else:
                    down += prices[i - j - 1] - prices[i - j]
            if up == 0:
                rsi.append(0)
            else:
                rsi.append(up / (up + down) * 100)
    return rsi


def stocastic(prices, highs, lows, period=14):
    """ステオキャスティックの計算
    Args:
        prices (list): 株価のリスト
        highs (list): 高値のリスト
        lows (list): 安値のリスト
        period (int, optional): パラメーター. Defaults to 14.
    Returns:
        list: ステオキャスティックのリスト
    """
    stocastic = []
    for i in range(len(prices)):
        if i < period:
            stocastic.append(0)
        else:
            high = 0
            low = 1000000
            for j in range(period):
                if highs[i - j] > high:
                    high = highs[i - j]
                if lows[i - j] < low:
                    low = lows[i - j]
            stocastic.append((prices[i] - low) / (high - low) * 100)
    return stocastic


def momentum(prices, period=14):
    """モメンタムの計算
    Args:
        prices (list): 株価のリスト
        period (int, optional): パラメーター. Defaults to 14.
    Returns:
        list: モメンタムのリスト
    """
    momentum = []
    for i in range(len(prices)):
        if i < period:
            momentum.append(0)
        else:
            momentum.append((prices[i] - prices[i - period]) / prices[i - period] * 100)
    return momentum


def rci():
    """RCIの計算"""
    pass


def moving_average_deviation_rate():
    pass


def psychological_line():
    pass
