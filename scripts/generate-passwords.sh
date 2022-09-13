#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ENV_FILE="$SCRIPT_DIR/../.env.local"

source $ENV_FILE

DB_MASTER_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64)
DB_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64)
JWT_SS=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64)

echo "DB_MASTER_PASSWORD=$DB_MASTER_PASSWORD" >> ${ENV_FILE}
echo "DB_PASSWORD=$DB_PASSWORD" >> ${ENV_FILE}
echo "JWT_SS=$JWT_SS" >> ${ENV_FILE}

echo "DATABASE_URL=\"mysql://$DB_USER:$DB_PASSWORD@$DB_HOST:3306/$DB_NAME?schema=public\"" >> ${ENV_FILE}

echo "Randomly generated passwords successfully added to the .env.local file"