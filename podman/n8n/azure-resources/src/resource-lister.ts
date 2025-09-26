import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import Credentials from "./credentials";
import { QueryRequest, ResourcesResponse } from "@azure/arm-resourcegraph/esm/models";

export class ResourceLister {

    private resourceGraphClient: ResourceGraphClient;

    constructor() {
        this.resourceGraphClient = new ResourceGraphClient(Credentials.getInstance().getCredentials());
    }

    public listSubscriptions(): Promise<ResourcesResponse> {

        console.log("Listing subscriptions...");

        const query = "resourcecontainers | where type =~ \"microsoft.resources/subscriptions\"";
        const queryRequest: QueryRequest = {
            query: query
        };
        return this.resourceGraphClient.resources(queryRequest);
    }

    public listResourceGroups(subscriptions: string[] | undefined): Promise<ResourcesResponse> {

        console.log(`Listing resource groups in subscriptions: ${subscriptions}`);

        const query = "resourcecontainers | where type =~ \"microsoft.resources/subscriptions/resourcegroups\"";
        const queryRequest: QueryRequest = {
            query: query
        };

        if (subscriptions !== undefined) {
            queryRequest.subscriptions = subscriptions;
        }

        return new Promise<ResourcesResponse>((resolve, reject) => {
            this.resourceGraphClient.resources(queryRequest)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });

        // const query = "resourcecontainers | where type =~ \"microsoft.resources/subscriptions/resourcegroups\"";
        // const queryRequest: QueryRequest = {
        //     query: query
        // };
        // if (subscriptions !== undefined) {
        //     queryRequest.subscriptions = subscriptions;
        // }
        // return this.resourceGraphClient.resources(queryRequest);
    }

    public listComputeResources(subscriptions: string[] | undefined): Promise<ResourcesResponse> {

        console.log(`Listing compute resources in subscriptions: ${subscriptions}`);

        const query = "resources | where type startswith_cs \"microsoft.compute\"";
        const queryRequest: QueryRequest = {
            query: query
        };
        if (subscriptions !== undefined) {
            queryRequest.subscriptions = subscriptions;
        }
        return this.resourceGraphClient.resources(queryRequest);
    }


    public listNetworkResources(subscriptions: string[] | undefined): Promise<ResourcesResponse> {

        console.log(`Listing network resources in subscriptions: ${subscriptions}`);

        const query = "resources | where type startswith_cs \"microsoft.network\"";
        const queryRequest: QueryRequest = {
            query: query
        };
        if (subscriptions !== undefined) {
            queryRequest.subscriptions = subscriptions;
        }
        return this.resourceGraphClient.resources(queryRequest);
    }

}
