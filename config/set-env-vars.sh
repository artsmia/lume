#! /bin/bash

TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)




if [$TRAVIS_BRANCH == 'production']
then
  SUBDOMAIN=""
  ENV_FILE='production'
elif [$TRAVIS_BRANCH == 'staging']
then
  SUBDOMAIN="staging."
  ENV_FILE='staging'
else
  SUBDOMAIN="$TAG."
  ENV_FILE='staging'
fi


echo "
SUBDOMAIN=${SUBDOMAIN}.
LUME_URL=https://${SUBDOMAIN}lume.space
CMS_URL=https://${SUBDOMAIN}cms.lume.space
API_URL=https://${SUBDOMAIN}api.lume.space
" >> ./config/.env.$ENV_FILE

cp ./config/.env.$ENV_FILE ./config/.env
