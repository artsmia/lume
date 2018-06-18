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
  makeEnvVars $1 $2 $3
  echo LUME_URL
  echo CMS_URL
  now -t $NOW_TOKEN --dotenv=../config/.env.$3 -T lume
  now alias "${1}lume.space" -t $NOW_TOKEN -T lume
  now alias "${1}cms.lume.space" -t $NOW_TOKEN -T lume
  echo "App is now deployed at ${1}lume.space and ${1}cms.lume.space"

}

deployApi(){
  cd data-api
  makeEnvVars $1 $2 $3
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.$3 -T lume 
  now alias "${1}api.lume.space" -t $NOW_TOKEN -T lume
  echo "Api is now deployed at ${1}api.lume.space"
}


cd data-api
yarn install
yarn run prep-build
cd ..



echo "Beginning deployment for branch:${TRAVIS_BRANCH}"


if [ $TRAVIS_BRANCH == "master" ]; then

  deployApp "" "production" "prod" &
  deployApi "" "production" "prod" &
  wait


else
  TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)

  deployApp "$TAG." "staging" "tag" &
  deployApi "$TAG." "staging" "tag" &
  deployApp "$TRAVIS_BRANCH." "staging" "branch" &
  deployApi "$TRAVIS_BRANCH." "staging" "branch" &
  wait
fi




echo "All done. :)"
