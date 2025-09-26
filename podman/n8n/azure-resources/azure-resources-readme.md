# Azure Resource Lister

A TypeScript project that lists and analyzes Azure resources in your subscription using the Azure SDK.

## Features

- ✅ List all Azure resources in a subscription
- 📊 Group resources by type and resource group
- 🏷️ Display resource tags and metadata
- 📈 Generate summary statistics
- 🔍 Filter resources by type, location, or tags
- 🔐 Multiple authentication methods supported

## Prerequisites

- Node.js 16+ and npm
- Azure subscription
- Azure authentication (one of the following):
  - Azure CLI (`az login`)
  - Service Principal credentials
  - Managed Identity (if running on Azure)
  - Visual Studio Code Azure extension

## Installation

1. Clone or create the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file and configure:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set your Azure subscription ID:
   ```bash
   AZURE_SUBSCRIPTION_ID=your-subscription-id-here
   ```

## Authentication Setup

### Method 1: Azure CLI (Recommended for development)
```bash
az login
```

### Method 2: Service Principal
Set these environment variables in your `.env` file:
```bash
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
AZURE_SUBSCRIPTION_ID=your-subscription-id
```

### Method 3: Managed Identity
If running on Azure (VM, App Service, etc.), no additional configuration needed.

## Usage

### Development
```bash
npm run dev
```

### Build and Run
```bash
npm run build
npm start
```

### Clean Build
```bash
npm run clean
npm run build
```

## Output

The tool provides:

1. **Resources by Type** - Groups all resources by their Azure resource type
2. **Resources by Resource Group** - Shows resources organized by resource group
3. **Summary Statistics** - Total counts, top resource types, and regions

Example output:
```
🔍 Fetching Azure resources...

📊 Found 25 resources:

🏷️  RESOURCES BY TYPE
============================================================

📦 Microsoft.Compute/virtualMachines (3)
----------------------------------------
  • vm-web-01 (rg-production) - eastus
  • vm-db-01 (rg-production) - eastus [2 tags]
  • vm-test-01 (rg-development) - westus2

📁 RESOURCES BY RESOURCE GROUP
============================================================

📁 rg-production (15 resources)
----------------------------------------
  • app-service-web (Microsoft.Web/sites) - eastus
  • sql-database-prod (Microsoft.Sql/servers/databases) - eastus [3 tags]
  ...

📈 SUMMARY
============================================================
Total Resources: 25
Unique Resource Types: 8
Resource Groups: 3
Azure Regions: 2

Top 5 Resource Types:
  Microsoft.Storage/storageAccounts: 5
  Microsoft.Compute/virtualMachines: 3
  Microsoft.Web/sites: 3
  ...
```

## API Usage

You can also use the `AzureResourceLister` class programmatically:

```typescript
import { DefaultAzureCredential } from '@azure/identity';
import { ResourceManagementClient } from '@azure/arm-resources';
import { AzureResourceLister } from './src/resourceLister';

const credential = new DefaultAzureCredential();
const client = new ResourceManagementClient(credential, subscriptionId);
const lister = new AzureResourceLister(client);

// Get all resources
const resources = await lister.listAllResources();

// Filter by type
const vms = lister.filterResourcesByType(resources, 'Microsoft.Compute/virtualMachines');

// Filter by location
const eastUsResources = lister.filterResourcesByLocation(resources, 'eastus');

// Filter by tags
const prodResources = lister.filterResourcesByTag(resources, 'environment', 'production');
```

## Required Permissions

Your Azure identity needs the following permissions:
- `Reader` role on the subscription or resource groups you want to query
- Or custom role with `Microsoft.Resources/subscriptions/resources/read` permission

## Dependencies

- **@azure/arm-resources**: Azure Resource Management client
- **@azure/identity**: Azure authentication library
- **dotenv**: Environment variable loader
- **typescript**: TypeScript compiler
- **ts-node**: TypeScript execution engine

## Troubleshooting

### Authentication Issues
- Ensure you're logged in via `az login` or have valid service principal credentials
- Check that your subscription ID is correct
- Verify your account has Reader permissions on the subscription

### No Resources Found
- Verify the subscription ID is correct
- Check if you have Reader permissions
- Ensure there are actually resources in the subscription

### Build Issues
- Make sure you're using Node.js 16+
- Delete `node_modules` and `package-lock.json`, then run `npm install`

## License

MIT License - feel free to modify and use as needed.