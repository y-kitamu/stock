"""zip.py

Author : Yusuke Kitamura
Create Date : 2021-12-04 17:36:10
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import zipfile
from pathlib import Path

from stock import PROJECT_ROOT, logger
from stock.downloader import STOCK_DATA_FILENAME


def zip_directory(zip_path: Path, src_path: Path):
    """`src_path`以下のファイルをzipで圧縮する.
    Args:
        zip_path (Path) : Path to output zip file.
        src_path (Path) : Path to input direcotry.
    """
    with zipfile.ZipFile(zip_path, 'w') as f:
        for path in src_path.glob('**/*'):
            if path.is_file():
                f.write(path, arcname=str(path.relative_to(src_path.parent)))
    logger.info("Create zip file : {} from {}".format(str(zip_path), str(src_path)))


def unzip(zip_path: Path, output_path: Path):
    """`zip_path`のzipファイルを解凍し、`output_path`以下に出力する
    Args:
        zip_path (Path) : Path to zip file.
        output_path (Path) : Path to output directory.
    """
    output_path.mkdir(exist_ok=True, parents=True)
    with zipfile.ZipFile(zip_path, 'r') as f:
        f.extractall(output_path)


if __name__ == "__main__":
    import argparse

    import stock

    parser = argparse.ArgumentParser()
    parser.add_argument("-s", "--save_dir", default=str(PROJECT_ROOT / "data" / "stock"))
    args = parser.parse_args()
    save_dir = Path(args.save_dir)

    zip_file = stock.gdr.download(STOCK_DATA_FILENAME, save_dir.parents[1])
    unzip(zip_file, save_dir.parent)
