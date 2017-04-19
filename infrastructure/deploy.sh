#!/usr/bin/env bash

npm install
node ./infrastructure/claudiaDynamicSetup.js
./node_modules/.bin/claudia update --config claudia.json

# First time deploy
#./node_modules/.bin/claudia create \
#  --region ${AWS_REGION} \
#  --api-module index \
#  --name ${FUNCTION_NAME} \
#  --set-env SLACK_API_TOKEN=${SLACK_API_TOKEN}
