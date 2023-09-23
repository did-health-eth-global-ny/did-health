// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./lib/Structs.sol";
import "./storage/ZengoStorage.sol";

contract HealthDID {
    IERC20 public token;

    // event didRegistered();
    // event didUpdated();
    mapping(string => mapping(address => Structs.HealthDID)) private didResolver;
    mapping(string => address) private didAddressMapping;
    mapping(address => Structs.HealthDID) public addressDidMapping;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {}

    function getHealtDID(string memory _healthDid) public view returns (Structs.HealthDID) {
        address temp = didAddressMapping[_healthDid];
        return addressDidMapping[didAddressMapping[_healthDid]];
    }

    function registerDID(string memory _healthDID, string memory _uri) returns (string) {}
}
