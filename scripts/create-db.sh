#!/usr/bin/env bash

source '../.env.local'

touch mysqlcreds.cnf
chmod 700 mysqlcreds.cnf
echo "[client]" >> mysqlcreds.cnf
echo "user=$DB_MASTER_USER" >> mysqlcreds.cnf
echo "password=$DB_MASTER_PASSWORD" >> mysqlcreds.cnf

mysql --defaults-extra-file=mysqlcreds.cnf -h "$DB_HOST" --enable-cleartext-plugin --user="$DB_MASTER_USER"<<EOFMYSQL

CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON $DB_NAME.* TO '$DB_USER'@'%';
EOFMYSQL

rm mysqlcreds.cnf