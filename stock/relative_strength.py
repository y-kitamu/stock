"""relative_strength.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 11:21:00
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import numpy as np


def strength(target: np.ndarray):
    pct_change = np.diff(target) / target[:-1]
    return np.cumprod((1 + pct_change))[-1] - 1


def relative_strength(target: np.ndarray, reference: np.ndarray) -> float:
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
