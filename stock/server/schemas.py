"""schemas.py

Author : Yusuke Kitamura
Create Date : 2022-08-27 17:56:50
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import datetime
from typing import Optional

from pydantic import BaseModel


class StatsResponse(BaseModel):
    """Response model of Statistics API.
    Use with `response_model_exclude_unset=True`.
    """

    id: Optional[int] = None
    archive_date: Optional[datetime.datetime] = None
    company_code: Optional[str] = None

    # statistics
    FiftyTwoWeekChange: Optional[float] = None
    SandP52WeekChange: Optional[float] = None
    annualHoldingsTurnover: Optional[float] = None
    annualReportExpenseRatio: Optional[float] = None
    beta: Optional[float] = None
    beta3Year: Optional[float] = None
    bookValue: Optional[float] = None
    category: Optional[float] = None
    dateShortInterest: Optional[float] = None
    earningsQuarterlyGrowth: Optional[float] = None
    enterpriseToEbitda: Optional[float] = None
    enterpriseToRevenue: Optional[float] = None
    enterpriseValue: Optional[float] = None
    fiveYearAverageReturn: Optional[float] = None
    floatShares: Optional[float] = None
    forwardEps: Optional[float] = None
    forwardPE: Optional[float] = None
    fundFamily: Optional[float] = None
    fundInceptionDate: Optional[float] = None
    heldPercentInsiders: Optional[float] = None
    heldPercentInstitutions: Optional[float] = None
    impliedSharesOutstanding: Optional[float] = None
    lastCapGain: Optional[float] = None
    lastDividendDate: Optional[float] = None
    lastDividendValue: Optional[float] = None
    lastFiscalYearEnd: Optional[float] = None
    lastSplitDate: Optional[float] = None
    lastSplitFactor: Optional[float] = None
    legalType: Optional[float] = None
    morningStarOverallRating: Optional[float] = None
    morningStarRiskRating: Optional[float] = None
    mostRecentQuarter: Optional[float] = None
    netIncomeToCommon: Optional[float] = None
    nextFiscalYearEnd: Optional[float] = None
    pegRatio: Optional[float] = None
    priceHint: Optional[float] = None
    priceToBook: Optional[float] = None
    priceToSalesTrailing12Months: Optional[float] = None
    profitMargins: Optional[float] = None
    revenueQuarterlyGrowth: Optional[float] = None
    sharesOutstanding: Optional[float] = None
    sharesPercentSharesOut: Optional[float] = None
    sharesShort: Optional[float] = None
    sharesShortPreviousMonthDate: Optional[float] = None
    sharesShortPriorMonth: Optional[float] = None
    shortPercentOfFloat: Optional[float] = None
    shortRatio: Optional[float] = None
    threeYearAverageReturn: Optional[float] = None
    totalAssets: Optional[float] = None
    trailingEps: Optional[float] = None
    dividendYield: Optional[float] = None
    ytdReturn: Optional[float] = None
    currentPrice: Optional[float] = None
    currentRatio: Optional[float] = None
    debtToEquity: Optional[float] = None
    earningsGrowth: Optional[float] = None
    ebitda: Optional[float] = None
    ebitdaMargins: Optional[float] = None
    financialCurrency: Optional[float] = None
    freeCashflow: Optional[float] = None
    grossMargins: Optional[float] = None
    grossProfits: Optional[float] = None
    numberOfAnalystOpinions: Optional[float] = None
    operatingCashflow: Optional[float] = None
    operatingMargins: Optional[float] = None
    profitMargins: Optional[float] = None
    quickRatio: Optional[float] = None
    recommendationKey: Optional[float] = None
    recommendationMean: Optional[float] = None
    returnOnAssets: Optional[float] = None
    returnOnEquity: Optional[float] = None
    revenueGrowth: Optional[float] = None
    revenuePerShare: Optional[float] = None
    targetHighPrice: Optional[float] = None
    targetLowPrice: Optional[float] = None
    targetMeanPrice: Optional[float] = None
    targetMedianPrice: Optional[float] = None
    totalCash: Optional[float] = None
    totalCashPerShare: Optional[float] = None
    totalDebt: Optional[float] = None
    totalRevenue: Optional[float] = None
