"""test_downloader.py

Author : Yusuke Kitamura
Create Date : 2021-11-20 10:18:58
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from datetime import date, timedelta

import requests
import stock
from requests.models import Response
from stock.downloader import Downloader

RESPONSE_TEXT = """foo,bar,baz
2021-11-20,100,200
2021-11-21,200,300
2021-11-22,300,400
""".encode("utf-8")


def test_downloader_init(tmp_path):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    assert dl.timeout == timeout
    assert dl.interval == interval
    assert dl.save_dir == tmp_path
    assert dl.save_dir.exists()


def test_downloader_tick(tmp_path):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    for _ in range(4):
        last_time = dl.last_time
        dl.tick()
        assert dl.last_time - last_time >= interval


def test_downloader_dowenload(tmp_path, mocker):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    mocker.patch.object(stock.downloader.requests, "get", new=stub_requests_get)
    mocker.patch.object(stock.downloader.Downloader,
                        "is_need_update",
                        new=stub_downloader_is_need_update)
    df = dl.download("A", is_save=True)
    assert df["foo"][0] == "2021-11-20"
    assert df["foo"][1] == "2021-11-21"
    assert df["foo"][2] == "2021-11-22"
    assert df["bar"][0] == 100
    assert df["bar"][1] == 200
    assert df["bar"][2] == 300
    assert df["baz"][0] == 200
    assert df["baz"][1] == 300
    assert df["baz"][2] == 400

    assert (tmp_path / "A.csv").exists()


def test_downloader_download_no_need(tmp_path, mocker):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    mocker.patch.object(stock.downloader.Downloader,
                        "is_need_update",
                        new=stub_downloader_is_need_update2)
    df = dl.download("A", is_save=False)
    assert df["foo"][0] == "2021-11-20"
    assert df["foo"][1] == "2021-11-21"
    assert df["foo"][2] == "2021-11-22"
    assert df["bar"][0] == 100
    assert df["bar"][1] == 200
    assert df["bar"][2] == 300
    assert df["baz"][0] == 200
    assert df["baz"][1] == 300
    assert df["baz"][2] == 400


def test_downloader_download_fail(tmp_path, mocker):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    mocker.patch.object(stock.downloader.requests, "get", new=stub_requests_get_fail)
    mocker.patch.object(stock.downloader.Downloader,
                        "is_need_update",
                        new=stub_downloader_is_need_update)
    df = dl.download("A", is_save=True)
    assert df is None
    assert not (tmp_path / "A.csv").exists()


def test_downloader_download_error(tmp_path, mocker):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    mocker.patch.object(stock.downloader.requests, "get", new=stub_requests_get_error)
    mocker.patch.object(stock.downloader.Downloader,
                        "is_need_update",
                        new=stub_downloader_is_need_update)
    df = dl.download("A", is_save=True)
    assert df is None
    assert not (tmp_path / "A.csv").exists()


def test_donwloader_get_all(tmp_path, mocker):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)
    res = dl.get_all(tmp_path / "foo.csv")
    assert not res

    stock.logger.setLevel(20)
    csv_path = stock.PROJECT_ROOT / "data" / "code.csv"
    mocker.patch.object(stock.downloader.Downloader, "download", new=stub_downloader_download)
    res = dl.get_all(csv_path)
    stock.logger.setLevel(0)
    assert res


def test_downloader_is_need_update(tmp_path):
    timeout = 10
    interval = 2
    dl = Downloader(tmp_path, timeout=timeout, interval=interval)

    code = "foo"
    assert dl.is_need_update(code)

    csv_path = tmp_path / f"{code}.csv"
    with open(csv_path, 'w') as f:
        f.write(",Date,Foo\n")
    assert dl.is_need_update(code)

    today = date.today()
    latest = today - timedelta(days=max(0, today.weekday() - 4))
    latest_str = latest.strftime("%Y-%m-%d")
    with open(csv_path, 'a') as f:
        f.write(f"1,{latest_str},")
    assert not dl.is_need_update(code)


def stub_requests_get(url, headers=None, timeout=None):
    res = Response()
    res.url = url
    res.status_code = requests.codes.ok
    res.encoding = 'utf-8'
    res._content = RESPONSE_TEXT
    return res


def stub_requests_get_fail(url, headers=None, timeout=None):
    res = Response()
    res.status_code = requests.codes.teapot
    return res


def stub_requests_get_error(url, headers=None, timeout=None):
    raise Exception()


def stub_downloader_download(obj, ticker_symbol, is_save=True):
    return True


def stub_downloader_is_need_update(obj, code):
    return True


def stub_downloader_is_need_update2(obj, code):
    path = obj.get_output_csv_path(code)
    with open(path, 'w') as f:
        f.write(RESPONSE_TEXT.decode())
    return False
