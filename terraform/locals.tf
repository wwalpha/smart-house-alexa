locals {
  # -----------------------------------------------
  # Project Informations
  # -----------------------------------------------
  remote_init = "${data.terraform_remote_state.init.outputs}"

  region          = "${data.aws_region.current.name}"
  project_name    = "${local.remote_init.project_name}"
  project_name_uc = "${local.remote_init.project_name_uc}"
  alexa_app_id    = "${local.remote_init.alexa_app_id}"
  iot_endpoint    = "${local.remote_init.iot_endpoint}"
  iot_region      = "${local.remote_init.region}"

  account_id = "${data.aws_caller_identity.current.account_id}"

  # -----------------------------------------------
  # Dynamodb
  # -----------------------------------------------
  dynamodb_devices_name = "${local.remote_init.dynamodb_devices_name}"
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}
