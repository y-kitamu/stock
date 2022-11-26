"""constants.py

Author : Yusuke Kitamura
Create Date : 2022-08-28 11:50:13
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from pathlib import Path

PROJECT_ROOT = Path(__file__).absolute().parent.parent
DATA_DIR = PROJECT_ROOT / "data"

# Interval seconds for each requests of scraping
REQUEST_INTERVAL_SEC = 5
# List of stock code to scrape
COMPANY_LIST_JSON = DATA_DIR / "company_list.json"
# sqlite database file path
DATABASE_SQLITE_FILE = DATA_DIR / "stock.db"
DATABASE_URL = f"sqlite:///{DATABASE_SQLITE_FILE}"

# google drive api credentials
CREDENTIAL_DIR = PROJECT_ROOT / "cert"
CREDENTIAL_FILE_PATH = CREDENTIAL_DIR / "stockdata-332410-704571e36294.json"
# GOOGLE_DRIVE_ROOT_PATH = Path("stock/data")
