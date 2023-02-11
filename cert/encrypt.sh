#!/bin/bash

STEMS=("stockdata-332410-704571e36294" "manex_login_id")

CUR_DIR=$(pwd)
CERT_DIR=$(cd $(dirname $0); pwd)

cd $CERT_DIR
for stem in "${STEMS[@]}"; do
    gpg --symmetric --cipher-algo AES256 ${stem}.json
    echo "Encrypted ${stem}.json"
done

cd $CUR_DIR
