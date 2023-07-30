"""models.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 14:34:49
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import datetime
import inspect
from typing import List, Optional, Type, TypeVar

from sqlalchemy import (Column, DateTime, Float, ForeignKey, Index, Integer,
                        String, select)
from sqlalchemy.orm import Session, relationship
from sqlalchemy.sql.schema import UniqueConstraint

from .. import logger
from .database import Base

T = TypeVar("T", bound="CrudMixin")


def _log_call_stack() -> None:
    caller = inspect.stack()[2]
    logger.exception(f"Called from {caller.filename}, line {caller.lineno}, in {caller.function}")


class CrudMixin:
    @classmethod
    def create(cls: Type[T], db: Session, with_commit: bool = True, **kwargs) -> bool:
        """Create a new record in the database.
        Args:
            db (Session): Database session.
            with_commit (bool): If True, commit the transaction.
            **kwargs: Keyword arguments for the new record.
        Returns:
            bool: True if the record is created successfully.
        """
        try:
            db.add(cls(**kwargs))
            if with_commit:
                db.commit()
        except Exception as e:
            _log_call_stack()
            return False
        return True

    @classmethod
    def get(cls: Type[T], db: Session, with_for_update=False, **kwargs) -> Optional[T]:
        """Get a record from the database.
        Args:
            db (Session): Database session.
            with_for_update (bool): If True, add FOR UPDATE clause to the query.
            **kwargs: Keyword arguments for the query.
        Returns:
            Optional[T]: The record if found.
        """
        try:
            stmt = select(cls).filter_by(**kwargs)
            db.execute(stmt)
            if with_for_update:
                stmt = stmt.with_for_update()
            return db.execute(stmt).one()[0]
        except:
            _log_call_stack()
        return None

    @classmethod
    def get_all(cls: Type[T], db: Session, with_for_update=False, **kwargs) -> List[T]:
        """Get all records matched with a condition from the database.
        Args:
            db (Session): Database session.
            with_for_update (bool): If True, add FOR UPDATE clause to the query.
            **kwargs: Keyword arguments for the query.
        Returns:
            List[T]: The records matched with a condition.
        """
        try:
            stmt = select(cls).filter_by(**kwargs)
            db.execute(stmt)
            if with_for_update:
                stmt = stmt.with_for_update()
            return [row[0] for row in db.execute(stmt)]
        except:
            _log_call_stack()
        return []

    @classmethod
    def exists(cls: Type[T], db: Session, **kwargs) -> bool:
        """Check if a record exists in the database.
        Args:
            db (Session): Database session.
            **kwargs: Keyword arguments for the query.
        Returns:
            bool: True if the record exists.
        """
        raise NotImplementedError()


class Company(Base, CrudMixin):
    """Company statistics"""

    __tablename__ = "companies"
    code = Column("code", String, nullable=False, primary_key=True)

    stocktimeseries = relationship("StockTimeSeries", back_populates="company")
    statistics = relationship("Statistics", back_populates="company")

    @classmethod
    def exists(cls: Type[T], db: Session, code: str, **kwargs) -> bool:
        return cls.get(db, code=code) is not None


class StockTimeSeries(Base, CrudMixin):
    """Stock time series"""

    __tablename__ = "stock_time_series"
    __table_args__ = (UniqueConstraint("company_code", "timestamp", "interval"),)

    id = Column("id", Integer, primary_key=True)
    company_code = Column(String, ForeignKey("companies.code"), nullable=False)

    timestamp = Column("timestamp", Integer, nullable=False)
    interval = Column("interval", Float, nullable=False)
    open = Column("open", Float, nullable=True)
    close = Column("close", Float, nullable=True)
    high = Column("high", Float, nullable=True)
    low = Column("low", Float, nullable=True)
    volume = Column("volume", Integer, nullable=False)

    company = relationship("Company", back_populates="stocktimeseries")

    @classmethod
    def exists(
        cls: Type[T], db: Session, company_code: str, timestamp: int, interval: float, **kwargs
    ) -> bool:
        return (
            cls.get(db, company_code=company_code, timestamp=timestamp, interval=interval)
            is not None
        )


class Statistics(Base, CrudMixin):
    """Statistics"""

    __tablename__ = "statistics"
    __table_args__ = (UniqueConstraint("company_code", "archive_date"),)

    id = Column("id", Integer, primary_key=True)
    archive_date = Column("archive_date", DateTime, nullable=False)
    company_code = Column(String, ForeignKey("companies.code"), nullable=False)

    company = relationship("Company", back_populates="statistics")

    # statistics
    FiftyTwoWeekChange = Column("52WeekChange", Float, nullable=True)
    SandP52WeekChange = Column("SandP52WeekChange", Float, nullable=True)
    annualHoldingsTurnover = Column("annualHoldingsTurnover", Float, nullable=True)
    annualReportExpenseRatio = Column("annualReportExpenseRatio", Float, nullable=True)
    beta = Column("beta", Float, nullable=True)
    beta3Year = Column("beta3Year", Float, nullable=True)
    bookValue = Column("bookValue", Float, nullable=True)
    category = Column("category", Float, nullable=True)
    dateShortInterest = Column("dateShortInterest", Float, nullable=True)
    earningsQuarterlyGrowth = Column("earningsQuarterlyGrowth", Float, nullable=True)
    enterpriseToEbitda = Column("enterpriseToEbitda", Float, nullable=True)
    enterpriseToRevenue = Column("enterpriseToRevenue", Float, nullable=True)
    enterpriseValue = Column("enterpriseValue", Float, nullable=True)
    fiveYearAverageReturn = Column("fiveYearAverageReturn", Float, nullable=True)
    floatShares = Column("floatShares", Float, nullable=True)
    forwardEps = Column("forwardEps", Float, nullable=True)
    forwardPE = Column("forwardPE", Float, nullable=True)
    fundFamily = Column("fundFamily", String, nullable=True)
    fundInceptionDate = Column("fundInceptionDate", Float, nullable=True)
    heldPercentInsiders = Column("heldPercentInsiders", Float, nullable=True)
    heldPercentInstitutions = Column("heldPercentInstitutions", Float, nullable=True)
    impliedSharesOutstanding = Column("impliedSharesOutstanding", Float, nullable=True)
    lastCapGain = Column("lastCapGain", Float, nullable=True)
    lastDividendDate = Column("lastDividendDate", Float, nullable=True)
    lastDividendValue = Column("lastDividendValue", Float, nullable=True)
    lastFiscalYearEnd = Column("lastFiscalYearEnd", Float, nullable=True)
    lastSplitDate = Column("lastSplitDate", Float, nullable=True)
    lastSplitFactor = Column("lastSplitFactor", Float, nullable=True)
    legalType = Column("legalType", String, nullable=True)
    morningStarOverallRating = Column("morningStarOverallRating", Float, nullable=True)
    morningStarRiskRating = Column("morningStarRiskRating", Float, nullable=True)
    mostRecentQuarter = Column("mostRecentQuarter", Float, nullable=True)
    netIncomeToCommon = Column("netIncomeToCommon", Float, nullable=True)
    nextFiscalYearEnd = Column("nextFiscalYearEnd", Float, nullable=True)
    pegRatio = Column("pegRatio", Float, nullable=True)
    priceHint = Column("priceHint", String, nullable=True)
    priceToBook = Column("priceToBook", Float, nullable=True)
    priceToSalesTrailing12Months = Column("priceToSalesTrailing12Months", Float, nullable=True)
    profitMargins = Column("profitMargins", Float, nullable=True)
    revenueQuarterlyGrowth = Column("revenueQuarterlyGrowth", Float, nullable=True)
    sharesOutstanding = Column("sharesOutstanding", Float, nullable=True)
    sharesPercentSharesOut = Column("sharesPercentSharesOut", Float, nullable=True)
    sharesShort = Column("sharesShort", Float, nullable=True)
    sharesShortPreviousMonthDate = Column("sharesShortPreviousMonthDate", Float, nullable=True)
    sharesShortPriorMonth = Column("sharesShortPriorMonth", Float, nullable=True)
    shortPercentOfFloat = Column("shortPercentOfFloat", Float, nullable=True)
    shortRatio = Column("shortRatio", Float, nullable=True)
    threeYearAverageReturn = Column("threeYearAverageReturn", Float, nullable=True)
    totalAssets = Column("totalAssets", Float, nullable=True)
    trailingEps = Column("trailingEps", Float, nullable=True)
    dividendYield = Column("yield", Float, nullable=True)
    ytdReturn = Column("ytdReturn", Float, nullable=True)
    currentPrice = Column("currentPrice", Float, nullable=True)
    currentRatio = Column("currentRatio", Float, nullable=True)
    debtToEquity = Column("debtToEquity", Float, nullable=True)
    earningsGrowth = Column("earningsGrowth", Float, nullable=True)
    ebitda = Column("ebitda", Float, nullable=True)
    ebitdaMargins = Column("ebitdaMargins", Float, nullable=True)
    financialCurrency = Column("financialCurrency", String, nullable=True)
    freeCashflow = Column("freeCashflow", Float, nullable=True)
    grossMargins = Column("grossMargins", Float, nullable=True)
    grossProfits = Column("grossProfits", Float, nullable=True)
    numberOfAnalystOpinions = Column("numberOfAnalystOpinions", Float, nullable=True)
    operatingCashflow = Column("operatingCashflow", Float, nullable=True)
    operatingMargins = Column("operatingMargins", Float, nullable=True)
    profitMargins = Column("profitMargins", Float, nullable=True)
    quickRatio = Column("quickRatio", Float, nullable=True)
    recommendationKey = Column("recommendationKey", String, nullable=True)
    recommendationMean = Column("recommendationMean", Float, nullable=True)
    returnOnAssets = Column("returnOnAssets", Float, nullable=True)
    returnOnEquity = Column("returnOnEquity", Float, nullable=True)
    revenueGrowth = Column("revenueGrowth", Float, nullable=True)
    revenuePerShare = Column("revenuePerShare", Float, nullable=True)
    targetHighPrice = Column("targetHighPrice", Float, nullable=True)
    targetLowPrice = Column("targetLowPrice", Float, nullable=True)
    targetMeanPrice = Column("targetMeanPrice", Float, nullable=True)
    targetMedianPrice = Column("targetMedianPrice", Float, nullable=True)
    totalCash = Column("totalCash", Float, nullable=True)
    totalCashPerShare = Column("totalCashPerShare", Float, nullable=True)
    totalDebt = Column("totalDebt", Float, nullable=True)
    totalRevenue = Column("totalRevenue", Float, nullable=True)

    @classmethod
    def exists(
        cls: Type[T], db: Session, company_code: str, archive_date: datetime.date, **kwargs
    ) -> bool:
        return cls.get(db, company_code=company_code, archive_date=archive_date) is not None


# composite index for faster lookup
Index(
    "ix_stock_time_series_company_code_timestamp_interval",
    StockTimeSeries.company_code,
    StockTimeSeries.timestamp,
    StockTimeSeries.interval,
)

Index(
    "ix_statistics_company_code_archive_date",
    Statistics.company_code,
    Statistics.archive_date,
)
