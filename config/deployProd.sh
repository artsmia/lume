#! /bin/bash


postToSlack(){
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$1\"}" https://hooks.slack.com/services/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

}

deployApp(){
  APP_URL=$(now ./app -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.production -T lume --force)
  now alias "${APP_URL}" "lume.space" -t $NOW_TOKEN -T lume
  now alias "${APP_URL}" "cms.lume.space" -t $NOW_TOKEN -T lume
}

deployApi(){
  API_URL=$(now ./data-api -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.production -T lume --force)
  now alias "${API_URL}" "api.lume.space" -t $NOW_TOKEN -T lume
}

deployApp &
deployApi &
wait


postToSlack "Production has been updated at https://lume.space."
