#! /bin/bash

TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)

echo $TRAVIS_BRANCH

SUBDOMAIN="$TAG."
ENV_FILE="staging"

if [ $TRAVIS_BRANCH == "production" ]; then
  SUBDOMAIN=""
  ENV_FILE="production"
elif [ $TRAVIS_BRANCH == "staging" ]; then
  SUBDOMAIN="staging."
  ENV_FILE="staging"
else
  SUBDOMAIN="$TAG."
  ENV_FILE="staging"
  BRANCH="$TRAVIS_BRANCH."
fi


echo "
SUBDOMAIN=${SUBDOMAIN}
LUME_URL=https://${SUBDOMAIN}lume.space
CMS_URL=https://${SUBDOMAIN}cms.lume.space
API_URL=https://${SUBDOMAIN}api.lume.space
" >> ./config/.env.$ENV_FILE

cp ./config/.env.$ENV_FILE ./config/.env


echo "
SUBDOMAIN=${BRANCH}
LUME_URL=https://${BRANCH}lume.space
CMS_URL=https://${BRANCH}cms.lume.space
API_URL=https://${BRANCH}api.lume.space
" >> ./config/.env.$ENV_FILE ./config/.env.branch


if [ $TRAVIS_BRANCH == 'team-switch' ]; then
  cd app
  now -t $NOW_TOKEN --dotenv=../config/.env.branch
  now alias "${BRANCH}lume.space" -t $NOW_TOKEN
  now alias "${BRANCH}cms.lume.space" -t $NOW_TOKEN
  cd ../data-api
  yarn install
  yarn run prep-build
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.branch
  now alias "${BRANCH}api.lume.space" -t $NOW_TOKEN
fi
