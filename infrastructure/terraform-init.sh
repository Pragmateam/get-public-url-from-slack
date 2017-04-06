#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd infrastructure
terraform init

cd $root_dir
