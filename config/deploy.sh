#! /bin/bash

TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)

SUBDOMAIN="$TAG."
ENV_FILE="staging"

echo $TRAVIS_BRANCH


if [ $TRAVIS_BRANCH == "master" ]; then
  SUBDOMAIN=""
  ENV_FILE="production"
  BRANCH=""
else
  SUBDOMAIN="$TAG."
  ENV_FILE="staging"
  BRANCH="$TRAVIS_BRANCH."
fi

cp ./config/.env.$ENV_FILE ./config/.env

echo "
SUBDOMAIN=${SUBDOMAIN}
LUME_URL=https://${SUBDOMAIN}lume.space
CMS_URL=https://${SUBDOMAIN}cms.lume.space
API_URL=https://${SUBDOMAIN}api.lume.space
" >> ./config/.env

cd data-api
yarn install
yarn run prep-build
cd ..

deployApp(){
  cd app
  now -t $NOW_TOKEN --dotenv=../config/.env -T lume
  now alias "${SUBDOMAIN}lume.space" -t $NOW_TOKEN -T lume
  now alias "${SUBDOMAIN}cms.lume.space" -t $NOW_TOKEN -T lume
}

deployApi(){
  cd data-api
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env -T lume
  now alias "${SUBDOMAIN}api.lume.space" -t $NOW_TOKEN -T lume
}

# cd app
# now -t $NOW_TOKEN --dotenv=../config/.env -T lume
# now alias "${SUBDOMAIN}lume.space" -t $NOW_TOKEN -T lume
# now alias "${SUBDOMAIN}cms.lume.space" -t $NOW_TOKEN -T lume
# cd ../data-api
# yarn install
# yarn run prep-build
# now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env -T lume
# now alias "${SUBDOMAIN}api.lume.space" -t $NOW_TOKEN -T lume
# cd ..


deployApp &
deployApi &

wait

if [ $TRAVIS_BRANCH != 'master' ]; then

  rm -f ./config/.env
  cp ./config/.env.$ENV_FILE ./config/.env

  echo "
  SUBDOMAIN=${BRANCH}
  LUME_URL=https://${BRANCH}lume.space
  CMS_URL=https://${BRANCH}cms.lume.space
  API_URL=https://${BRANCH}api.lume.space
  " >>  ./config/.env

  cd app
  now -t $NOW_TOKEN --dotenv=../config/.env -T lume
  now alias "${BRANCH}lume.space" -t $NOW_TOKEN -T lume
  now alias "${BRANCH}cms.lume.space" -t $NOW_TOKEN -T lume
  cd ../data-api
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env -T lume
  now alias "${BRANCH}api.lume.space" -t $NOW_TOKEN -T lume
  cd ..
fi

echo "All done. :)"