variable "region" {
  "default" = "ap-southeast-2"
}

provider "aws" {
  region = "${var.region}"
}

# The backend configuration is loaded by Terraform extremely early, before
# the core of Terraform can be initialized. This is necessary because the backend
# dictates the behavior of that core. The core is what handles interpolation
# processing. Because of this, interpolations cannot be used in backend
# configuration.

# More details backends are available at https://www.terraform.io/docs/backends

# You have to replace the bucket name in order to playaround with terraform
terraform {
  backend "s3" {
    bucket = "pragmateam-terraform-state-prod"
    key = "terraform.tfstate"
    region= "ap-southeast-2"
  }
}
