// -----------------------------------------
// Backend
// -----------------------------------------
terraform {
  backend "s3" {
    bucket = "terraform-backend-xxx"
    region = "ap-northeast-1"
    key    = "smart-house/alexa.tfstate"
  }

  required_version = ">= 0.12"
}

// -----------------------------------------
// Provider
// -----------------------------------------
provider "aws" {
  region                  = "${var.region}"
  profile                 = "${var.aws_profile}"
  shared_credentials_file = "${var.shared_credentials_file}"
}

// -----------------------------------------
// Project Information
// -----------------------------------------
data "terraform_remote_state" "init" {
  backend = "s3"

  config = {
    bucket = "terraform-backend-xxx"
    region = "ap-northeast-1"
    key    = "smart-house/init.tfstate"
  }
}
