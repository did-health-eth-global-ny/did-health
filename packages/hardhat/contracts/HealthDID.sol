// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./lib/Structs.sol";

contract HealthDID {
    // event didRegistered();
    // event didUpdated();
    // mapping(string => mapping(address => Structs.HealthDID)) private didResolver;
    mapping(string => address) private didOwnerAddress;
    mapping(address => Structs.HealthDID) public addressDidMapping;

    modifier onlyOwner(address owner) {
        require(msg.sender == owner, "Incorrect DID");
        _;
    }

    constructor() {}

    function getHealtDID(string memory _healthDid) public view returns (Structs.HealthDID memory) {
        return addressDidMapping[didOwnerAddress[_healthDid]];
    }

    function registerDID(string memory _healthDID, string memory _uri) public returns (bool) {
        require(didOwnerAddress[_healthDID] != address(0), "DID already exists");
    }

    function extractChainIdAndReturnUint(string memory did) public pure returns (uint) {
        require(bytes(did).length == 44, "Invalid DID string length");

        // Convert the string to bytes
        bytes memory didBytes = bytes(did);

        // Extract the first 6 characters as the chainId
        bytes6 chainId;
        assembly {
            chainId := mload(add(didBytes, 32))
        }

        // Convert the chainId to a uint
        uint chainIdUint = uint(chainId);

        return chainIdUint;
    }


    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}
