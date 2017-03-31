provider "aws" {
  region  = "ap-southeast-2"
}

terraform {
  backend "s3" {
    bucket = "pragmateam-terraform-state-prod"
    key    = "terraform.tfstate"
    region  = "ap-southeast-2"
  }
}

resource "aws_iam_role" "iam_for_get_public_url_lambda" {
  name = "iam_for_get_public_url_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

variable "slack_api_token" {}

resource "aws_s3_bucket" "pragmateam_lambdas_bucket" {
  bucket = "pragmateam-lambdas"
  acl = "private"
}

resource "aws_s3_bucket_object" "get_public_url_object" {
  bucket = "${aws_s3_bucket.pragmateam_lambdas_bucket.bucket}"
  key = "get_public_url_lambda"
  source = "../get_public_url_lambda.zip"
  etag = "${md5(file("../get_public_url_lambda.zip"))}"
}

resource "aws_lambda_function" "get_public_url_lambda" {
  function_name = "get_public_url"
  s3_bucket = "${aws_s3_bucket_object.get_public_url_object.bucket}"
  s3_key = "${aws_s3_bucket_object.get_public_url_object.key}"
  description = "Return a slack public link."
  role = "${aws_iam_role.iam_for_get_public_url_lambda.arn}"
  handler = "index.handler"
  runtime = "nodejs6.10"

  environment {
    variables = {
      SLACK_API_TOKEN = "${var.slack_api_token}"
    }
  }
}
