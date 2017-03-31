#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd terraform
terraform get
terraform destroy -var slack_api_token=${SLACK_API_TOKEN} -force

cd $root_dir
