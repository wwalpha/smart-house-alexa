locals {
  # -----------------------------------------------
  # Project Informations
  # -----------------------------------------------

  project_name    = "${local.remote_init.project_name}"
  project_name_uc = "${local.remote_init.project_name_uc}"
  region          = "${local.remote_init.region}"
  account_id      = "${data.aws_caller_identity.current.account_id}"
}

data "aws_caller_identity" "current" {}
