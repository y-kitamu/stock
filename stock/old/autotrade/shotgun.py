"""algorighm.py

Author : Yusuke Kitamura
Create Date : 2023-02-19 17:42:24
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from datetime import datetime
from typing import List, Optional

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from .. import chart
from . import BaseAlgorighm, BaseParams, TradeResult


class ShotgunParams(BaseParams):
    short_term: int = 5  # 短期移動平均線の期間
    mid_term: int = 20  # 中期移動平均線の期間
    long_term: int = 60  # 長期移動平均線の期間
    max_hold_days: int = 9  # 株の最大保有日数


class Shotgun(BaseAlgorighm):
    def __init__(self, params: ShotgunParams):
        self.params: ShotgunParams = params

    def _search_buy_indices(self, df: pd.DataFrame) -> List[int]:
        close_prices = df[self.CLOSE_KEY].to_numpy()
        short_ma = chart.trend.moving_average(close_prices, window_size=self.params.short_term)
        mid_ma = chart.trend.moving_average(close_prices, window_size=self.params.mid_term)
        long_ma = chart.trend.moving_average(close_prices, window_size=self.params.long_term)

        max_idx = len(close_prices) - 1
        # 買いシグナルの探索
        buy_signals = []
        i = max(self.params.long_term + self.params.long_term, 1)
        while i < max_idx:
            # 移動平均線が下向きの場合は除外
            if (
                short_ma[i] < short_ma[i - 1]
                or mid_ma[i] < mid_ma[i - 1]
                or long_ma[i] < long_ma[i - 1]
            ):
                i += 1
                continue

            # 中期の移動平均線が一定期間以上上昇している場は除外
            # if np.all((mid_ma[i - 20 : i] - mid_ma[i - 21 : i - 1]) > 0):
            #     i += 1
            #     continue

            # 移動平均線が短期 > 中期 順になっているか
            if short_ma[i] <= mid_ma[i]:  # or mid_ma[i] <= long_ma[i]:
                i += 1
                continue

            buy_signals.append(i)
            while (
                i < max_idx
                and short_ma[i] > mid_ma[i]
                and short_ma[i] >= short_ma[i - 1]
                and mid_ma[i] >= mid_ma[i - 1]
                # and long_ma[i] >= long_ma[i - 1]
            ):
                i += 1
            # # 短期移動平均線が中期移動平均線で反発しているか
            # if short_ma[i - 2] >= short_ma[i - 1] and short_ma[i - 1] <= short_ma[i]:
            #     buy_signals.append(i)
            #     continue

            # # 短期移動線が中期移動線を上抜けしているか
            # if short_ma[i - 1] <= mid_ma[i - 1] and short_ma[i] >= mid_ma[i]:
            #     buy_signals.append(i)
            #     continue
            i += 1

        return buy_signals

    def _calc_sell_indices(self, df: pd.DataFrame, buy_indices: List[int]) -> List[int]:
        """ """
        close_prices = df[self.CLOSE_KEY].to_numpy()
        open_prices = df[self.OPEN_KEY].to_numpy()
        short_ma = chart.trend.moving_average(close_prices, window_size=self.params.short_term)
        mid_ma = chart.trend.moving_average(close_prices, window_size=self.params.mid_term)
        long_ma = chart.trend.moving_average(close_prices, window_size=self.params.long_term)

        sell_indices: List[int] = []
        for buy_idx in buy_indices:
            # 上昇の起点の算出
            start_idx = buy_idx
            while close_prices[start_idx] > close_prices[start_idx - 1]:
                start_idx -= 1
            max_sell_idx = min(start_idx + self.params.max_hold_days, len(close_prices) - 1)

            if max_sell_idx <= buy_idx:
                sell_indices.append(buy_idx)
                continue

            # 買った当日に下落した場合は売り
            if open_prices[buy_idx + 1] > close_prices[buy_idx + 1]:
                sell_indices.append(buy_idx + 1)
                continue

            # 買いポイントからの経過日数
            sell_idx = buy_idx + 1
            while sell_idx < max_sell_idx:
                # 売り条件を満たしている場合は売り
                # 移動平均線が下向き
                if short_ma[sell_idx] < 0 or mid_ma[sell_idx] < 0 or long_ma[sell_idx] < 0:
                    break
                # 株価が短期移動線を下抜け
                if close_prices[sell_idx] < short_ma[sell_idx]:
                    break
                sell_idx += 1
            sell_indices.append(sell_idx)
        return sell_indices

    def plot(
        self, df: pd.DataFrame, fig: Optional[go.Figure] = None, results: List[TradeResult] = []
    ) -> go.Figure:
        buy_pt_xs = [datetime.strptime(df["day"][res.buy_index + 1], "%Y/%m/%d") for res in results]
        buy_pt_ys = [res.buy for res in results]
        sell_pt_xs = [datetime.strptime(df["day"][res.sell_index], "%Y/%m/%d") for res in results]
        sell_pt_ys = [res.sell for res in results]

        close_prices = df[self.CLOSE_KEY].to_numpy()
        short_ma = chart.trend.moving_average(close_prices, window_size=self.params.short_term)
        mid_ma = chart.trend.moving_average(close_prices, window_size=self.params.mid_term)
        long_ma = chart.trend.moving_average(close_prices, window_size=self.params.long_term)
        short, mid, lng = self.params.short_term, self.params.mid_term, self.params.long_term

        fig = make_subplots(
            rows=2, cols=1, shared_xaxes=True, vertical_spacing=0.0, row_heights=[0.7, 0.3]
        )
        xdata = [
            datetime.strptime(dt, "%Y/%m/%d") for dt in df[self.DAY_KEY].to_numpy()
        ]  # np.arange(len(df))
        fig.add_trace(
            go.Candlestick(
                x=xdata,
                open=df[self.OPEN_KEY],
                high=df[self.HIGH_KEY],
                low=df[self.LOW_KEY],
                close=df[self.CLOSE_KEY],
                name="candle",
            ),
            row=1,
            col=1,
        )
        # 売り買いポイント
        fig.add_trace(
            go.Scatter(
                x=buy_pt_xs,
                y=buy_pt_ys,
                mode="markers",
                name="buy",
                marker=dict(size=10, color="blue"),
            ),
            row=1,
            col=1,
        )
        fig.add_trace(
            go.Scatter(
                x=sell_pt_xs,
                y=sell_pt_ys,
                mode="markers",
                name="sell",
                marker=dict(size=10, color="gray"),
            ),
            row=1,
            col=1,
        )
        # 移動平均線
        fig.add_trace(
            go.Scatter(x=xdata[short:], y=short_ma[short:], name="short_ma"), row=1, col=1
        )
        fig.add_trace(go.Scatter(x=xdata[mid:], y=mid_ma[mid:], name="mid_ma"), row=1, col=1)
        fig.add_trace(go.Scatter(x=xdata[lng:], y=long_ma[lng:], name="long_ma"), row=1, col=1)
        # 売買高
        fig.add_trace(go.Bar(x=xdata, y=df["volume"], name="volume"), row=2, col=1)
        # グラフの設定
        fig.update_layout(
            xaxis_rangeslider_visible=False,
            xaxis2_rangeslider_visible=True,
            margin=go.layout.Margin(l=5, r=5, t=5, b=5, autoexpand=True),
        )
        fig.update_layout(hovermode="x unified")
        fig.update_traces(xaxis="x2")
        fig.update_xaxes(rangebreaks=[dict(bounds=["sat", "mon"])])  # 土日を除外
        fig.show()
        return fig
