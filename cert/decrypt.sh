#!/bin/sh

CERT_DIR=$(cd $(dirname $0); pwd)
read -sp "Password: " LARGE_SECRET_PASSPHRASE
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
    --output ${CERT_DIR}/stockdata-332410-704571e36294.json ${CERT_DIR}/stockdata-332410-704571e36294.json.gpg
