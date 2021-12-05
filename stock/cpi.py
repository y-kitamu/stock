"""cpi.py
scraper for Consumer Price Index.
Author : Yusuke Kitamura
Create Date : 2021-12-05 17:00:02
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import csv
from datetime import datetime
from pathlib import Path
from typing import List

import bs4
import requests
from bs4 import BeautifulSoup
from build.lib import stock
from fake_useragent import UserAgent

from stock import PROJECT_ROOT, logger

DEFAULT_URL = "https://www.bls.gov/news.release/cpi.htm"
CPI_FOLDER_GID = "1K39G7mshxkj1LGWfxCuKIdjAGCUlZv-l"


class CPIException(Exception):

    def __init__(self, msg):
        super().__init__(msg)


def save_cpi_table_datas(save_dir: Path, url: str = DEFAULT_URL, overwrite: bool = False) -> List[Path]:
    """Download Consumer Price Index from U.S. bls web site and save table data to `save_dir`.
    Args:
        save_dir (Path) : Path to directory in which download data is saved.
        url (str) : Url from which cpi data is downloaded.
        overwrite (bool) : If True, overwrite file.
    Return:
        List[str] : list of saved files.
    """
    logger.debug("save_dir = {}, url = {}, overwrite = {}".format(save_dir, url, overwrite))
    save_dir.mkdir(parents=True, exist_ok=True)

    # download html from `url`
    ua = UserAgent()
    header = {'User-Agent': ua.chrome}
    res = requests.get(url, headers=header)
    if not res.status_code == 200:
        raise CPIException("Failed to download html from {}. status code = {}".format(
            url, res.status_code))

    # scrape html
    bs = BeautifulSoup(res.content, "html.parser")
    # 更新日時の取得
    date_str = bs.find(class_="update").text.split(":")[1].strip()
    update = datetime.strptime(date_str, "%B %d, %Y")
    suffix = update.strftime("%Y%m%d")
    logger.debug("Last modified date = {}".format(suffix))

    outputs = []
    idx = 1
    while True:
        # table dataの取得
        table = bs.find(id="cpipress{}".format(idx))
        if table is None:
            break
        table_data = _read_cpi_table_to_list(table)
        # csvに保存
        save_path = save_dir / "cpi_table{:02d}_{}.csv".format(idx, suffix)
        if overwrite or not save_path.exists():
            with open(save_path, "w") as f:
                csv_writer = csv.writer(f)
                csv_writer.writerows(table_data)
            logger.info("Save table to {}".format(save_path))
            outputs.append(save_path)
        idx += 1
    return outputs


def _read_cpi_table_to_list(table: bs4.element.Tag) -> List[List[str]]:
    """https://www.bls.gov/news.release/cpi.htmからdownloadしてきたhtmlのtableをlistに格納する
    Args:
        table (bs4.element.Tag) :
    """
    # collect header file
    thead = table.find("thead")
    header = _read_cpi_header(thead)

    # collect table data
    tbody = table.find("tbody")
    data = _read_cpi_data(tbody, len(header[0]))
    return header + data


def _read_cpi_header(thead: bs4.element.Tag) -> List[List[str]]:
    """https://www.bls.gov/news.release/cpi.htmのtableのheaderを読み込み、Listに格納する
    Sample:
    ```
    table1 = bs.find(id="cpipress1")
    thead = table1.find("thead")
    read_header(thead)
    ```

    Args:
        thead (bs4.element.Tag) : tableのheader object.
    Return:
        header (List[List[str]]) : len(header) == headerの行数、len(header[0]) == headerの列数
    """
    header = [[]]  # headerの値
    for row, tr in enumerate(thead.find_all("tr")):
        offset = 0  # 現在の行までの(colspanの値 - 1)の合計
        for th in tr.find_all("th"):
            # rowspan, colspanの計算
            rspan = 1
            cspan = 1
            if "rowspan" in th.attrs:
                rspan = int(th["rowspan"])
            if "colspan" in th.attrs:
                cspan = int(th["colspan"])
            offset += cspan - 1
            # headerの値を格納
            while len(header) < row + rspan:
                header.append([])
            for r in range(row, row + rspan):
                for _ in range(cspan):
                    header[r].append(th.text)
    return header


def _read_cpi_data(tbody: bs4.element.Tag, max_col: int) -> List[List[str]]:
    """https://www.bls.gov/news.release/cpi.htmのtableのheaderを読み込み、Listに格納する
    Args:
        tbody (bs4.element.Tag) : tableのtbody
        max_col (int) : tableの列数
    """
    data = []
    for row, tr in enumerate(tbody.find_all("tr")):
        data.append(["" for _ in range(max_col)])
        if "class" in tr.attrs and tr["class"][0] == "sep":
            # separator行はスキップ
            continue
        # tableの階層をheaderのindent数で表現する
        th = tr.find("th")
        off = int(th.find("p")["class"][0].replace("sub", ""))
        data[row][0] = " " * off + th.text

        # データの取得
        offset = 0
        for col, td in enumerate(tr.find_all("td")):
            colspan = 1
            if "colspan" in td.attrs:
                colspan = int(td["colspan"])
            for ci in range(col + offset, col + offset + colspan):
                data[row][ci + 1] = td.text
            offset += colspan - 1
    return data


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-s",
                        "--save_dir",
                        help="Path to save dir",
                        default=str(PROJECT_ROOT / "data" / "index" / "cpi"))
    parser.add_argument("-u", "--url", help="URL", default=DEFAULT_URL)
    args = parser.parse_args()

    # download data
    save_dir = Path(args.save_dir)
    url = args.url
    outputs = save_cpi_table_datas(save_dir, url, overwrite=False)

    # upload to gdrive
    for fpath in outputs:
        stock.gdr.upload(fpath, CPI_FOLDER_GID)
