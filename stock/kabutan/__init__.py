"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-03-23 19:02:22
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import csv
from pathlib import Path

from . import catalyst, data, financial


def read_financial_csv(csv_path: Path) -> list[financial.FinancialStatement]:
    """Read financial data from csv file."""
    code = csv_path.stem
    with open(csv_path, "r") as f:
        reader = csv.reader(f)
        next(reader)
        return [financial.FinancialStatement.from_csv(code, row) for row in reader]
