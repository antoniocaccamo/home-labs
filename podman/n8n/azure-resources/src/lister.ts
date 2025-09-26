// import { ResourceManagementClient } from '@azure/arm-resources';
// import { GenericResource } from '@azure/arm-resources';

// export interface ResourceInfo {
//   name: string;
//   type: string;
//   resourceGroup: string;
//   location: string;
//   id: string;
//   tags?: { [key: string]: string };
// }

// export class AzureResourceLister {
//   private client: ResourceManagementClient;

//   constructor(client: ResourceManagementClient) {
//     this.client = client;
//   }

//   /**
//    * List all resources in the subscription
//    */
//   async listAllResources(): Promise<ResourceInfo[]> {
//     const resources: ResourceInfo[] = [];
    
//     try {
//       for await (const resource of this.client.resources.list()) {
//         if (resource.name && resource.type && resource.resourceGroup && resource.location) {
//           resources.push({
//             name: resource.name,
//             type: resource.type,
//             resourceGroup: resource.resourceGroup,
//             location: resource.location,
//             id: resource.id || '',
//             tags: resource.tags
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error listing resources:', error);
//       throw error;
//     }
    
//     return resources.sort((a, b) => a.name.localeCompare(b.name));
//   }

//   /**
//    * List resources by resource group
//    */
//   async listResourcesByResourceGroup(resourceGroupName: string): Promise<ResourceInfo[]> {
//     const resources: ResourceInfo[] = [];
    
//     try {
//       for await (const resource of this.client.resources.listByResourceGroup(resourceGroupName)) {
//         if (resource.name && resource.type && resource.location) {
//           resources.push({
//             name: resource.name,
//             type: resource.type,
//             resourceGroup: resourceGroupName,
//             location: resource.location,
//             id: resource.id || '',
//             tags: resource.tags
//           });
//         }
//       }
//     } catch (error) {
//       console.error(`Error listing resources in resource group ${resourceGroupName}:`, error);
//       throw error;
//     }
    
//     return resources.sort((a, b) => a.name.localeCompare(b.name));
//   }

//   /**
//    * Display resources grouped by type
//    */
//   async displayResourcesByType(resources: ResourceInfo[]): Promise<void> {
//     const groupedByType = this.groupResourcesByType(resources);
    
//     console.log('🏷️  RESOURCES BY TYPE');
//     console.log('='.repeat(60));
    
//     for (const [type, typeResources] of Object.entries(groupedByType)) {
//       console.log(`\n📦 ${type} (${typeResources.length})`);
//       console.log('-'.repeat(40));
      
//       typeResources.forEach(resource => {
//         const tags = resource.tags ? ` [${Object.keys(resource.tags).length} tags]` : '';
//         console.log(`  • ${resource.name} (${resource.resourceGroup}) - ${resource.location}${tags}`);
//       });
//     }
//   }

//   /**
//    * Display resources grouped by resource group
//    */
//   async displayResourcesByResourceGroup(resources: ResourceInfo[]): Promise<void> {
//     const groupedByRG = this.groupResourcesByResourceGroup(resources);
    
//     for (const [rgName, rgResources] of Object.entries(groupedByRG)) {
//       console.log(`\n📁 ${rgName} (${rgResources.length} resources)`);
//       console.log('-'.repeat(40));
      
//       rgResources.forEach(resource => {
//         const tags = resource.tags ? ` [${Object.keys(resource.tags).length} tags]` : '';
//         console.log(`  • ${resource.name} (${resource.type}) - ${resource.location}${tags}`);
//       });
//     }
//   }

//   /**
//    * Display summary statistics
//    */
//   displaySummary(resources: ResourceInfo[]): void {
//     const totalResources = resources.length;
//     const resourceTypes = new Set(resources.map(r => r.type)).size;
//     const resourceGroups = new Set(resources.map(r => r.resourceGroup)).size;
//     const locations = new Set(resources.map(r => r.location)).size;
    
//     console.log(`Total Resources: ${totalResources}`);
//     console.log(`Unique Resource Types: ${resourceTypes}`);
//     console.log(`Resource Groups: ${resourceGroups}`);
//     console.log(`Azure Regions: ${locations}`);
    
//     // Most common resource types
//     const typeCounts = this.getResourceTypeCounts(resources);
//     const topTypes = Object.entries(typeCounts)
//       .sort(([, a], [, b]) => b - a)
//       .slice(0, 5);
    
//     if (topTypes.length > 0) {
//       console.log('\nTop 5 Resource Types:');
//       topTypes.forEach(([type, count]) => {
//         console.log(`  ${type}: ${count}`);
//       });
//     }
    
//     // Resources by location
//     const locationCounts = this.getResourceLocationCounts(resources);
//     const topLocations = Object.entries(locationCounts)
//       .sort(([, a], [, b]) => b - a)
//       .slice(0, 5);
    
//     if (topLocations.length > 0) {
//       console.log('\nTop 5 Azure Regions:');
//       topLocations.forEach(([location, count]) => {
//         console.log(`  ${location}: ${count}`);
//       });
//     }
//   }

//   /**
//    * Group resources by type
//    */
//   private groupResourcesByType(resources: ResourceInfo[]): { [type: string]: ResourceInfo[] } {
//     return resources.reduce((groups, resource) => {
//       const type = resource.type;
//       if (!groups[type]) {
//         groups[type] = [];
//       }
//       groups[type].push(resource);
//       return groups;
//     }, {} as { [type: string]: ResourceInfo[] });
//   }

//   /**
//    * Group resources by resource group
//    */
//   private groupResourcesByResourceGroup(resources: ResourceInfo[]): { [rg: string]: ResourceInfo[] } {
//     return resources.reduce((groups, resource) => {
//       const rg = resource.resourceGroup;
//       if (!groups[rg]) {
//         groups[rg] = [];
//       }
//       groups[rg].push(resource);
//       return groups;
//     }, {} as { [rg: string]: ResourceInfo[] });
//   }

//   /**
//    * Get count of each resource type
//    */
//   private getResourceTypeCounts(resources: ResourceInfo[]): { [type: string]: number } {
//     return resources.reduce((counts, resource) => {
//       counts[resource.type] = (counts[resource.type] || 0) + 1;
//       return counts;
//     }, {} as { [type: string]: number });
//   }

//   /**
//    * Get count of resources by location
//    */
//   private getResourceLocationCounts(resources: ResourceInfo[]): { [location: string]: number } {
//     return resources.reduce((counts, resource) => {
//       counts[resource.location] = (counts[resource.location] || 0) + 1;
//       return counts;
//     }, {} as { [location: string]: number });
//   }

//   /**
//    * Filter resources by type
//    */
//   filterResourcesByType(resources: ResourceInfo[], resourceType: string): ResourceInfo[] {
//     return resources.filter(resource => 
//       resource.type.toLowerCase().includes(resourceType.toLowerCase())
//     );
//   }

//   /**
//    * Filter resources by location
//    */
//   filterResourcesByLocation(resources: ResourceInfo[], location: string): ResourceInfo[] {
//     return resources.filter(resource => 
//       resource.location.toLowerCase().includes(location.toLowerCase())
//     );
//   }

//   /**
//    * Filter resources by tags
//    */
//   filterResourcesByTag(resources: ResourceInfo[], tagKey: string, tagValue?: string): ResourceInfo[] {
//     return resources.filter(resource => {
//       if (!resource.tags) return false;
      
//       if (tagValue) {
//         return resource.tags[tagKey] === tagValue;
//       } else {
//         return tagKey in resource.tags;
//       }
//     });
//   }
// }