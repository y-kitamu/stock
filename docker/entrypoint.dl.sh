#!/bin/bash

function run_as_user() {
    HOMEDIR=/home/`id -n -u`
    if [ -e ${HOMEDIR}/.local/bin/poetry ]; then
        export PATH=${HOMEDIR}/.local/bin${PATH:+:${PATH}}
        # Avoid conflicting with host machine venv
        ~/.local/bin/poetry config virtualenvs.in-project false
        # poetry config
        cd ${PROJECT_ROOT} && poetry install
    fi
}

# start jupyter
RUN_AS_USER=$(declare -f run_as_user)
sudo -H -u ${USER_NAME} --preserve-env=PROJECT_ROOT bash -c "${RUN_AS_USER}; run_as_user"
# start sshd
/usr/sbin/sshd -D
