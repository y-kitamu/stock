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


def macd(prices, short=12, long=26, signal=9):
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
    for i in range(len(prices)):
        if i < long:
            macd.append(0)
            signal_line.append(0)
            histogram.append(0)
        else:
            short_ema = 0
            long_ema = 0
            for j in range(short):
                short_ema += prices[i - j]
            short_ema /= short
            for j in range(long):
                long_ema += prices[i - j]
            long_ema /= long
            macd.append(short_ema - long_ema)
            if i < long + signal:
                signal_line.append(0)
                histogram.append(0)
            else:
                signal_ema = 0
                for j in range(signal):
                    signal_ema += macd[i - j]
                signal_ema /= signal
                signal_line.append(signal_ema)
                histogram.append(macd[i] - signal_ema)
    return macd, signal_line, histogram


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
