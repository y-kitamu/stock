#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <port>"
    exit 1
fi

PROJECT_ROOT=$(cd $(dirname $0)/..; pwd)
CUR_DIR=$(pwd)

cd ${PROJECT_ROOT}
${HOME}/.poetry/bin/poetry config virtualenvs.in-project false
${HOME}/.poetry/bin/poetry install
${HOME}/.poetry/bin/poetry run python stock/server/api.py --port $1

cd ${CUR_DIR}
