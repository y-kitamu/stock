"""create_watch_list_html.py

Author : Yusuke Kitamura
Create Date : 2023-08-03 17:02:08
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import argparse
import datetime
import json
from pathlib import Path

import numpy as np
import polars as pl
from jinja2 import Environment, FileSystemLoader, select_autoescape

import stock
from stock.simulation.simulate import OnielStopCondition
from stock.trend_template import check_growing


def get_watch_list(current_date):
    """ """
    # 悪い決算を発表したが値上がりしてる銘柄を探す
    code_list = stock.kabutan.get_code_list()
    start_date = current_date - datetime.timedelta(days=365)
    watch_list = []
    for code in code_list:
        df = stock.kabutan.read_data_csv(code, start_date=start_date, end_date=current_date)
        fdf = (
            stock.kabutan.read_financial_csv(code)
            .filter(pl.col("annoounce_date") <= current_date)
            .sort(pl.col("annoounce_date"))
        )
        if len(fdf) > 0 and current_date - fdf["annoounce_date"][-1] < datetime.timedelta(days=1):
            continue

        # 過去10日の値動きの大きさを計算
        window_size = 10
        avg_key = "avg{}".format(window_size)
        stddev_key = "stddev{}".format(window_size)
        df = df.with_columns(
            pl.col("close").rolling_mean(window_size=window_size).alias(avg_key),
            pl.col("close").rolling_std(window_size=window_size).alias(stddev_key),
        )

        # ギャップアップしている
        df = df.with_columns(
            (pl.col("close") > pl.col(avg_key) + pl.col(stddev_key)).alias("breakpoint")
        )

        # 出来高が増加（急増）
        df = df.with_columns(
            pl.col("volume").rolling_max(window_size=window_size).shift().alias("max_volume")
        )
        df = df.with_columns((pl.col("volume") > pl.col("max_volume") * 2).alias("volume_increase"))

        if len(df) > 0 and df["breakpoint"][-1] and df["volume_increase"][-1]:
            # 高値で引けている
            if (df["close"][-1] - df["low"][-1]) / max(df["high"][-1] - df["low"][-1], 1e-5) > 0.8:
                # 小型株
                if stock.kabutan.data.get_market_capitalization(code) < 1000:
                    watch_list.append(code)
    return watch_list


def get_watch_list_old(current_date: datetime.date = datetime.date.today()) -> list[str]:
    """ """
    code_list = stock.kabutan.get_code_list()
    window_size = 2
    growing_rate = 0.15
    duration = 2

    # relative strengthの高い銘柄を取得
    target_key = "rs"
    target_code_list = []
    rs_list = []
    for code in code_list:
        df = stock.kabutan.read_data_csv(
            csv_path=stock.DATA_DIR / f"daily/{code}.csv", end_date=current_date
        )
        if len(df) > 0 and df[target_key][-1] > 0:
            rs_list.append([df[target_key][-1], df["rs_topix"][-1], df["rs"][-1]])
            target_code_list.append(code)

    ind = np.argsort(rs_list, axis=0)
    start_pos = int(len(rs_list) * 0.9)
    end_pos = int(len(rs_list) * 0.95)
    target_indices = ind[start_pos:end_pos, 0]
    target_code = np.array(target_code_list)[target_indices]

    # テクニカルでスクリーニング
    watch_list = []
    for code in target_code:
        df = stock.kabutan.read_data_csv(
            stock.DATA_DIR / f"daily/{code}.csv", end_date=current_date
        )
        # relative strengthが上昇している
        max_rs = df.filter(pl.col("date") >= current_date - datetime.timedelta(days=10))["rs"].max()
        if max_rs * 0.95 > df["rs"][-1]:
            continue

        # 新高値付近にある
        highest = df.filter(pl.col("date") >= current_date - datetime.timedelta(days=90))[
            "high"
        ].max()
        if highest * 0.80 > df["close"][-1]:
            continue

        watch_list.append(code)

    # fundamentalsでスクリーニング
    target_code = watch_list
    watch_list = []
    for code in target_code:
        df = (
            stock.kabutan.read_financial_csv(stock.DATA_DIR / f"financial/{code}.csv")
            .filter((pl.col("annoounce_date") <= current_date) & (pl.col("duration") == 3))
            .sort(pl.col("annoounce_date"))
        )
        # if len(df) == 0:
        #     watch_list.append(code)
        #     continue

        if current_date - df["annoounce_date"][-1] > datetime.timedelta(days=45):
            continue

        if not (
            check_growing(
                df,
                "total_revenue",
                growing_rate,
                min_duration=duration,
                current_date=current_date,
                num_average=window_size,
            )
            or check_growing(
                df,
                "operating_income",
                growing_rate,
                min_duration=duration,
                current_date=current_date,
                num_average=window_size,
            )
            or check_growing(
                df,
                "net_income",
                growing_rate,
                min_duration=duration,
                current_date=current_date,
                num_average=window_size,
            )
        ):
            if stock.kabutan.data.get_market_capitalization(code) > 50:
                watch_list.append(code)
    return watch_list


def get_success_list(target_date: datetime.date = datetime.date.today()) -> list[str]:
    """`target_date`から損切りに合わずに利益を出した銘柄のリストを取得する"""
    code_list = stock.get_code_list()
    results = get_simulation_results(code_list, target_date)
    cand_watch_list = [res["code"] for res in results if res["profit"] >= 20]
    watch_list = []
    for code in cand_watch_list:
        df = stock.kabutan.read_data_csv(stock.PROJECT_ROOT / f"data/daily/{code}.csv")
        df = df.filter(
            pl.col("date").is_between(target_date - datetime.timedelta(days=30), target_date)
        )
        if len(df) > 5 and df["volume"].mean() > 5000:
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

        mark_points = []
        dates = []
        fdf = stock.kabutan.read_financial_csv(stock.PROJECT_ROOT / f"data/financial/{ticker}.csv")
        fdf = fdf.filter(
            pl.col("annoounce_date").is_between(
                target_date - datetime.timedelta(days=365), target_date
            )
        )
        yfdf = fdf.filter(pl.col("duration") == 12)
        for idx in range(len(yfdf)):
            date = yfdf["annoounce_date"][idx]
            dates.append(date)
            mark_points.append(
                {
                    "date": date.strftime("%Y/%m/%d"),
                    "price": daily_df.filter(pl.col("date") <= date).sort(pl.col("date"))["close"][
                        -1
                    ],
                    "color": "blue" if yfdf["is_prediction"][idx] else "green",
                }
            )
        qfdf = fdf.filter(pl.col("duration") == 3)
        for idx in range(len(qfdf)):
            date = qfdf["annoounce_date"][idx]
            if date in dates:
                continue
            mark_points.append(
                {
                    "date": date.strftime("%Y/%m/%d"),
                    "price": daily_df.filter(pl.col("date") <= date).sort(pl.col("date"))["close"][
                        -1
                    ],
                    "color": "red",
                }
            )

        if len(weekly_data) == 0 or len(daily_data) == 0:
            return None
        return [
            {
                "code": ticker,
                "daily_data": daily_data,
                "volume_data": daily_volume_data,
                "mark_points": mark_points,
            },
            {
                "code": f"{ticker}_weekly",
                "daily_data": weekly_data,
                "volume_data": weekly_volume_data,
                "mark_points": [],
            },
        ]
    except KeyboardInterrupt:
        raise KeyboardInterrupt
    except:
        stock.logger.exception("Failed to load data")
    return None


def get_simulation_results(
    watch_list: list[str], target_date: datetime.date = datetime.date.today()
):

    results = []
    if target_date == datetime.date.today():
        for code in watch_list:
            results.append({"code": code, "duration": 0, "profit": 0})
    else:
        for idx, code in enumerate(watch_list):
            stop_condition = OnielStopCondition()
            res = stock.simulation.run(code, target_date, stop_condition)
            if res.buying_price > 0:
                results.append(
                    {"code": code, "duration": res.duration, "profit": round(res.profit * 100)}
                )
    return results


def main(
    output_dir: Path = stock.PROJECT_ROOT / "docs",
    template_dir: Path = stock.PROJECT_ROOT / "templates",
    target_date: datetime.date = datetime.date.today(),
):
    # watch_list = stock.trend_template.get_watch_list_v3(target_date)
    watch_list = get_watch_list(target_date)
    stock.logger.debug("Number of watchlist : {}".format(len(watch_list)))
    results = get_simulation_results(watch_list, target_date)
    watch_list = [r["code"] for r in results]
    stock.logger.debug("Number of watchlist : {}".format(len(watch_list)))

    output_dir.mkdir(exist_ok=True)

    # templateの準備
    env = Environment(
        loader=FileSystemLoader(template_dir.as_posix()), autoescape=select_autoescape()
    )

    # render index.html
    template = env.get_template("index_jp.html")
    index_html_text = template.render(chart_ids=watch_list, results=results)
    index_html_path = output_dir / "index_jp.html"
    with open(index_html_path, "w") as f:
        f.write(index_html_text)

    # render bundle javascript files
    ticker_datas = sum(
        [
            d
            for d in [
                load_ticker_data(ticker=ticker, target_date=target_date) for ticker in watch_list
            ]
            if d is not None
        ],
        [],
    )
    template_js = env.get_template("bundle.js")
    template_js.render(tickers=ticker_datas)
    bundle_js_path = output_dir / "bundle_jp.js"
    with open(bundle_js_path, "w") as f:
        f.write(template_js.render(tickers=ticker_datas))
    # stock.logger.info(render_bundle_js(env, ticker, output_dir / "js"))
    return watch_list


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output_dir", type=Path, default=stock.PROJECT_ROOT / "docs")
    parser.add_argument("--template_dir", type=Path, default=stock.PROJECT_ROOT / "templates")
    args = parser.parse_args()

    watch_list = stock.run_debug(
        main,
        output_dir=args.output_dir,
        template_dir=args.template_dir,
        # target_date=target_date,
    )
    for code in watch_list:
        print(code)
    print(f"Number of watchlist : {len(watch_list)}")
