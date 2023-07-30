"""monex_scouter.py
銘柄スカウター(https://monex.ifis.co.jp/index.php)から銘柄情報を取得する
Author : Yusuke Kitamura
Create Date : 2023-02-11 21:12:47
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import json
from typing import List, Union

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.command import Command

from .. import logger
from ..constants import PROJECT_ROOT

MANEX_BASE_URL = "https://mst.monex.co.jp"
MANEX_LOGIN_PAGE_URL = f"{MANEX_BASE_URL}/pc/ITS/login/LoginIDPassword.jsp"
MANEX_LOGIN_ID_JSON = PROJECT_ROOT / "cert" / "manex_login_id.json"

TARGET_SERIES_TABLE_IDS = [
    "table_fy",  # 通期業績推移
    "table_4q",  # 四半期業績推移
    "table_cf",  # キャッシュフロー推移
    "table_bs_byyear_assets_10yr",  # 資産
    "table_bs_byyear_liab_10yr",  # 負債、純資産
    "table_ive_perf_10yr",  # 設備投資・減価償却費・研究開発費
    "table_itd_perf_10yr",  # 有利子負債
    "table_turnover_rate_10yr",  # 各種回転率
    "table_employee_perf_table_10yr",  # 従業員数・1人当り業績
]
TARGET_INDEX_TABLE_CLASSES = ["wariyasu", "kouritsu", "kenzen", "kanren"]


with open(MANEX_LOGIN_ID_JSON, "r") as f:
    LOGIN_INFO = json.load(f)


def is_connection_alive(driver):
    try:
        driver.execute(Command.STATUS)
        return True
    except:
        return False


class DriverWrapper:
    EXECUTOR_URL = "http://localhost:4444/wd/hub"

    def __init__(self, executor_url=EXECUTOR_URL):
        self._executor_url = executor_url
        self.driver = self._get_or_create_driver(executor_url)

    def _get_or_create_driver(self, executor_url=EXECUTOR_URL):
        if hasattr(self, "driver") and is_connection_alive(self.driver):
            return self.driver

        self.executor_url = executor_url
        options = webdriver.ChromeOptions()
        return webdriver.Remote(
            command_executor=executor_url,
            desired_capabilities=options.to_capabilities(),
            options=options,
        )

    def quit(self):
        self.driver.quit()

    def __del__(self):
        if not is_connection_alive(self.driver):
            self.driver.quit()


def run(target_codes: List[str], max_retry: int = 5):
    logger.debug("Start scraping")
    dw = DriverWrapper()
    logger.debug("Successfully create selenium driver.")

    for i in range(max_retry):
        try:
            _open_scouter_page(dw)
            break
        except:
            logger.exception(f"Failed to open scouter page. Retry... ({i + 1} / {max_retry})")

    datas = {}
    for code in target_codes:
        logger.debug(f"Start scraping code : {code}, current_url : {dw.driver.current_url}")
        for i in range(max_retry):
            try:
                datas[code] = _get_code_info(dw, code)
                logger.debug(f"Finish scraping code : {code}")
                break
            except:
                logger.exception(f"Failed to get code info. Retry... ({i + 1} / {max_retry})")
    return datas


def _open_scouter_page(dw: DriverWrapper):
    # ログイン画面でIDとパスワードを入力してログインする
    dw.driver.get(MANEX_LOGIN_PAGE_URL)
    logger.debug(f"Open login page. {dw.driver.current_url}")
    dw.driver.find_element(By.ID, "loginid").send_keys(LOGIN_INFO["loginid"])
    dw.driver.find_element(By.ID, "passwd").send_keys(LOGIN_INFO["passwd"])

    for elem in dw.driver.find_elements(By.TAG_NAME, "input"):
        if elem.get_attribute("type") == "submit" and elem.get_attribute("value") == "ログイン":
            elem.click()
            break
    else:
        raise Exception("マネックス証券へのログインボタンが見つかりませんでした")
    logger.debug(f"Login success : {dw.driver.current_url}")

    # スカウター画面に遷移する
    for elem in dw.driver.find_elements(By.TAG_NAME, "a"):
        if elem.text == "ツール":
            elem.click()
            break
    else:
        raise Exception("マネックス証券のマイページでツールボタンが見つかりませんでした")
    logger.debug(f"Move to tool page : {dw.driver.current_url}")

    for elem in dw.driver.find_elements(By.TAG_NAME, "td"):
        flag = False
        for href in elem.find_elements(By.TAG_NAME, "a"):
            if href.text == "マネックス銘柄スカウター":
                flag = True
                break
        if flag:
            for href in elem.find_elements(By.TAG_NAME, "a"):
                if href.text == "ログイン":
                    href.click()
                    break
            break
    else:
        raise Exception("マネックス銘柄スカウターのログインボタンが見つかりませんでした")

    # (銘柄スカウターは新しいタブで開かれるので、)新しいタブに移動する
    for handle in dw.driver.window_handles:
        if handle != dw.driver.current_window_handle:
            dw.driver.switch_to.window(handle)
            break
    else:
        raise Exception("マネックス銘柄スカウターが開かれているタブが見つかりません")
    logger.debug(f"Switch to new tab and open scouter : {dw.driver.current_url}")


def _get_code_info(dw: DriverWrapper, code: Union[str, int]):
    # 銘柄入力欄を取得
    form = dw.driver.find_element(By.ID, "se_word")
    for elem in form.find_elements(By.TAG_NAME, "input"):
        if elem.get_attribute("name") == "wd":
            break
    else:
        raise Exception("銘柄入力欄が見つかりませんでした")
    # 銘柄入力欄に銘柄コードを入力する
    elem.send_keys(str(code))
    # # 検索ボタンをクリック
    for elem in form.find_elements(By.TAG_NAME, "input"):
        if elem.get_attribute("type") == "image" and elem.get_attribute("class") == "search_button":
            elem.click()
            break
    else:
        raise Exception("検索ボタンが見つかりませんでした")
    logger.debug(f"Open code page : {dw.driver.current_url}")
    # Beautifulsoupでパース
    soup = BeautifulSoup(dw.driver.page_source, parser="lxml")
    data = {}
    for tid in TARGET_SERIES_TABLE_IDS:
        table = soup.find("table", id=tid)
        header, values = _get_series_table_data(table)
        data[tid] = {"header": header, "values": values}

    index_tables = soup.find("div", id="index_list_mass")
    for tc in TARGET_INDEX_TABLE_CLASSES:
        table = index_tables.find("div", class_=tc).find("table")
        header, value = _get_index_table_data(table)
        data[tc] = {"header": header, "value": value}
    return data


def _get_series_table_data(table):
    rows = table.find("thead").find_all("tr")
    header = [th.text for th in rows[0].find_all("th")]
    for row in rows[1:]:
        sub_header = [th.text for th in row.find_all("th")]
        hi = 0
        for sh in sub_header:
            while hi < len(header) and header[hi] != "":
                hi += 1
            if hi < len(header):
                header[hi] = sh
                hi += 1
            else:
                header.append(sh)
                hi += 1
    values = [[td.text for td in tr.find_all("td")] for tr in table.find("tbody").find_all("tr")]
    return header, values


def _get_index_table_data(table):
    header = [th.text for th in table.find_all("th")]
    value = [td.text for td in table.find_all("td")]
    return header, value
