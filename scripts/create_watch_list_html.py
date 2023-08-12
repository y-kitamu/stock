"""create_watch_list_html.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 17:02:08
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import argparse
import json
from pathlib import Path

import yfinance as yf
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pyrate_limiter import Duration, Limiter, RequestRate
from requests import Session
from requests_cache import CacheMixin, SQLiteCache
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket

import stock


class CachedLimiterSession(CacheMixin, LimiterMixin, Session):
    pass


session = CachedLimiterSession(
    limiter=Limiter(RequestRate(2, Duration.SECOND * 0.2)),
    bucket_class=MemoryQueueBucket,
    backend=SQLiteCache("yfinance.cache"),
)


def format_number(value):
    return float("{:.2f}".format(value))


# def render_bundle_js(env: Environment, ticker: str, output_dir: Path):
#     template = env.get_template("bundle.history")
#     js = yf.Ticker(ticker, session=session).history(period="1y", interval="1d")
#     dates = [idx.strftime("%Y/%m/%d") for idx in history.index]
#     daily_data = []
#     volume_data = []
#     for idx, row in enumerate(history.to_numpy()):
#         daily_data.append(
#             [
#                 dates[idx],
#                 format_number(row[0]),
#                 format_number(row[3]),
#                 format_number(row[1]),
#                 format_number(row[2]),
#             ]
#         )
#         volume_data.append(row[4])

#     text = template.render(chart_id=ticker, daily_data=daily_data, volume_data=volume_data)

#     output_dir.mkdir(exist_ok=True)
#     output_path = output_dir / f"bundle_{ticker}.js"
#     with open(output_path, "w") as f:
#         f.write(text)
#     return output_path


def load_ticker_data(ticker: str):
    stock.logger.info(f"Loading {ticker} data...")
    try:
        history = yf.Ticker(ticker, session=session).history(period="1y", interval="1d")
        dates = [idx.strftime("%Y/%m/%d") for idx in history.index]
        daily_data = []
        volume_data = []
        for idx, row in enumerate(history.to_numpy()):
            daily_data.append(
                [
                    dates[idx],
                    format_number(row[0]),
                    format_number(row[3]),
                    format_number(row[1]),
                    format_number(row[2]),
                ]
            )
            volume_data.append(row[4])
        return {
            "code": ticker,
            "daily_data": daily_data,
            "volume_data": volume_data,
        }
    except KeyboardInterrupt:
        raise KeyboardInterrupt
    except:
        stock.logger.exception("Failed to load data")
    return None


def main(
    summary_path: Path = stock.DATA_DIR / "summary.json",
    watch_list_path: Path = stock.DATA_DIR / "watch_list.csv",
    output_dir: Path = stock.PROJECT_ROOT / "docs",
    template_dir: Path = stock.PROJECT_ROOT / "templates",
):
    output_dir.mkdir(exist_ok=True)

    # templateの準備
    env = Environment(
        loader=FileSystemLoader(template_dir.as_posix()), autoescape=select_autoescape()
    )

    # summary の読み込み
    with open(summary_path, "r") as f:
        summary = json.load(f)
    sectors = []
    for sector in summary["count_per_sector"].keys():
        sectors.append(
            {
                "name": sector,
                "count": summary["count_per_sector"][sector],
                "n_watching": summary["watch_list_per_sector"][sector],
                "rs": summary["rss_per_sector"][sector],
            }
        )

    # watchlistの読み込み
    with open(watch_list_path, "r") as f:
        watch_list = [txt.strip() for txt in f.readlines()[1:]]

    # render index.html
    template = env.get_template("index.html")
    index_html_text = template.render(chart_ids=watch_list, sectors=sectors)
    index_html_path = output_dir / "index.html"
    with open(index_html_path, "w") as f:
        f.write(index_html_text)

    # render bundle javascript files
    ticker_datas = [
        d for d in [load_ticker_data(ticker=ticker) for ticker in watch_list] if d is not None
    ]
    template_js = env.get_template("bundle.js")
    template_js.render(tickers=ticker_datas)
    bundle_js_path = output_dir / "bundle.js"
    with open(bundle_js_path, "w") as f:
        f.write(template_js.render(tickers=ticker_datas))
    # stock.logger.info(render_bundle_js(env, ticker, output_dir / "js"))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--summary_path", type=Path, default=stock.DATA_DIR / "summary.json")
    parser.add_argument("--watch_list_path", type=Path, default=stock.DATA_DIR / "watch_list.csv")
    parser.add_argument("--output_dir", type=Path, default=stock.PROJECT_ROOT / "docs")
    parser.add_argument("--template_dir", type=Path, default=stock.PROJECT_ROOT / "templates")
    args = parser.parse_args()

    main(
        summary_path=args.summary_path,
        watch_list_path=args.watch_list_path,
        output_dir=args.output_dir,
        template_dir=args.template_dir,
    )
