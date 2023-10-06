#!/usr/bin/env node
import didResolver from 'did-resolver';
//import healthdid from 'health-did-resolver';
    
const didHealthDocument = async (did: string) => {
    const didDocument = await resolveHealthDIDDocument(did);

}

async function resolveHealthDIDDocument( did: string){
    //const healthDidResolver = healthdid.getResolver(providerConfig)
    //const didResolver = new healthdid.Resolver(healthDidResolver)
    /*didResolver.resolve(did).then(
        (doc) => console.log(doc)
    )*/
    try{
      const resolver =  new didResolver.Resolver()
      const doc = await resolver.resolve(did)  
      console.log(JSON.stringify(doc))
      if ( doc.didDocument != null ){ 
      //const isValid =  isValidDIDDocument(doc.didDocument)
      return doc.didDocument;
      }
  
    }
    catch(e){
      return undefined;
    }
    
}

function isValidDIDDocument(didDocument: { id: any; service: any; verificationMethod: any; authentication: any; }) {
    // Check if 'id' field exists and is a string
    if (!didDocument.id || typeof didDocument.id !== 'string') {
    console.log("missing id")
      return false;
    }  
    // Check if 'service' field exists and is an array
    if (!Array.isArray(didDocument.service)) {
    console.log("missing service")
      return false;
    }  
    // Check if 'verificationMethod' field exists and is an array
    if (!Array.isArray(didDocument.verificationMethod)) {
        console.log("missing verification method") 
      return false;
    }  
    // Check if 'authentication' field exists and is an array
    if (!Array.isArray(didDocument.authentication)) {
        console.log("authentication")
      return false;
    }  
    // Additional checks can be added here based on your specific requirements
      return true;
  }
  
  export default didHealthDocument;