#!/bin/bash

STEMS=("stockdata-332410-704571e36294" "manex_login_id")


CERT_DIR=$(cd $(dirname $0); pwd)
read -p "Password: " LARGE_SECRET_PASSPHRASE

for stem in "${STEMS[@]}"; do
    gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
        --output ${CERT_DIR}/${stem}.json ${CERT_DIR}/${stem}.json.gpg
    echo "Decrypted ${stem}.json"
done
