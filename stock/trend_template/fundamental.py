"""fundamental.py
"""

from datetime import date
from typing import Dict

import polars as pl

from ..constants import PROJECT_ROOT
from ..kabutan import read_financial_csv


def _check_growing(
    df: pl.DataFrame,
    key: str,
    min_growth_rate: float,
    min_duration: int,
    current_date: date = date.today(),
    num_average: int = 1,
):
    if len(df) < min_duration + num_average:
        return False
    df = df.filter(pl.col("annoounce_date") < current_date).sort(
        "annoounce_date", descending=True, nulls_last=True
    )
    is_growing = True
    for i in range(min_duration):
        cur_data = df[i : i + num_average]
        prev_data = pl.concat(
            [
                df.filter(
                    (pl.col("year") == cur_data["year"][i] - 1)
                    & (pl.col("month") == cur_data["month"][i])
                    & (pl.col("duration") == cur_data["duration"][i])
                )
                for i in range(len(cur_data))
            ]
        )

        if len(cur_data) != len(prev_data):
            is_growing = False
            break

        if (not cur_data[key].is_not_null().all()) or (not prev_data[key].is_not_null().all()):
            is_growing = False
            break

        cur_val = cur_data[key].sum()
        prev_val = prev_data[key].sum()
        if prev_val > 0:
            is_growing &= cur_val > (1.0 + min_growth_rate) * prev_val
        else:
            is_growing &= cur_val > prev_val * (1.0 - min_growth_rate)
        if not is_growing:
            break
    return is_growing


def check_fundamental_trend_templates(
    code: str, current_date=date.today(), results: Dict[str, bool] = {}
):
    """fundamentalのテンプレートをチェックする"""
    csv_path = PROJECT_ROOT / "data" / "financial" / f"{code}.csv"
    if not csv_path.exists():
        return False

    df = read_financial_csv(csv_path)
    df = df.filter(pl.col("annoounce_date") <= current_date)
    quarter_df = df.filter(pl.col("duration") == 3).sort("annoounce_date")
    year_df = df.filter((pl.col("duration") == 12) & (pl.col("is_prediction") == False)).sort(
        "annoounce_date"
    )
    pred_df = df.filter(
        (pl.col("is_prediction") == True)
        & (pl.col("duration") == 12)
        & (pl.col("year") >= current_date.year)
    ).sort("annoounce_date")

    if len(quarter_df) == 0:
        return False

    # fundamentalsが良好かチェック
    # 直近四半期の利益がプラス
    results["latest_net_income"] = quarter_df["net_income"][-1] > 0
    # 直近2四半期のepsが前年同期比で20%以上増加
    results["net_income_growing"] = _check_growing(
        df=quarter_df,
        key="net_income",
        min_growth_rate=0.2,
        min_duration=2,
        current_date=current_date,
    )
    # 直近年度の売上高が前年比で10%以上増加
    results["total_revenue_growing"] = _check_growing(
        df=year_df,
        key="total_revenue",
        min_growth_rate=0.1,
        min_duration=1,
        current_date=current_date,
    )
    # 翌年度の予想が出ている場合は今年の結果と比較
    if len(pred_df) > 0 and len(year_df) > 0:
        latest_pred = pred_df[-1]

        if latest_pred["year"][0] > year_df["year"][-1]:
            if latest_pred["total_revenue"][0] is not None:
                results["pred_total_revenue"] = (
                    latest_pred["total_revenue"][0] > year_df["total_revenue"][-1]
                )
            if latest_pred["operating_income"][0] is not None:
                results["pred_operating_income"] = (
                    latest_pred["operating_income"][0] > year_df["operating_income"][-1]
                )
            if latest_pred["net_income"][0] is not None:
                results["pred_net_income"] = (
                    latest_pred["net_income"][0] > year_df["net_income"][-1]
                )

    # print(code, results)
    return all(results.values())
