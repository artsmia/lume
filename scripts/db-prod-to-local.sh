#!/bin/bash


source ../config/.env

mysqldump -u $DB_PROD_USER -p$DB_PROD_PW -h $DB_PROD_HOST -P $DB_PROD_PORT --set-gtid-purged=OFF $DB_PROD_NAME > prodDB.sql

mysql -u $DB_LOCAL_USER -h $DB_LOCAL_HOST -P $DB_LOCAL_PORT $DB_LOCAL_NAME < prodDB.sql

rm -f prodDB.sql
