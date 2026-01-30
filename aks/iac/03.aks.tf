resource "azurerm_kubernetes_cluster" "home-lab-aks" {
  name                = "aks-${local.base_name}"
  location            = azurerm_resource_group.rg-home-lab.location
  resource_group_name = azurerm_resource_group.rg-home-lab.name
  dns_prefix          = "home-lab-aks-${random_string.unique.result}"

  # Use the "Free" tier for the Control Plane to save costs
  sku_tier = "Free"

  default_node_pool {
    name       = "aksnodepool"
    node_count = 2
    # "Standard_B2s" is excellent for development/testing
    vm_size = "Standard_B2s" # "Standard_B2s" # Standard_DS2_v2 Standard_B4als_v2 Standard_B2s_v2
    os_sku = "AzureLinux3"
  }

  identity {
    type = "SystemAssigned"
  }

  oidc_issuer_enabled = true

  microsoft_defender {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.law-home-lab.id
  }

  oms_agent {
    msi_auth_for_monitoring_enabled = true
    log_analytics_workspace_id = azurerm_log_analytics_workspace.law-home-lab.id
  
  }

  depends_on = [
    azurerm_container_registry.home-lab-acr
  ]

  tags = merge(
    local.common_tags,
    {
      component = "aks"
    }
  )
}


resource "azurerm_role_assignment" "aks_to_acr" {
  principal_id                     = azurerm_kubernetes_cluster.home-lab-aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.home-lab-acr.id
  skip_service_principal_aad_check = true
}
