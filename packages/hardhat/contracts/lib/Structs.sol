// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Structs {
    struct HealthDID {
        address owner;
        address[] alternateAddresses;
        string ipfsUri;
        string[] altIpfsUris;
        uint256 reputationScore;
        bool hasWorldId;
        bool hasPolygonId;
        bool hasSocialId;
    }

    enum ModeratorType {
        CivilOrganization,
        PrivateSector,
        Academy,
        Government,
        OpenForAll
    }
}
