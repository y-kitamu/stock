#!/bin/bash
PATH=/home/kitamura/.local/bin${PATH:+:${PATH}}
cd /home/kitamura/work/stock
echo "Start notifiy_to_line.py"
ypoetry run python scripts/notify_to_line.py
echo "Finish notifiy_to_line.py"
