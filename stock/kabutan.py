import re
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from pydantic import BaseModel, Field
import requests
from bs4 import BeautifulSoup

kabutan_url = "https://kabutan.jp"
news_list_url_base = "https://kabutan.jp/news/marketnews/?category=9&date={}"
stock_url_template = "https://kabutan.jp/stock/kabuka?code={}&ashi=day&page={}"


def generate_logined_driver():
    login_url = "https://account.kabutan.jp/login"
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver = webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)

    login_info = {"email": "ymyk6602@gmail.com", "pass": "ymyk6422"}
    driver.get(login_url)
    driver.find_element(By.ID, "session_email").send_keys(login_info["email"])
    driver.find_element(By.ID, "session_password").send_keys(login_info["pass"])

    for elem in driver.find_elements(By.TAG_NAME, "input"):
        if elem.get_attribute("type") == "submit" and elem.get_attribute("value") == "ログインする":
            elem.click()
            break
    return driver


class CatalystStock(BaseModel):
    code: int
    category: str
    next_date: str = Field(default_factory=str)
    target_date_values: list[float] = Field(default_factory=float)
    next_date_values: list[float] = Field(default_factory=list)
    up_rate: float = Field(default_factory=float)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.up_rate = calc_up_rate(self.next_date_values)


class CatalystStocks(BaseModel):
    date: str = Field(default_factory=str)
    stocks: list[CatalystStock] = Field(default_factory=list)


def get_catalyst_news_url(date, driver=None):
    news_list_url = news_list_url_base.format(date)
    if driver is None:
        html = requests.get(news_list_url).text
    else:
        driver.get(news_list_url)
        html = driver.page_source

    soup = BeautifulSoup(html)
    for link in soup.find_all("a"):
        if "【明日の好悪材料】を開示情報でチェック！" in link.text and date in link["href"]:
            return kabutan_url + link["href"]


def get_catalyst_stock_list(news_url, driver=None):
    if driver is None:
        res = requests.get(news_url)
        html = res.text
    else:
        driver.get(news_url)
        html = driver.page_source
    soup = BeautifulSoup(html)

    good_catalyst = "【好材料】"
    bad_catalyst = "【悪材料】"
    mid_catalyst = "【好悪材料が混在】"

    regex = re.compile("■.*<(\d*)>")

    catalyst_codes = {"good": [], "bad": [], "mid": []}
    current_key = ""
    for line in soup.text.split("\n"):
        if good_catalyst in line:
            current_key = "good"
        elif bad_catalyst in line:
            current_key = "bad"
        elif mid_catalyst in line:
            current_key = "mid"

        match = regex.search(line)
        if current_key in catalyst_codes and match is not None:
            catalyst_codes[current_key].append(int(match.group(1)))
    return catalyst_codes


def search_stock_table_rows(soup, exclude_today=True):
    res = []
    for table in soup.find_all("table"):
        thead = table.find("tr")
        if thead is None:
            continue
        headers = [th.text for th in thead.find_all("th")]
        if (
            len(headers) >= 4
            and headers[1] == "始値"
            and headers[2] == "高値"
            and headers[3] == "安値"
            and headers[4] == "終値"
        ):
            rows = table.find_all("tr")[1:]
            if len(rows) > (1 + int(exclude_today)):
                res += rows
    return res


def get_values(base_url, start_page=0, max_page=1, driver=None):
    results = {}
    for i in range(start_page, max_page):
        url = base_url.format(i + 1)
        if driver is None:
            html = requests.get(url).text
        else:
            driver.get(url)
            html = driver.page_source
        soup = BeautifulSoup(html)
        rows = search_stock_table_rows(soup, i != 0)

        if len(rows) == 0:
            print(f"stock table not found : {url}")

        for row in rows:
            cols = [col.text for col in row.findChildren(recursive=False)]
            date = "20{}{}{}".format(*cols[0].split("/"))
            if cols[1] == "－":
                continue
            values = [float(val_str.replace(",", "")) for val_str in cols[1:5]]
            results[date] = values
        time.sleep(0.2)
    return results


def get_next_day_values(code, target_date: int | str, max_search_page=1, driver=None):
    if isinstance(target_date, str):
        target_date = int(target_date)
    url = stock_url_template.format(code, "{}")

    for i in range(max_search_page, 0, -1):
        stock_values = get_values(url, start_page=i - 1, max_page=i, driver=driver)
        sorted_dates = sorted(stock_values.keys(), key=lambda x: int(x))
        for date in sorted_dates:
            if int(date) > target_date:
                return i, date, stock_values[date]
    return None, None, None


def calc_up_rate(values):
    return (values[3] - values[0]) / values[0]


def get_catalyst_stock_values(date, max_search_page, driver=None):
    catalyst_news_url = get_catalyst_news_url(date, driver=driver)
    if catalyst_news_url is None:
        print(f"Catalyst new not found : {date}")
        return None

    print(catalyst_news_url)
    catalyst_codes = get_catalyst_stock_list(catalyst_news_url, driver=driver)
    catalyst_stocks = CatalystStocks(date=date)

    def to_datetime(date_str):
        return datetime.datetime.strptime(str(date_str), "%Y%m%d")

    for key, codes in catalyst_codes.items():
        for code in codes:
            # print(f"start {code}")
            max_page, next_date, values = get_next_day_values(
                code, int(date), max_search_page=max_search_page
            )

            if next_date is None or to_datetime(next_date) - to_datetime(date) > datetime.timedelta(
                days=10
            ):
                print(f"Failed to find next date value. code = {code}")
                continue
            max_search_page = max_page
            catalyst_stocks.stocks.append(
                CatalystStock(code=code, category=key, next_date=next_date, values=values)
            )
    return catalyst_stocks


if __name__ == "__main__":
    import datetime
    from pathlib import Path

    start_date = datetime.datetime(year=2022, month=12, day=20)
    end_date = datetime.datetime(year=2024, month=3, day=7)
    output_dir = Path("../data/catalyst")
    output_dir.mkdir(exist_ok=True)

    date = start_date
    while date != end_date:
        date_str = date.strftime("%Y%m%d")
        print(f"Start {date_str}")
        output_path = output_dir / (date_str + ".json")

        date += datetime.timedelta(days=1)
        if output_path.exists():
            print(f"Skip : {date_str}")
            continue

        res = get_catalyst_stock_values(date_str, 10, driver=driver)
        if res is not None:
            with open(output_path, "w") as f:
                f.write(res.model_dump_json(indent=4))
            print(f"Save to {output_path.as_posix()}")
