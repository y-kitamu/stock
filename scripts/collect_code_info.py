"""collect_code_info.py

Author : Yusuke Kitamura
Create Date : 2023-02-11 21:55:21
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import json

import stock

if __name__ == "__main__":
    output_file = stock.PROJECT_ROOT / "tmp" / "output.json"
    res = stock.run_debug(stock.scraping.monex_scouter.run, [6098, 6099])

    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(res, f, indent=4)
