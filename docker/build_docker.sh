#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
CUR_DIR=$(pwd)

USER_ID=$(id -u)
GROUP_ID=$(id -g)
USER=$(id -u ${USER_ID} -n)

cd ${SCRIPT_DIR}
# docker-compose build --build-arg uid=${USER_ID} --build-arg gid=${GROUP_ID} --build-arg user=${USER}
# docker-compose build\
#                --build-arg uid=${USER_ID} --build-arg gid=${GROUP_ID} --build-arg user=${USER}
# docker-compose -f docker-compose.deploy.yml build\
    #                --build-arg uid=${USER_ID} --build-arg gid=${GROUP_ID} --build-arg user=${USER}
docker compose -f docker-compose.dl.yml build\
                   --build-arg uid=${USER_ID} --build-arg gid=${GROUP_ID} --build-arg user=${USER}

cd ${CUR_DIR}
