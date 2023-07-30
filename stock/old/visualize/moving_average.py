"""moving_average.py

Author : Yusuke Kitamura
Create Date : 2023-01-28 11:49:24
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import numpy as np

from . import create_figure


def moving_average(data, window_size, *args, fig=None, ax=None):
    """ """
    assert window_size % 2 == 1, f"window size must be odd, but got {window_size}"
    if fig is None or ax is None:
        fig, ax = create_figure(data)

    avg = np.convolve(data, np.ones(window_size) / window_size, mode="full")
    ax.plot(avg[: len(data)], label=f"moving average (size = {window_size})")

    ax.legend()
    ax.grid()

    return fig, ax
