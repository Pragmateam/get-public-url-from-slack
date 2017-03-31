#!/usr/bin/env bash

set -e

root_dir=`pwd`;

brew install terraform

cd terraform
terraform init

cd $root_dir
