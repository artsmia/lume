#! /bin/bash


postToSlack(){
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$1\"}" https://hooks.slack.com/services/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

}

deployApp(){
  cd app
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.production -T lume --force
  now alias "lume.space" -t $NOW_TOKEN -T lume
  now alias "cms.lume.space" -t $NOW_TOKEN -T lume
  cd ..

}

deployApi(){
  cd data-api
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.production -T lume --force
  now alias "api.lume.space" -t $NOW_TOKEN -T lume
  cd ..
}

deployApp &
deployApi &
wait


postToSlack "Production has been updated at https://lume.space."
