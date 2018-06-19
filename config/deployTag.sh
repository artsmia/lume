#! /bin/bash

postToSlack(){
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$1\"}" https://hooks.slack.com/services/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

}


TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)


cp ./config/.env.staging ./config/.env.tag

echo "
LUME_URL=https://${2}.lume.space
CMS_URL=https://${2}.cms.lume.space
API_URL=https://${2}.api.lume.space
" >> ./config/.env.tag


deployApp(){
  now ./app -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.tag -T lume --force && now alias "${TAG}.lume.space" -t $NOW_TOKEN -T lume && now alias "${TAG}.cms.lume.space" -t $NOW_TOKEN -T lume

}

deployApi(){
  now ./data-api -e NODE_ENV=production -t $NOW_TOKEN --dotenv=./config/.env.tag -T lume --force && now alias "${tag}.api.lume.space" -t $NOW_TOKEN -T lume
}

deployApp &
deployApi &
wait

postToSlack "App is now deployed at https://${TAG}.lume.space."
