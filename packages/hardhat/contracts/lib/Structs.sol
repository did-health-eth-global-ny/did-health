// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Structs {
    struct HealthDID {
        address owner;
        address[] delegateAddresses;
        string healthDid;
        string ipfsUri;
        string[] altIpfsUris;
        uint8 reputationScore;
        bool hasWorldId;
        bool hasPolygonId;
        bool hasSocialId;
    }
}
