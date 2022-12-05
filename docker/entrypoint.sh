#!/bin/bash

function run_as_user() {
    HOMEDIR=/home/`id -n -u`
    if [ -e ${HOMEDIR}/.poetry/bin/poetry ]; then
        export PATH=${HOMEDIR}/.poetry/bin${PATH:+:${PATH}}
        # To avoid conflict with host machine venv
        ~/.poetry/bin/poetry config virtualenvs.in-project false
        # poetry config
        cd ${PROJECT_ROOT} && poetry install
        poetry run ipython kernel install --user --name=stock_dev
    fi

    jupyter lab --ip='*' --port=5000 --no-browser --NotebookApp.token='' --notebook-dir=/home/`id -n -u`/work
}

# start sshd
/usr/sbin/sshd
# start jupyter
RUN_AS_USER=$(declare -f run_as_user)
sudo -H -u ${USER_NAME} --preserve-env=PROJECT_ROOT bash -c "${RUN_AS_USER}; run_as_user"
