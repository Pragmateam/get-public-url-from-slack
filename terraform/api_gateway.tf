data "aws_caller_identity" "current" {}

resource "aws_api_gateway_rest_api" "get_public_url_api" {
  name = "get_public_url_from_slack"
  description = "Created by terraform"
}

resource "aws_api_gateway_resource" "get_public_url_api_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.get_public_url_api.id}"
  parent_id = "${aws_api_gateway_rest_api.get_public_url_api.root_resource_id}"
  path_part = "get-public-url-from-slack"
}

resource "aws_api_gateway_method" "get_public_url_api_method" {
  rest_api_id = "${aws_api_gateway_rest_api.get_public_url_api.id}"
  resource_id = "${aws_api_gateway_resource.get_public_url_api_resource.id}"
  http_method = "GET"
  authorization = "NONE"

  request_parameters = { "method.request.querystring.url" = true }
}

resource "aws_api_gateway_integration" "get_public_url_api_integration" {
  depends_on = ["aws_api_gateway_method.get_public_url_api_method"]

  rest_api_id = "${aws_api_gateway_rest_api.get_public_url_api.id}"
  resource_id = "${aws_api_gateway_resource.get_public_url_api_resource.id}"
  http_method = "${aws_api_gateway_method.get_public_url_api_method.http_method}"
  integration_http_method = "POST"
  type = "AWS"
  uri = "arn:aws:apigateway:ap-southeast-2:lambda:path/2015-03-31/functions/${aws_lambda_function.get_public_url_lambda.arn}/invocations"

  request_templates {
    "application/json" = <<EOF
{ "url": "$input.params('text')" }
EOF
  }
}

resource "aws_api_gateway_integration_response" "get_public_url_api_integration_response" {
  depends_on = ["aws_api_gateway_method.get_public_url_api_method", "aws_api_gateway_integration.get_public_url_api_integration"]

  rest_api_id = "${aws_api_gateway_rest_api.get_public_url_api.id}"
  resource_id = "${aws_api_gateway_resource.get_public_url_api_resource.id}"
  http_method = "${aws_api_gateway_method.get_public_url_api_method.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"
}

resource "aws_api_gateway_method_response" "200" {
  depends_on = ["aws_api_gateway_method.get_public_url_api_method"]

  rest_api_id = "${aws_api_gateway_rest_api.get_public_url_api.id}"
  resource_id = "${aws_api_gateway_resource.get_public_url_api_resource.id}"
  http_method = "${aws_api_gateway_method.get_public_url_api_method.http_method}"
  status_code = "200"

  response_models = { "text/plain" = "Empty" }
}

resource "aws_lambda_permission" "get_public_url_api_lambda_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.get_public_url_lambda.function_name}"
  principal = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:ap-southeast-2:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.get_public_url_api.id}/*/*/*"
}

resource "aws_api_gateway_deployment" "get_public_url_api_deployment" {
  depends_on = ["aws_api_gateway_integration.get_public_url_api_integration"]

  rest_api_id = "${aws_api_gateway_rest_api.get_public_url_api.id}"
  stage_name = "prod"
}
