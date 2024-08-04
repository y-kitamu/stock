"""update_watch_list_jp.py
"""

import datetime

import stock


def main():
    watch_list = stock.watchlist.v1.get_watch_list(current_date=datetime.date.today())

    print(f"Number of watch list : {len(watch_list)}")
    with open(stock.PROJECT_ROOT / "data" / "watch_list_jp.csv", "w") as f:
        f.write("code\n")
        for code in watch_list:
            f.write(f"{code}\n")


if __name__ == "__main__":
    main()
