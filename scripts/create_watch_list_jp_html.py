"""create_watch_list_html.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 17:02:08
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import argparse
import datetime
import json
from pathlib import Path

import polars as pl
from jinja2 import Environment, FileSystemLoader, select_autoescape

import stock


def get_watch_list(target_date: datetime.date = datetime.date.today()) -> list[str]:
    """watch listのデータを取得する"""
    watch_list = []
    code_list = stock.get_code_list()
    for code in code_list:
        data_csv_path = stock.DATA_DIR / f"daily/{code}.csv"
        df = (
            stock.kabutan.read_data_csv(data_csv_path)
            .filter(
                pl.col("date").is_between(target_date - datetime.timedelta(days=365), target_date)
            )
            .sort(pl.col("date"))
        )
        if df["close"].max() * 0.99 < df["close"][-1]:
            watch_list.append(code)

    return watch_list


def format_number(value):
    return float("{:.2f}".format(value))


def load_ticker_data(ticker: str, target_date: datetime.date = datetime.date.today()):
    stock.logger.info(f"Loading {ticker} data...")
    try:
        csv_path = stock.PROJECT_ROOT / f"data/daily/{ticker}.csv"
        df = stock.kabutan.read_data_csv(csv_path=csv_path)
        daily_df = df.filter(
            pl.col("date").is_between(target_date - datetime.timedelta(days=365), target_date)
        )
        daily_data = (
            daily_df.select(
                pl.col("date").dt.strftime("%Y/%m/%d"),
                pl.col("open"),
                pl.col("close"),
                pl.col("high"),
                pl.col("low"),
            )
            .to_numpy()
            .tolist()
        )
        daily_volume_data = daily_df["volume"].to_list()
        weekly_df = (
            df.filter(
                pl.col("date").is_between(
                    target_date - datetime.timedelta(days=365 * 3), target_date
                )
            )
            .group_by_dynamic(pl.col("date"), every="1w", start_by="monday")
            .agg(
                pl.col("open").first(),
                pl.col("close").last(),
                pl.col("high").max(),
                pl.col("low").min(),
                pl.col("volume").sum(),
            )
        )
        weekly_data = (
            weekly_df.select(
                pl.col("date").dt.strftime("%Y/%m/%d"),
                pl.col("open"),
                pl.col("close"),
                pl.col("high"),
                pl.col("low"),
            )
            .to_numpy()
            .tolist()
        )
        weekly_volume_data = weekly_df["volume"].to_list()
        return [
            {
                "code": ticker,
                "daily_data": daily_data,
                "volume_data": daily_volume_data,
            },
            {
                "code": f"{ticker}_weekly",
                "daily_data": weekly_data,
                "volume_data": weekly_volume_data,
            },
        ]
    except KeyboardInterrupt:
        raise KeyboardInterrupt
    except:
        stock.logger.exception("Failed to load data")
    return None


def main(
    output_dir: Path = stock.PROJECT_ROOT / "docs",
    template_dir: Path = stock.PROJECT_ROOT / "templates",
    target_date: datetime.date = datetime.date.today(),
):
    watch_list = get_watch_list(target_date)

    output_dir.mkdir(exist_ok=True)

    # templateの準備
    env = Environment(
        loader=FileSystemLoader(template_dir.as_posix()), autoescape=select_autoescape()
    )

    # render index.html
    template = env.get_template("index_jp.html")
    index_html_text = template.render(chart_ids=watch_list)
    index_html_path = output_dir / "index_jp.html"
    with open(index_html_path, "w") as f:
        f.write(index_html_text)

    # render bundle javascript files
    ticker_datas = sum(
        [d for d in [load_ticker_data(ticker=ticker) for ticker in watch_list] if d is not None], []
    )
    template_js = env.get_template("bundle.js")
    template_js.render(tickers=ticker_datas)
    bundle_js_path = output_dir / "bundle_jp.js"
    with open(bundle_js_path, "w") as f:
        f.write(template_js.render(tickers=ticker_datas))
    # stock.logger.info(render_bundle_js(env, ticker, output_dir / "js"))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output_dir", type=Path, default=stock.PROJECT_ROOT / "docs")
    parser.add_argument("--template_dir", type=Path, default=stock.PROJECT_ROOT / "templates")
    args = parser.parse_args()

    main(
        output_dir=args.output_dir,
        template_dir=args.template_dir,
    )
