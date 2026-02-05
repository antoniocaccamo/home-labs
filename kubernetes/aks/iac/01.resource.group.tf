resource "random_string" "unique" {
  length  = 6
  special = false
  upper   = false
}

resource "azurerm_resource_group" "rg-home-lab" {
  name     = "rg-${local.base_name}"
  location = local.location
  
  tags = merge(
    local.common_tags
  )
}

resource "azurerm_user_assigned_identity" "mi-home-lab" {
  name                = "mi-${local.base_name}"
  location            = azurerm_resource_group.rg-home-lab.location
  resource_group_name = azurerm_resource_group.rg-home-lab.name

  tags = merge(
    local.common_tags
  )

}
