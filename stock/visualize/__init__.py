"""__init__.py

Author : Yusuke Kitamura
Create Date : 2023-01-27 21:44:27
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import matplotlib.pyplot as plt

_DPI = 72
_DEFAULT_FIGURE_HEIGHT = 6.0
_DEFAULT_FIGURE_WIDTH = 6.0


def create_figure(arr):
    """ """
    width = max(len(arr) * 5 / _DPI, _DEFAULT_FIGURE_WIDTH)
    fig, ax = plt.subplots(figsize=(width, _DEFAULT_FIGURE_HEIGHT), dpi=_DPI)

    return fig, ax


from .boxplot import boxplot
from .moving_average import moving_average
