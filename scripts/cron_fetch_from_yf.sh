#!/bin/bash
PATH=/home/kitamura/.local/bin${PATH:+:${PATH}}
cd /home/kitamura/work/stock
echo "Start fetch_data_from_yf.py"
poetry run python scripts/fetch_data_from_yf.py
echo "Finish fetch_data_from_yf.py"
