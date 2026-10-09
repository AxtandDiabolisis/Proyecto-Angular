#!/bin/sh
set -eu

if [ -n "${JWT_SECRET_KEY_FILE:-}" ]; then
    test -r "$JWT_SECRET_KEY_FILE"
    install -m 0400 "$JWT_SECRET_KEY_FILE" /tmp/jwt_secret
    chown app:app /tmp/jwt_secret
    export JWT_SECRET_KEY_FILE=/tmp/jwt_secret
fi

exec gosu app "$@"
