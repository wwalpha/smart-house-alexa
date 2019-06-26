locals {
  # -----------------------------------------------
  # Project Informations
  # -----------------------------------------------
  remote_init = "${data.terraform_remote_state.init.outputs}"

  project_name    = "${local.remote_init.project_name}"
  project_name_uc = "${local.remote_init.project_name_uc}"
  # region          = "${local.remote_init.region}"

  alexa_app_id = "${local.remote_init.alexa_app_id}"
  account_id   = "${data.aws_caller_identity.current.account_id}"
}

data "aws_caller_identity" "current" {}
