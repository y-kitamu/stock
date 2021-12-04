"""test_gdr.py

Author : Yusuke Kitamura
Create Date : 2021-12-04 20:44:10
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from pathlib import Path

import pytest
import stock
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from stock.gdr import GDRException


def test_get_service(tmp_path):
    test_path = Path(__file__).parents[1] / "testdata"
    try:
        stock.gdr.get_service(test_path)
        assert False
    except:
        assert True

    try:
        stock.gdr.get_service(tmp_path)
    except Exception:
        assert True

    service = stock.gdr.get_service(stock.PROJECT_ROOT)
    service.close()


def test_get_quota():
    limit, used = stock.gdr.get_quota()
    assert limit >= used


def test_upload_download_delete(tmp_path):
    sample: Path = tmp_path / "test_stock_gdr_sample.txt"
    sample.write_text("content")

    # upload file
    fid = stock.gdr.upload(sample)
    sample.rename(tmp_path / "base.txt")

    # download file
    down = stock.gdr.download(sample.name, tmp_path)
    assert down.name == "test_stock_gdr_sample.txt"
    assert down.read_text() == "content"

    # delete file
    delete_ids = stock.gdr.delete_file(down.name)
    assert fid in delete_ids


def test_download(tmp_path):
    try:
        stock.gdr.download(str(tmp_path), tmp_path)
    except GDRException:
        assert True
    except:
        assert False


def test_delete_all(mocker):
    """
    """
    mocker.patch.object(stock.gdr, "get_service", new=stub_get_service)
    res = stock.gdr.delete_all()
    assert len(res) == 0


class FilesMock:

    def __init__(self):
        cert_file = stock.PROJECT_ROOT / stock.gdr.CERT_FILE
        # setup google drive api
        if not cert_file.exists():
            raise GDRException("Cert file does not exist : {}".format(cert_file))
        creds = ServiceAccountCredentials.from_json_keyfile_name(cert_file)
        if creds.invalid:
            raise GDRException("Credential is invalid : {}".format(cert_file))
        self.service = build('drive', 'v3', credentials=creds)

    def get(self, key, default):
        return default

    def list(self, *args, **kwargs):
        return self

    def execute(self):
        return self

    def files(self):
        return self

    def new_batch_http_request(self):
        return self.service.new_batch_http_request()


def stub_get_service():
    return FilesMock()
