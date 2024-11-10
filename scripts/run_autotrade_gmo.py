"""run_autotrade_gmo.py
"""

import argparse
import queue
from pathlib import Path

from pydantic import BaseModel

import stock


class APICert(BaseModel):
    api_key: str
    api_secret: str


def run(cert_file: Path):
    with open(cert_file, "r") as f:
        APICert.model_validate_json(f.read())


if __name__ == "__main__":
    CERT_FILE = stock.PROJECT_ROOT / "cert" / "gmo_api.json"
    parser = argparse.ArgumentParser()
    parser.add_argument("--cert", type=Path, default=CERT_FILE)

    args = parser.parse_args()
    run(args.cert)
