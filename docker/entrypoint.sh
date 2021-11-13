#!/bin/bash

function run_as_user() {
    jupyter lab --ip='*' --port=5000 --no-browser --NotebookApp.token='' --notebook-dir=/home/`id -n -u`/work
}

/usr/sbin/sshd
RUN_AS_USER=$(declare -f run_as_user)
sudo -H -u ${USER_NAME} bash -c "${RUN_AS_USER}; run_as_user"
