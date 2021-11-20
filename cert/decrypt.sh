#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
    --output stockdata-332410-704571e36294.json stockdata-332410-704571e36294.json.gpg
