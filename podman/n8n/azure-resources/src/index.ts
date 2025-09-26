import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { QueryRequest } from "@azure/arm-resourcegraph/esm/models";

import { ResourceLister } from "./resource-lister";
import { config } from "dotenv";

import * as csv from '@fast-csv/format';
import * as path from 'path';
import * as fs from 'fs';

async function main() {

  config()



  const resourceLister = new ResourceLister();

  //const subscriptionResult = await resourceLister.listSubscriptions();
  //console.log(subscriptionResult);

  const resourceContainers = 



  resourceLister.listSubscriptions()
    .then((response) => {
      const subscriptions: string[] = [];
      for (const subscription of response.data) {
        console.log(` - subscription: ${subscription.name} [${subscription.subscriptionId}]`);
        subscriptions.push(subscription.subscriptionId);
      }
      return subscriptions;
    })
    .then((subscriptions) => {
      resourceLister.listResourceGroups(subscriptions)
        .then((response) => {
          const rows = [];
          for (const resource of response.data) {
              rows.push({ id: resource.id, subscription: resource.subscriptionId, resourceGroup: resource.resourceGroup, location: resource.location, name: resource.name, type: resource.type });
          }
          csv.writeToStream(fs.createWriteStream(path.resolve(__dirname, 'resource.containers.csv')), rows, { headers: true });
        })

      resourceLister.listNetworkResources(subscriptions)
        .then((response) => {
    
          const rows = [];
          for (const resource of response.data) {
              rows.push({ id: resource.id, subscription: resource.subscriptionId, resourceGroup: resource.resourceGroup, location: resource.location, name: resource.name, type: resource.type });
          }
          csv.writeToStream(fs.createWriteStream(path.resolve(__dirname, 'resource.network.csv')), rows, { headers: true });
        })

      resourceLister.listComputeResources(subscriptions)
        .then((response) => {
          console.log(response)
        })
    })
    .catch((error) => console.error(error));

  // resourceLister.listResourceGroups(subscriptions)
  //   .then((response) => console.log(response))
  //   .catch((error) => console.error(error));

  // const result = await resourceLister.listComputeResources(subscriptions);
  // console.log(result);

  // const networkResult = await resourceLister.listNetworkResources(subscriptions);
  // console.log(networkResult);
}


// Run the application
main()
  .catch(console.error);