#!/bin/bash

set -u

SCRIPT_DIR=$(cd $(dirname $0); pwd)
PROJECT_ROOT="${SCRIPT_DIR}/.."
CUR_DIR=$(pwd)

cd ${PROJECT_ROOT}

if [ -e ${HOME}/.poetry/bin/poetry ]; then
    ${HOME}/.poetry/bin/poetry install
    ${PROJECT_ROOT}/scripts/run.sh ${API_PORT}
else
    echo "poetry not found"
fi

cd ${CUR_DIR}
