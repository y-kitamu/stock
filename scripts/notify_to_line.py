"""notify_to_line.py
"""

import datetime
import uuid
from pathlib import Path

import requests

import stock

ACCESS_TOKEN_FILE = stock.PROJECT_ROOT / "cert" / "line_message_api.txt"
ENDPOINT = "https://api.line.me/v2/bot/message/broadcast"


def get_latest_dates_data_number():
    dirnames = ["minutes", "minutes_gmo", "minutes_yf"]
    results = {}
    for dirname in dirnames:
        data_root = stock.PROJECT_ROOT / "data" / dirname
        dirs = sorted([p for p in data_root.glob("20*") if p.is_dir()])
        if len(dirs) == 0:
            results[dirname] = "No data directory found."
            continue
        num_data = len(list(dirs[-1].glob("*.csv")))
        results[dirname] = "dirname = {}, num = {}".format(dirs[-1].name, num_data)
    return results


if __name__ == "__main__":
    with open(ACCESS_TOKEN_FILE, "r") as f:
        access_token = f.read().strip()

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(access_token),
        "X-Line-Retry-Key": str(uuid.uuid1()),
    }
    data_nums = get_latest_dates_data_number()
    text = "date: {}\\n".format(datetime.date.today().strftime("%Y%m%d"))
    for key, val in data_nums.items():
        text += "{}\\n".format(val)
    data = '{{"messages": [{{"type": "text", "text": "{}"}}]}}'.format(text)
    res = requests.post(ENDPOINT, headers=headers, data=data)

    if res.status_code == 200:
        print("Message sent successfully!")
    else:
        print("header: {}".format(headers))
        print("data : {}".format(data))
        print("{}: {}".format(res.status_code, res.text))
