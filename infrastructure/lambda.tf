variable "slack_api_token" {}
variable "get_public_url_s3_bucket" {}

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

resource "aws_iam_role_policy" "get_public_url_role_policy" {
  name = "get_public_url_role_policy"
  role = "${aws_iam_role.iam_for_get_public_url_lambda.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${aws_lambda_function.get_public_url_lambda.function_name}:*"
      ]
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "lambdas_bucket" {
  bucket = "${var.get_public_url_s3_bucket}-lambdas"
  acl = "private"
}

resource "aws_s3_bucket_object" "get_public_url_object" {
  bucket = "${aws_s3_bucket.lambdas_bucket.bucket}"
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
