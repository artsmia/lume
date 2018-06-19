#! /bin/bash

postToSlack(){
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$1\"}" https://hooks.slack.com/services/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

}


TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)


cp ./config/.env.staging ./config/.env.tag

echo "
LUME_URL=https://${TAG}.lume.space
CMS_URL=https://${TAG}.cms.lume.space
API_URL=https://${TAG}.api.lume.space
" >> ./config/.env.tag


deployApp(){
  APP_URL=$(now ./app -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.tag -T lume --force)
  now alias "${APP_URL}" "${TAG}.lume.space" -t $NOW_TOKEN -T lume
  now alias "${APP_URL}" "${TAG}.cms.lume.space" -t $NOW_TOKEN -T lume

}

deployApi(){
  API_URL=$(now ./data-api -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.tag -T lume --force)
  now alias "${API_URL}" "${TAG}.api.lume.space" -t $NOW_TOKEN -T lume
}

deployApp &
deployApi &
wait

postToSlack "App is now deployed at https://${TAG}.lume.space."
