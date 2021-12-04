"""test_zip.py

Author : Yusuke Kitamura
Create Date : 2021-12-04 21:17:10
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import shutil

import stock


def test_zip(tmp_path):
    # prepare sample files
    zip_dir = tmp_path / "zip"
    sub0 = zip_dir / "sub0"
    sub1 = zip_dir / "sub1"
    sub0.mkdir(parents=True)
    sub1.mkdir(parents=True)
    txt_file0 = zip_dir / "sample.txt"
    txt_file0.write_text("foo")
    txt_file1 = sub0 / "foo.txt"
    txt_file1.write_text("sample")

    # zip file
    stock.zip.zip_directory(tmp_path / "tmp.zip", zip_dir)
    # rm original file
    shutil.rmtree(str(zip_dir))

    # unzip
    stock.zip.unzip(tmp_path / "tmp.zip", tmp_path)

    # check original files are recovered from zip file
    assert (zip_dir / "sub0").exists()
    assert (zip_dir / "sub1").exists() is False
    assert txt_file0.exists()
    assert txt_file0.read_text() == "foo"
    assert txt_file1.exists()
    assert txt_file1.read_text() == "sample"
