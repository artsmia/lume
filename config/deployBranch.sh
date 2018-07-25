#! /bin/bash

postToSlack(){
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$1\"}" https://hooks.slack.com/services/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

}


BRANCH="$TRAVIS_BRANCH"


cp ./config/.env.staging ./config/.env.branch

echo "
LUME_URL=https://${BRANCH}.lume.space
CMS_URL=https://${BRANCH}.cms.lume.space
API_URL=https://${BRANCH}.api.lume.space
" >> ./config/.env.branch


deployApp(){
  APP_URL=$(now ./app -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.branch -T lume --force)
  now alias "${APP_URL}" "${BRANCH}.lume.space" -t $NOW_TOKEN -T lume
  now alias "${APP_URL}" "${BRANCH}.cms.lume.space" -t $NOW_TOKEN -T lume

}

deployApi(){
  API_URL=$(now ./data-api -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.branch -T lume --force)
  now alias "${API_URL}" "${BRANCH}.api.lume.space" -t $NOW_TOKEN -T lume
}

deployApp &
deployApi &
wait

postToSlack "App is now deployed at https://${BRANCH}.lume.space."
