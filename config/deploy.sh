#! /bin/bash


makeEnvVars(){
  cp ./config/.env.$2 ./config/.env.$3

  echo "
  LUME_URL=https://${1}lume.space
  CMS_URL=https://${1}cms.lume.space
  API_URL=https://${1}api.lume.space
  " >> ./config/.env.$3

}

deployApp(){
  cd app
  SUBDOMAIN="${1}"
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env$2 -T lume
  now alias "${SUBDOMAIN}lume.space" -t $NOW_TOKEN -T lume
  now alias "${SUBDOMAIN}cms.lume.space" -t $NOW_TOKEN -T lume
  echo "App is now deployed at ${1}lume.space and ${1}cms.lume.space"

}

deployApi(){
  cd data-api
  SUBDOMAIN="${1}"
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env$2 -T lume
  now alias "${SUBDOMAIN}api.lume.space" -t $NOW_TOKEN -T lume
  echo "Api is now deployed at ${SUBDOMAIN}api.lume.space"
}

deploy(){
  deployApp $1 $2 &
  deployApi $1 $2 &
  wait
}


cd data-api
yarn install
yarn run prep-build
cd ..



echo "Beginning deployment for branch:${TRAVIS_BRANCH}"


if [ $TRAVIS_BRANCH == "master" ]; then

  deploy "" '.production'


else
  TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)
  makeEnvVars "$TAG." "staging" "tag"
  makeEnvVars "$TRAVIS_BRANCH." "staging" "branch"
  deploy "$TAG." ".tag" &
  deploy "$TRAVIS_BRANCH." ".branch" &
  wait
fi




echo "All done. :)"
