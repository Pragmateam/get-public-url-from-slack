#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd terraform
terraform get
terraform apply -var slack_api_token=${SLACK_API_TOKEN}

cd $root_dir
