"""update_watch_list_jp.py
"""

import stock


def main():
    csv_dir = stock.PROJECT_ROOT / "data" / "daily"
    watch_list = []
    for csv_path in sorted(csv_dir.glob("*.csv")):
        code = csv_path.stem
        if stock.trend_template.check_technical_trend_templates(
            code
        ) and stock.trend_template.check_fundamental_trend_templates(code):
            # print(code)
            watch_list.append(code)

    print(f"Number of watch list : {len(watch_list)}")
    with open(stock.PROJECT_ROOT / "data" / "watch_list_jp.csv", "w") as f:
        f.write("code\n")
        for code in watch_list:
            f.write(f"{code}\n")


if __name__ == "__main__":
    main()
