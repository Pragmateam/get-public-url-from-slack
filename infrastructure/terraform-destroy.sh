#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd infrastructure

terraform get
terraform destroy \
  -var slack_api_token=${SLACK_API_TOKEN} \
  -var get_public_url_s3_bucket=${GET_PUBLIC_URL_S3_BUCKET} \
  -force

cd $root_dir
