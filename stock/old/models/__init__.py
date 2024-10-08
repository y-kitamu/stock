"""__init__.py
Database models for the stock app.
Author : Yusuke Kitamura
Create Date : 2022-05-06 14:34:06
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from .database import DATABASE
from .models import Company, Statistics, StockTimeSeries

DATABASE.create_all()

from .crud import create_company, get_all_companies, get_company_stats
