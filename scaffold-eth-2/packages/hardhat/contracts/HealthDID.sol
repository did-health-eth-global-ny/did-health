// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./lib/Structs.sol";
import "./storage/ZengoStorage.sol";

contract HealthDID {
    IERC20 public token;

    // event didRegistered();
    // event didUpdated();

    mapping(string => mapping(address => Structs.HealthDID)) private users;
    mapping(address => HealthDID) public didAddressMapping;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {}

    function getHealtDID() {}

    function registerDID(string memory _healthDID, string memory _uri) returns (string) {}
}
