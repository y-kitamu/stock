"""__init__.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 13:53:53
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from fake_useragent import UserAgent


def get_random_use_agent() -> str:
    return UserAgent().random


from . import yahoo_finance
