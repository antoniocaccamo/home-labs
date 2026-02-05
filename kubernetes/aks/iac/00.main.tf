data "azurerm_client_config" "current" {}



locals {
  base_name     = "home-lab"
  location      = "northeurope"
  tenant_id     = data.azurerm_client_config.current.tenant_id
  support_name  = "antonio caccamo"
  support_email = "caccamo.antonio.@gmail.com"
  common_tags = {
    env       = "development"
    #container = "aks"
    project   = "home-lab"
    source    = "terraform"
  }
}


