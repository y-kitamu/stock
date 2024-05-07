"""__init__.py
"""

from datetime import date, timedelta

from ..constants import PROJECT_ROOT
from .fundamental import check_fundamental_trend_templates
from .technical import (TechnicalTrendTemplate, TechnicalTrendTemplateParams,
                        check_technical_trend_templates)
from .technical_v2 import calc_rs as calc_rs_v2
from .technical_v2 import get_watch_list as get_watch_list_v2


def get_watch_list(cur_day: date) -> list[str]:
    """指定した日付(`date`)時点のウォッチリストを取得する"""
    csv_dir = PROJECT_ROOT / "data" / "daily"
    watch_list = []
    for csv_path in sorted(csv_dir.glob("*.csv")):
        code = csv_path.stem
        if check_technical_trend_templates(
            code, cur_day=cur_day
        ) and check_fundamental_trend_templates(code, current_date=cur_day):
            watch_list.append(code)
    return watch_list


def calc_watch_list_duration_of(
    code: str,
    start_date: date,
    end_date: date = date.today(),
    use_technical: bool = True,
    use_fundamental: bool = True,
) -> list[list[date]]:
    """`code`の銘柄がウォッチリストに入っていた期間を計算する"""
    assert use_technical or use_fundamental, "use_technical or use_fundamental must be True"
    duration = []
    date = start_date
    start = None
    while date <= end_date:
        if (not use_technical or check_technical_trend_templates(code, cur_day=date)) and (
            not use_fundamental or check_fundamental_trend_templates(code, current_date=date)
        ):
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
