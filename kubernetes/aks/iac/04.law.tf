resource "azurerm_log_analytics_workspace" "law-home-lab" {
  name                = "law-${local.base_name}"
  location            = azurerm_resource_group.rg-home-lab.location
  resource_group_name = azurerm_resource_group.rg-home-lab.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}