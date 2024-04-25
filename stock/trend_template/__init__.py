"""__init__.py
"""

from datetime import datetime, timedelta

from ..constants import PROJECT_ROOT
from .fundamental import check_fundamental_trend_templates
from .technical import (TechnicalTrendTemplate, TechnicalTrendTemplateParams,
                        check_technical_trend_templates)


def get_watch_list(date) -> list[str]:
    """指定した日付(`date`)時点のウォッチリストを取得する"""
    csv_dir = PROJECT_ROOT / "data" / "daily"
    watch_list = []
    for csv_path in sorted(csv_dir.glob("*.csv")):
        code = csv_path.stem
        if check_technical_trend_templates(
            code, cur_day=date
        ) and check_fundamental_trend_templates(code, current_date=date):
            watch_list.append(code)
    return watch_list


def calc_watch_list_duration_of(
    code: str, start_date: datetime, end_date: datetime = datetime.today()
) -> list[list[datetime]]:
    """`code`の銘柄がウォッチリストに入っていた期間を計算する"""
    duration = []
    date = start_date
    start = None
    while date <= end_date:
        if check_technical_trend_templates(
            code, cur_day=date
        ) and check_fundamental_trend_templates(code, current_date=date):
            if start is None:
                start = date
        else:
            if start is not None:
                duration.append([start, date - timedelta(1)])
            start = None
        date += timedelta(days=1)

    if start is not None:
        duration.append([start, end_date])

    return duration
