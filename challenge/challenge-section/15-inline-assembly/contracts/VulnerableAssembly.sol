// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableAssembly {
    address public owner;
    bool public middleHolder;
    uint256 public someValue;

    constructor() {
        owner = msg.sender;
        someValue = 1234;
    }

    function writeSlot(uint256 slot, bytes32 value) public {
        assembly {
            sstore(slot, value)
        }
    }
}