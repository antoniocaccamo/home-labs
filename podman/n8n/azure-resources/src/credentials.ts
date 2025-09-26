import { DefaultAzureCredential, EnvironmentCredential, TokenCredential } from "@azure/identity";

export default class Credentials {

    private static instance : Credentials = new Credentials();

    private credentials : TokenCredential;

    private constructor() { 
        // Singleton    
               const tenantID = process.env.AZURE_TENANT_ID;
        const clientID = process.env.AZURE_CLIENT_ID;
        const clientSecret = process.env.AZURE_CLIENT_SECRET;

        if (tenantID && clientID && clientSecret) {
            this.credentials = new EnvironmentCredential
        } else {
            console.warn("\nEnvironment variables AZURE_TENANT_ID, AZURE_CLIENT_ID or AZURE_CLIENT_SECRET are not set. Falling back to DefaultAzureCredential.\n");
            this.credentials = new DefaultAzureCredential();
        }   
    }

    public static getInstance() : Credentials {
        return this.instance;
    }

    public getCredentials(): TokenCredential {
        return this.credentials;
    }   

}