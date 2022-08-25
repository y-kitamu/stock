"""models.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 14:34:49
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String

from .database import Base


class Company(Base):
    """Company statistics"""

    __tablename__ = "base_companies"
    id = Column("id", Integer, primary_key=True)
    name = Column("name", String, nullable=False)
    code = Column("code", Integer, nullable=False)


class BaseStockTimeSeries(Base):
    """時系列株価データのmodel"""

    __tablename__ = "base_stock_timeseries"

    id = Column("id", Integer, primary_key=True)
    # データを取得した日時
    date = Column("date", DateTime, nullable=False)
    # 株価
    value = Column("date", Float, nullable=False)


class BaseStatistics(Base):
    """Yahoo Financeに記載されている統計を格納するmodel"""

    __tablename__ = "base_statistics"

    id = Column("id", Integer, primary_key=True)

    market_cap = Column("market_cap", Float)
    enterprise_value = Column("enterprise_value", Float)
    trailing_pe = Column("trailing_pe", Float)
    forward_pe = Column("forward_pe", Float)
    peg = Column("peg", Float)
    price_per_sales = Column("price_per_sales", Float)
    price_per_book = Column("price_per_book", Float)
    enterprise_value_per_revenue = Column("enterprise_value_per_revenue", Float)
    enterprise_value_per_ebitda = Column("enterprise_value_per_ebitda", Float)
    shares_outstanding = Column("shares_outstanding", Float)
    shares_float = Column("shares_float", Float)
    shares_short = Column("shares_short", Float)
    forward_dividend = Column("forward_dividend", Float)
    trailing_dividend = Column("trailing_dividend", Float)
    dividend_date = Column("dividend_date", DateTime)
    fiscal_year_ends = Column("fiscal_year", DateTime)
    most_recent_quarter = Column("most_recent_quarter", DateTime)
    profit_margin = Column("profit_margin", Float)
    operating_margin = Column("operating_margin", Float)a
    return_on_assets = Column("return_on_assets", Float)
    return_on_equity = Column("return_on_equity", Float)
    revenue = Column("revenue", Float)
    revenue_per_share = Column("revenue_per_share", Float)
    qtrly_revenue_growth = Column("qtrly_revenue_growth", Float)
    gross_profit = Column("gross_profit", Float)
    ebitda = Column("ebitda", Float)
    net_income = Column("net_income", Float)
    diluted_eps = Column("diluted_eps", Float)
    qtrly_earnings_growth = Column("qtrly_earnings_growth", Float)
    total_cash = Column("total_cash", Float)
    total_cache_per_share = Column("total_cache_per_share", Float)
    total_debt = Column("total_debt", Float)
    total_debt_per_equity = Column("total_debt_per_equity", Float)
    current_ratio = Column("current_ratio", Float)
    book_value_per_share = Column("book_value_per_share", Float)
    operating_cash_flow = Column("operating_cash_flow", Float)
    levered_free_cash_flow = Column("levered_free_cash_flow", Float)


def create_timeseries_table_for_company(company_name: str):
    """ """

    class StockTimeSeries(Base):
        __tablename__ = f"{company_name}_stock_timeseries"

    class Statistics(Base):
        __tablename__ = f"{company_name}_statistics"
