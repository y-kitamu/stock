from datetime import date

import polars as pl
from pydantic import BaseModel


class BaseCondition(BaseModel):
    """ """

    def set_start(self, src_df: pl.DataFrame, start_date: date) -> float:
        raise NotImplementedError

    def run_simulation(self) -> float:
        """`index`の日付のsimulationを実行
        Returns:
            float: 売値 (売らない場合は-1)
        """
        raise NotImplementedError

    def get_selling_price(self, df: pl.DataFrame, index: int) -> float:
        """`index`の日付での売値を取得
        Returns:
            float: 売値
        """
        raise NotImplementedError
