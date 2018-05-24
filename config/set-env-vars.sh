#! /bin/bash

TAG=$(echo $TRAVIS_COMMIT | cut -c1-6)

echo $TAG

if [$TRAVIS_BRANCH == 'production']
then
  echo "SUBDOMAIN=" >> ./config/.env.staging
elif [$TRAVIS_BRANCH == 'staging']
then
  echo "SUBDOMAIN=staging." >> ./config/.env.staging
else
  echo "SUBDOMAIN=$TAG." >> ./config/.env.staging
fi


echo "LUME_URL=https://$SUBDOMAINlume.space" >> ./config/.env.staging
echo "CMS_URL=https://$SUBDOMAINcms.lume.space" >> ./config/.env.staging
echo "API_URL=https://$SUBDOMAINapi.lume.space" >> ./config/.env.staging


export MY_TEST_VAR="hello there"
