
// -----------------------------------------
// AWS Lambda Function
// -----------------------------------------
module "this" {
  source = "github.com/wwalpha/terraform-modules-lambda"

  filename         = "${data.archive_file.this.output_path}"
  source_code_hash = "${filebase64sha256("${data.archive_file.this.output_path}")}"

  function_name      = "${local.project_name_uc}-Alexa1"
  handler            = "index.handler"
  runtime            = "nodejs10.x"
  memory_size        = 256
  timeout            = 10
  trigger_principal  = "alexa-connectedhome.amazon.com"
  trigger_source_arn = "${local.alexa_app_id}"
  # layers             = ["${local.xray}", "${local.moment}"]

  role_name = "${local.project_name_uc}-AlexaRole"
  role_policy_json = [
    "${data.aws_iam_policy_document.iot.json}",
    "${data.aws_iam_policy_document.dynamodb.json}",
  ]

  variables = {
    IOT_ENDPOINT  = "${local.iot_endpoint}"
    IOT_REGION    = "${local.iot_region}"
    TABLE_DEVICES = "${local.dynamodb_devices_name}"
    TABLE_STATUS  = "${local.dynamodb_status_name}"
  }
}

# ------------------------------
# AWS Role Policy
# ------------------------------
data "aws_iam_policy_document" "iot" {
  statement {
    actions = [
      "iot:Publish",
    ]

    effect = "Allow"

    resources = [
      "*",
    ]
  }
}


# -----------------------------------------------
# DynamoDB Access Policy
# -----------------------------------------------
data "aws_iam_policy_document" "dynamodb" {
  statement {
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:UpdateItem",
    ]

    effect = "Allow"

    resources = [
      "arn:aws:dynamodb:${local.region}:*:table/*/index/*",
      "arn:aws:dynamodb:${local.region}:*:table/*",
    ]
  }
}

// -----------------------------------------
// Lambda Function Module
// -----------------------------------------
data "archive_file" "this" {
  type        = "zip"
  source_file = "../build/index.js"
  output_path = "../build/index.zip"
}
