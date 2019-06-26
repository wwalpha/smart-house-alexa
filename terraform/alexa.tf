
// -----------------------------------------
// AWS Lambda Function
// -----------------------------------------
module "this" {
  providers = {
    aws = "aws.global"
  }
  source = "github.com/wwalpha/terraform-modules-lambda"

  filename         = "${data.archive_file.this.output_path}"
  source_code_hash = "${filebase64sha256("${data.archive_file.this.output_path}")}"

  function_name      = "${local.project_name_uc}-Alexa"
  handler            = "index.handler"
  runtime            = "nodejs10.x"
  memory_size        = 256
  timeout            = 10
  trigger_principal  = "alexa-connectedhome.amazon.com"
  trigger_source_arn = "${local.alexa_app_id}"
  # layers             = ["${local.xray}", "${local.moment}"]

  role_name = "${local.project_name_uc}-AlexaRole"
  role_policy_json = [
    "${data.aws_iam_policy_document.this.json}",
  ]

  # variables = {
  #   CALL_SLACK_FUNCTION = "PocketCards-M003"
  #   GROUPNAME_PREFIX    = "/aws/lambda/PocketCards"
  # }
}

# ------------------------------
# AWS Role Policy
# ------------------------------
data "aws_iam_policy_document" "this" {
  statement {
    actions = [
      "lambda:InvokeFunction",
    ]

    effect = "Allow"

    resources = [
      "*",
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
