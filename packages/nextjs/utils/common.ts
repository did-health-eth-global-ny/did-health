function contractCall(chainId: string): string {
    const contractAddresses: Record<string, string> = {
      "01": "0xAddressForChain01",
      "02": "0xAddressForChain02",
      // Add more chainId to contract address mappings as needed
    };
  
    // Check if the chainId exists in the mappings
    if (contractAddresses.hasOwnProperty(chainId)) {
      return contractAddresses[chainId];
    } else {
      throw new Error(`Contract address not found for chainId: ${chainId}`);
    }
  }
  
  function extractChainIdAndCallContract(did: string): [string, string] {
    if (did.length !== 44) {
      throw new Error("Invalid DID string length");
    }
  
    // Extract the first 2 characters as chainId and the rest as randomString
    const chainId = did.substring(0, 2);
    const randomString = did.substring(2);
  
    // Make a contract call based on the chainId
    const contractAddress = contractCall(chainId);
  
    // Return a tuple of chainId and contractAddress
    return [chainId, contractAddress];
  }
  
// Example usage:
//   const didString = "010x1234567890abcdef..."; // Replace with your DID string
//   try {
//     const [chainId, contractAddress] = extractChainIdAndCallContract(didString);
//     console.log(`Chain ID: ${chainId}`);
//     console.log(`Contract Address: ${contractAddress}`);
//   } catch (error) {
//     console.error(error.message);
//   }
  