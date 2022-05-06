#!/bin/sh

CERT_DIR=$(dirname ${BASH_SOURCE[0]})
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
    --output ${CERT_DIR}/stockdata-332410-704571e36294.json ${CERT_DIR}/stockdata-332410-704571e36294.json.gpg
