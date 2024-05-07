"""visualize.py
Create Date : 2024-05-05 10:33:50
"""

import datetime

import matplotlib.pyplot as plt
import polars as pl


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
