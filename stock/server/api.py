"""api.py
Stock data API
Author : Yusuke Kitamura
Create Date : 2022-08-27 17:57:07
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import json
import time
from pathlib import Path

import requests
import stock
from fastapi import BackgroundTasks, Depends, FastAPI
from fastapi.exceptions import HTTPException
from fastapi_utils.tasks import repeat_every

try:
    from .. import COMPANY_LIST_JSON
    from . import schemas
except:
    from stock import COMPANY_LIST_JSON

    import schemas

REQUEST_INTERVAL_SEC = 5

app = FastAPI()

try:
    import sentry_sdk
    from sentry_sdk.integrations.asgi import SentryAsgiMiddleware

    sentry_sdk.init(
        dsn="https://3a20bfc8eabd4ae1ac2ffff12973b008@o1379927.ingest.sentry.io/6693026",
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production.
        traces_sample_rate=1.0,
    )
    app.add_middleware(SentryAsgiMiddleware)
except Exception:
    stock.logger.exception("Failed to init sentry_sdk")


@app.get(
    "/company/{code}/stats", response_model=schemas.StatsResponse, response_model_exclude_unset=True
)
async def get_company_stats(code: str):
    """Get company's latest stats"""
    stats = stock.models.get_company_stats(code)
    if stats is None:
        return schemas.StatsResponse()
    return schemas.StatsResponse(**stats)


@app.get("/company/update")
async def request_update_database(background_task: BackgroundTasks):
    """Update company's statistics"""
    stock.logger.info("Request update statistics")
    background_task.add_task(update_database)


@repeat_every(seconds=24 * 60 * 60)
async def update_cron():
    """Update statistics every 24 hours"""
    stock.logger.info("Cron request for update")
    url = f"http://localhost:{port}/company/update"
    res = requests.get(url, timeout=3)
    if res.status_code != requests.codes.ok:
        stock.logger.error(f"Failed to update statistics {url}: {res.status_code}")


def update_database():
    stock.logger.info("Update statistics")
    company_list = json.loads(COMPANY_LIST_JSON.read_text())["codes"]

    for code in company_list:
        try:
            if stock.models.create_company(code):
                stock.adapter.store_statistics(code)
                stock.adapter.store_stock_time_series(code)
            else:
                stock.logger.error(f"Failed to create company: {code}")
        except Exception:
            stock.logger.exception(f"Failed to update statistics : {code}")

        time.sleep(REQUEST_INTERVAL_SEC)
    stock.logger.info("Update statistics completed")


if __name__ == "__main__":
    import argparse

    import uvicorn

    parser = argparse.ArgumentParser("Stock server")
    parser.add_argument("--port", type=int, default=5000)

    args = parser.parse_args()
    port = args.port

    update_database()
    uvicorn.run(app, host="0.0.0.0", port=port)
