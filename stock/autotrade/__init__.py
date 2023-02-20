"""__init__.py

Author : Yusuke Kitamura
Create Date : 2023-02-19 17:42:11
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from typing import List, Optional

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from pydantic import BaseModel

from .. import logger


class BaseParams(BaseModel):
    pass


class TradeResult(BaseModel):
    buy: float  # 買値
    sell: float  # 売値
    profit: float  # 利益
    buy_index: float  # 買値のインデックス
    sell_index: float  # 売値のインデックス


class BaseAlgorighm:
    OPEN_KEY = "open"
    CLOSE_KEY = "close"
    HIGH_KEY = "high"
    LOW_KEY = "low"
    DAY_KEY = "day"

    def run(self, df: pd.DataFrame, with_plot=False) -> List[TradeResult]:
        """入力のデータフレームに対してアルゴリズムを実行する。"""
        df = df.dropna(how="all", axis=1)
        if df.isnull().any().any():  # 欠損値がある場合はアルゴリズムを実行しない
            logger.warning("There are missing values in the input data.")
            return []

        buy_indices = self._search_buy_indices(df[self.CLOSE_KEY].to_numpy())
        sell_indices = self._calc_sell_indices(df[self.CLOSE_KEY].to_numpy(), buy_indices)
        results: List[TradeResult] = []
        for bidx, sidx in zip(buy_indices, sell_indices):
            bprice = df[self.OPEN_KEY][bidx + 1]
            sprice = df[self.CLOSE_KEY][sidx]
            profit = sprice - bprice
            results.append(
                TradeResult(buy=bprice, sell=sprice, profit=profit, buy_index=bidx, sell_index=sidx)
            )
        if with_plot:
            self.plot(df, results=results)
        return results

    def _search_buy_indices(self, close_prices: np.ndarray) -> List[int]:
        """終値の時系列配列（`close_prices`）で買いシグナルが出ているインデックスを探す"""
        raise NotImplementedError

    def _calc_sell_indices(self, close_prices: np.ndarray, buy_indices: List[int]) -> List[int]:
        """買い(`buy_indices`)に対する売りのタイミングを計算する"""
        raise NotImplementedError

    def plot(
        self, df: pd.DataFrame, fig: Optional[go.Figure] = None, results: List[TradeResult] = []
    ) -> go.Figure:
        """アルゴリズムの結果をプロットする"""
        raise NotImplementedError


from . import shotgun
