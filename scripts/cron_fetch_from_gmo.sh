#!/bin/bash
PATH=/home/kitamura/.local/bin${PATH:+:${PATH}}
cd /home/kitamura/work/stock
echo "Start fetch_data_from_gmo.py"
poetry run python scripts/fetch_data_from_gmo.py
echo "Finish fetch_data_from_gmo.py"
