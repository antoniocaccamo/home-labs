resource "azurerm_container_registry" "home-lab-acr" {
  name                = "home-lab-acr-${random_string.unique.result}" # Must be globally unique
  resource_group_name = azurerm_resource_group.rg-home-lab.name
  location            = azurerm_resource_group.rg-home-lab.location
  sku                 = "Basic"
  admin_enabled       = false

  tags = local.common_tags
}