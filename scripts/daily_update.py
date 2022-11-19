"""daily_update.py
Daily update script for the stock data
Author : Yusuke Kitamura
Create Date : 2022-08-28 12:02:58
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import stock


def main():
    """main"""

    stock.adapter.update_database()
