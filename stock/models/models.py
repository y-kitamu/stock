"""models.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 14:34:49
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from pydantic import BaseModel


class CompanyStats(BaseModel):
    ticker: str
    revenue: float
    gross_profit: float
    net_income: float
    earnings_growth: float
    total_cash: float
    total_degt: float
    shares_outstandings: float
