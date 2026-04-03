// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableAssembly } from "./VulnerableAssembly.sol";

contract Setup {
    VulnerableAssembly public vulnerableAssembly;
    bool public solved;

    constructor() payable {
        vulnerableAssembly = new VulnerableAssembly();
    }

    function setSolved() public {
        require(vulnerableAssembly.owner() == msg.sender, "Not the owner");
        require(vulnerableAssembly.someValue() == 0, "Value is not zero");
        solved = true;
    }

    function isSolved() public view returns (bool) {
        return solved;
    }
}