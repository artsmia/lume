#!/bin/bash


source ../config/.env

mysqldump -u $DB_LOCAL_USER -p$DB_LOCAL_PW -h $DB_LOCAL_HOST -P $DB_LOCAL_PORT --set-gtid-purged=OFF $DB_LOCAL_NAME > prodDB.sql

mysql -u $DB_PROD_USER -h $DB_PROD_HOST -p$DB_PROD_PW -P $DB_PROD_PORT $DB_PROD_NAME < prodDB.sql

rm -f prodDB.sql
