"""crud.py

Author : Yusuke Kitamura
Create Date : 2022-08-27 20:32:51
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from typing import List, Optional

from . import DATABASE, Company, Statistics, StockTimeSeries


def get_all_companies() -> List[Company]:
    """Get all companies in the database
    Returns:
        List[Company]: List of companies
    """
    with DATABASE.context() as db:
        return Company.get_all(db)


def add_company(code: str):
    """Add company to the database
    Args:
        code (str): Code of the company
    """
    with DATABASE.context() as db:
        return Company.create(db, code=code, with_commit=True)


def get_company_stats(code: str) -> Optional[Statistics]:
    """Get company's latest statistics
    Args:
        code (str): Code of the company
    Returns:
        Optionial[Statistics]: Statistics of the company. If not found, return None
    """

    with DATABASE.context() as db:
        stats = Statistics.get_all(db, code=code)

    if len(stats) == 0:
        return None

    latest = stats[0]
    for i in range(1, len(stats)):
        if stats[i].archive_date > latest.archive_date:
            latest = stats[i]
    return latest
