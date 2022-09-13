#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ENV_FILE="$SCRIPT_DIR/../.env.local" 

DB_MASTER_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64)
DB_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64)

echo "DB_MASTER_PASSWORD=$DB_MASTER_PASSWORD" >> ${ENV_FILE}
echo "DB_PASSWORD=$DB_PASSWORD" >> ${ENV_FILE}

sudo mysql --database="mysql" --execute="ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"