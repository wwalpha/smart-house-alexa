
// -----------------------------------------
// AWS Lambda Function
// -----------------------------------------
module "this" {
  source = "github.com/wwalpha/terraform-modules-lambda"

  filename         = "${data.archive_file.m001.output_path}"
  source_code_hash = "${filebase64sha256("${data.archive_file.m001.output_path}")}"

  function_name      = "${local.project_name_uc}-Alexa"
  handler            = "index.handler"
  runtime            = "nodejs10.x"
  memory_size        = 256
  timeout            = 10
  trigger_principal  = "alexa-connectedhome.amazon.com"
  trigger_source_arn = "${aws_cloudwatch_event_rule.m001.arn}"
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
data "aws_iam_policy_document" "m001_lambda" {
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
data "archive_file" "m001" {
  type        = "zip"
  source_file = "../build/m001/index.js"
  output_path = "../build/m001/index.zip"
}
