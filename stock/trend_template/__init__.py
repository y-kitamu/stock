"""__init__.py
"""

from datetime import datetime, timedelta

from .fundamental import check_fundamental_trend_templates
from .technical import check_technical_trend_templates


def calc_watch_list_duration_of(
    code: str, start_date: datetime, end_date: datetime = datetime.today()
):
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
