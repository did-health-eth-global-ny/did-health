// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./lib/Structs.sol";

contract HealthDIDRegistry {
    // event didRegistered();
    // event didUpdated();
    // mapping(string => mapping(address => Structs.HealthDID)) private didResolver;
    mapping(string => address) private didOwnerAddressRegistry;
    mapping(address => Structs.HealthDID) public addressDidMapping;

    modifier onlyOwner(string memory _healthDid) {
        require(msg.sender == didOwnerAddressRegistry[_healthDid], "You're not the owner of this DID");
        _;
    }

    constructor() {}

    function getHealtDID(string memory _healthDid) public view returns (Structs.HealthDID memory) {
        return addressDidMapping[didOwnerAddressRegistry[_healthDid]];
    }

    function registerDID(string memory _healthDID, string memory _uri) public returns (bool) {
        require(didOwnerAddressRegistry[_healthDID] == address(0), "DID already exists");
        require(resolveChainId(_healthDID) == getChainID(), "Incorrect Chain Id in DID");

        didOwnerAddressRegistry[_healthDID] = msg.sender;
        addressDidMapping[msg.sender].owner = msg.sender;
        addressDidMapping[msg.sender].healthDid = _healthDID;
        addressDidMapping[msg.sender].ipfsUri = _uri;
        addressDidMapping[msg.sender].hasWorldId = false;
        addressDidMapping[msg.sender].hasPolygonId = false;
        addressDidMapping[msg.sender].hasSocialId = false;
        addressDidMapping[msg.sender].reputationScore = 10;

        return true;
    }

    function updateDIDData(string memory _healthDid, string memory _uri) public {
        require(didOwnerAddressRegistry[_healthDid] != address(0), "DID doesn't exists");
        require(msg.sender == didOwnerAddressRegistry[_healthDid], "You're not the owner of this DID");
        require(resolveChainId(_healthDid) == getChainID(), "Incorrect Chain Id in DID");

        addressDidMapping[msg.sender].ipfsUri = _uri;
    }

    function addAltData(string memory _healthDid, string[] memory _uris) public {
        require(msg.sender == didOwnerAddressRegistry[_healthDid], "You're not the owner of this DID");
        require(resolveChainId(_healthDid) == getChainID(), "Incorrect Chain Id in DID");

        for (uint256 i = 0; i < _uris.length; i++) {
            addressDidMapping[msg.sender].altIpfsUris.push(_uris[i]);
        }
    }

    function resolveChainId(string memory did) public pure returns (uint256) {
        require(bytes(did).length >= 6, "Input string too short");

        bytes memory didBytes = bytes(did);
        uint256 chainIdUint = 0;

        for (uint256 i = 0; i < 6; i++) {
            uint8 charValue = uint8(didBytes[i]);
            require(charValue >= 48 && charValue <= 57, "Not a valid number"); // ASCII values for 0-9
            chainIdUint = chainIdUint * 10 + (charValue - 48); // converting ASCII to integer and accumulating
        }
        return chainIdUint;
    }

    function getChainID() public view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    function stringToBytes32(string memory _source) public pure returns (bytes32 _result) {
        bytes memory tempEmptyStringTest = bytes(_source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            _result := mload(add(_source, 32))
        }
    }
}
