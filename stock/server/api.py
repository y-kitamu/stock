"""api.py

Author : Yusuke Kitamura
Create Date : 2022-08-27 17:57:07
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import stock
from fastapi import Depends, FastAPI
from fastapi.exceptions import HTTPException
from fastapi_utils.tasks import repeat_every

try:
    from . import schemas
except:
    import schemas

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
@app.on_event("startup")
@repeat_every(seconds=24 * 60 * 60)
async def update_all():
    stock.logger.info("Update statistics")

    companies = stock.models.get_all_companies()
    for company in companies:
        try:
            stock.adapter.store_statistics(str(company.code))
            stock.adapter.store_stock_time_series(str(company.code))
        except Exception:
            stock.logger.exception(f"Failed to update statistics : {company.code}")

    stock.logger.info("Update statistics completed")
