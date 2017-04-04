variable "region" {
  "default" = "ap-southeast-2"
}

provider "aws" {
  region = "${var.region}"
}

terraform {
  backend "s3" {
    bucket = "pragmateam-terraform-state-prod"
    key = "terraform.tfstate"
    region= "ap-southeast-2"
  }
}
