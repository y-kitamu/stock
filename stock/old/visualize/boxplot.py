"""boxplot.py

Author : Yusuke Kitamura
Create Date : 2023-01-27 21:44:18
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import matplotlib.pyplot as plt
import numpy as np

from . import create_figure


def boxplot(
    start: np.ndarray,
    high: np.ndarray,
    low: np.ndarray,
    end: np.ndarray,
    box_width=0.5,
    fig=None,
    ax=None,
):
    """
    Args:
        start (np.ndarray): start price
        high (np.ndarray): high price
        low (np.ndarray): low price
        end (np.ndarray): end price
        box_width (float, optional): box width. Defaults to 0.5.
        fig (Figure, optional): matplotlib.Figure object. Defaults to None.
        ax (Axes, optional): matplotlib.Axes object. Defaults to None.
    """
    if fig is None or ax is None:
        fig, ax = create_figure(start)

    ymax = high.max() * 1.05
    ymin = low.min() * 0.95
    ax.set_xlim([0 - box_width, len(start)])
    ax.set_ylim([ymin, ymax])

    acsending_indices = []
    acsending_box_xmins = []
    acsending_box_xmaxs = []
    acsending_xmins = []
    acsending_xmaxs = []
    decending_indices = []
    decending_boxes_xmins = []
    decending_boxes_xmaxs = []
    decending_xmins = []
    decending_xmaxs = []
    for idx, (s, h, l, e) in enumerate(zip(start, high, low, end)):
        if s < e:
            acsending_indices.append(idx)
            acsending_box_xmins.append(s)
            acsending_box_xmaxs.append(e)
            acsending_xmins.append(l)
            acsending_xmaxs.append(h)
        else:
            decending_indices.append(idx)
            decending_boxes_xmins.append(e)
            decending_boxes_xmaxs.append(s)
            decending_xmins.append(l)
            decending_xmaxs.append(h)

    points = 72.0 / fig.dpi
    left_pix, _ = ax.transData.transform((0.0, 1.0))
    right_pix, _ = ax.transData.transform((box_width, 1.0))
    box_linewidth = (right_pix - left_pix) * points
    linewidth = min(box_linewidth * 0.3, 1)

    ax.vlines(acsending_indices, acsending_xmins, acsending_xmaxs, color="red", linewidth=linewidth)
    ax.vlines(
        acsending_indices,
        acsending_box_xmins,
        acsending_box_xmaxs,
        color="red",
        linewidth=box_linewidth,
    )
    ax.vlines(
        decending_indices, decending_xmins, decending_xmaxs, color="blue", linewidth=linewidth
    )
    ax.vlines(
        decending_indices,
        decending_boxes_xmins,
        decending_boxes_xmaxs,
        color="blue",
        linewidth=box_linewidth,
    )
    ax.grid()

    return fig, ax
