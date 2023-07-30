"""collect_financial_infos.py

Author : Yusuke Kitamura
Create Date : 2023-07-30 18:27:33
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import argparse
import csv
import datetime
import json
import time
from pathlib import Path
from typing import Optional

import numpy as np
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import stock


def convert_to_number(str):
    """Convert string to number."""
    str = str.replace(",", "")
    if "." in str:
        return float(str)
    else:
        try:
            return int(str)
        except:
            # print("Failed to convert {} to number".format(str))
            return np.nan


def extract_table_data(source: BeautifulSoup) -> dict:
    """Extract table data (finance data) from BeautifulSoup object."""
    table = {}
    table_head = source.find("div", {"class": "D(tbhg)"})
    # if table_head is None:
    #     stock.logger.warning("Failed to extract table data")
    #     return table
    columns = [span.text for span in table_head.find_all("span")]

    table_body = source.find("div", {"class": "D(tbrg)"})
    # if table_body is None:
    #     stock.logger.warning("Failed to extract table data")
    #     return table
    blocks = [div for div in table_body.find_all("div", {"class": "rw-expnded"}, recursive=False)]

    for block in blocks:
        #
        rows = block.find_all("div", {"class": "D(tbr)"})
        first_row = rows[0].find("div", {"class": "D(tbc)"})
        # if first_row is None:
        #     stock.logger.warning("Failed to extract row data")
        #     continue
        breakdown = first_row.text
        table[breakdown] = {
            key: convert_to_number(val.text)
            for key, val in zip(columns[1:], rows[0].find_all("div", {"class": "Ta(c)"}))
            if key != "ttm"
        }
        # 折りたたまれている行の読み込み
        for row in rows[1:]:
            sub_row = row.find("div", {"class": "D(tbc)"})
            # if sub_row is None:
            #     stock.logger.warning("Failed to extract sub-row data")
            #     continue
            sub_breakdown = sub_row.text
            table[breakdown][sub_breakdown] = {
                key: convert_to_number(val.text)
                for key, val in zip(columns[1:], row.find_all("div", {"class": "Ta(c)"}))
                if key != "ttm"
            }
    return table


def run(
    driver: Optional[webdriver.Remote] = None,
    code: str = "NVDA",
    output_dir: Path = stock.DATA_DIR / "financials",
):
    stock.logger.info(f"Start collecting financial data of {code}")

    target_urls = [
        "https://finance.yahoo.com/quote/{code}/financials?p={code}",
        "https://finance.yahoo.com/quote/{code}/balance-sheet?p={code}",
        "https://finance.yahoo.com/quote/{code}/cash-flow?p={code}",
    ]

    table = {"Quarterly": {}, "Annual": {}}
    for url in target_urls:
        driver.get(url.format(code=code))
        buttons = [
            button
            for button in driver.find_elements(By.TAG_NAME, "button")
            if button.text == "Expand All"
        ]
        if buttons:
            buttons[0].click()
            time.sleep(0.2)

        # quqrterly data
        buttons = [
            button
            for button in driver.find_elements(By.TAG_NAME, "button")
            if button.text == "Quarterly"
        ]
        if buttons:
            buttons[0].click()
            time.sleep(0.2)
        source = BeautifulSoup(driver.page_source, parser="lxml", features="lxml")
        table["Quarterly"].update(extract_table_data(source))

        # annual data
        buttons = [
            button
            for button in driver.find_elements(By.TAG_NAME, "button")
            if button.text == "Annual"
        ]
        if buttons:
            buttons[0].click()
            time.sleep(0.2)
        source = BeautifulSoup(driver.page_source, parser="lxml", features="lxml")
        table["Annual"].update(extract_table_data(source))

    # save data
    json_path = output_dir / f"{code}.json"

    # if json file exists, update it
    if json_path.exists():
        with open(json_path, "r") as f:
            table.update(json.load(f))

    with open(json_path, "w") as f:
        json.dump(table, f, indent=4)

    stock.logger.info(f"Saved financial data of {code} to {json_path}")


def main(debug: bool = False):
    stock.logger.info("Start collecting financial data")

    success_list = []
    failed_list = []

    # load stock code list
    with open(stock.DATA_DIR / "us_stock_codes.csv", "r") as f:
        csv_reader = csv.reader(f)
        target_codes = [row[0] for row in list(csv_reader)[1:]]

    # prepare selenium driver
    stock.logger.info("Start ChromeDriver")
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    if debug:
        driver = webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)
    else:
        options.add_argument("--headless")
        driver = webdriver.Chrome(options=options)
    stock.logger.info("ChromeDriver is ready")

    try:
        for code in target_codes:
            if (stock.DATA_DIR / "financials" / f"{code}.json").exists():
                stock.logger.info(f"Financial data of {code} already exists")
                continue
            # tasks[code] = executor.submit(run, code=code)
            try:
                run(driver=driver, code=code)
                success_list.append(code)
            except:
                stock.logger.exception(f"Failed to collect financial data of {code}")
                failed_list.append(code)
    except:
        stock.logger.exception("Unexpected error occurred")
    finally:
        driver.quit()

    # log results
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    log_file = stock.LOG_DIR / "success_list_{}.txt".format(timestamp)
    with open(log_file, "w") as f:
        f.write("\n".join(success_list))

    log_file = stock.LOG_DIR / "failed_list_{}.txt".format(timestamp)
    with open(log_file, "w") as f:
        f.write("\n".join(failed_list))

    stock.logger.info("Finished collecting financial data")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--debug", action="store_true")

    args = parser.parse_args()

    main(args.debug)
