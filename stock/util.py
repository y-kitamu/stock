"""util.py
"""

import re

# import polars as pl


def convert_to_number(val_str: str) -> int | float | None:
    val_str = val_str.replace(",", "")
    res = re.search("-*\d+\.*\d*", val_str)
    if res is None:
        return None
    if "." in val_str:
        return float(res.group(0))
    return int(res.group(0))


# def polars_map_batch(func):
#     """
#     ```python
#     @polars_map_batch
#     def test(dates, days=30):
#         return dates - datetime.timedelta(days=days)

#     df = df.with_columns(pl.col("date").map_batches(test).alias("test"))
#     ```
#     """

#     def _map_batch(pl_obj, *args, **kwargs):
#         res = [func(data, *args, **kwargs) for data in pl_obj]
#         return pl.Series(res)

#     return _map_batch
