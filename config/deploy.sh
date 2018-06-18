#! /bin/bash

makeEnvVars(){
  LUME_URL="https://${1}lume.space"
  CMS_URL="https://${1}cms.lume.space"
  API_URL="https://${1}api.lume.space"

}

deployApp(){
  makeEnvVars $1
  cd app
  now -t $NOW_TOKEN --dotenv=../config/.env.$2 -T lume -e LUME_URL -e CMS_URL -e API_URL
  now alias "${1}lume.space" -t $NOW_TOKEN -T lume
  now alias "${1}cms.lume.space" -t $NOW_TOKEN -T lume
  echo "App is now deployed at ${1}lume.space and ${1}cms.lume.space"

}

deployApi(){
  makeEnvVars $1
  cd data-api
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.$2 -T lume -e LUME_URL -e CMS_URL -e API_URL
  now alias "${1}api.lume.space" -t $NOW_TOKEN -T lume
  echo "Api is now deployed at ${1}api.lume.space"
}


cd data-api
yarn install
yarn run prep-build
cd ..



echo "Beginning deployment for branch:${TRAVIS_BRANCH}"


if [ $TRAVIS_BRANCH == "master" ]; then

  deployApp "" "production" &
  deployApi "" "production" &
  wait


else
  TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)

  deployApp "$TAG." "staging" &
  deployApi "$TAG." "staging" &
  deployApp $TRAVIS_BRANCH "staging" &
  deployApi $TRAVIS_BRANCH "staging" &
  wait
fi




echo "All done. :)"
