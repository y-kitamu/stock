"""visualize.py
Create Date : 2024-05-05 10:33:50
"""

import datetime

import matplotlib.pyplot as plt
import polars as pl
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from .kabutan.io import read_data_csv


def plot_with_rs(
    df: pl.DataFrame,
    start_date: datetime.date,
    end_date: datetime.date = datetime.date.today(),
    rs_col: str = "rs",
):
    fig = plt.figure()
    df = df.filter((pl.col("date") >= start_date) & (pl.col("date") <= end_date))
    ax1 = fig.add_subplot(111)
    ax1.plot(df["date"], df["close"], "red", label="close")

    ax2 = ax1.twinx()
    ax2.plot(df["date"], df[rs_col], "blue", label=rs_col)
    ax2.grid("both")
    ax1.tick_params(axis="x", labelrotation=90)

    plt.legend()


def plot_chart_from_code(
    code: str,
    start_date: datetime.date | None = None,
    end_date: datetime.date = datetime.date.today(),
    weekly: bool = False,
    before_days: int = 1,
):
    df = read_data_csv(code, start_date=start_date, end_date=end_date, weekly=weekly)
    if weekly and before_days > 0:
        before_days = before_days // 7
    return plot_chart(df, before_days)


def plot_chart(df: pl.DataFrame, before_days: int = -1, fig: go.Figure | None = None) -> go.Figure:
    """plotlyでchartを作成する"""
    df = df.sort("date")
    if fig is None:
        fig = make_subplots(
            rows=2, cols=1, shared_xaxes=True, vertical_spacing=0.0, row_heights=[0.7, 0.3]
        )
    fig.add_trace(
        go.Candlestick(
            x=df["date"],
            open=df["open"],
            high=df["high"],
            low=df["low"],
            close=df["close"],
            name="candle",
        ),
        row=1,
        col=1,
    )

    if before_days > 0:  # 売り買いポイント
        fig.add_trace(
            go.Scatter(
                x=df[before_days]["date"],
                y=df[before_days]["open"],
                mode="markers",
                name="buy",
                marker=dict(size=10, color="blue"),
            ),
            row=1,
            col=1,
        )
    # 売買高
    fig.add_trace(go.Bar(x=df["date"], y=df["volume"], name="volume"), row=2, col=1)
    # グラフの設定
    fig.update_layout(
        xaxis_rangeslider_visible=False,
        margin=go.layout.Margin(l=5, r=5, t=5, b=5, autoexpand=True),
    )
    fig.update_layout(hovermode="x unified")
    fig.update_xaxes(rangebreaks=[dict(bounds=["sat", "mon"])])  # 土日を除外
    return fig
