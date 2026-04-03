// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableReentrancy } from "./VulnerableReentrancy.sol";

contract Setup {
    VulnerableReentrancy public vulnerableReentrancy;

    constructor() payable {
        vulnerableReentrancy = new VulnerableReentrancy{value: 50 ether}();
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableReentrancy).balance == 0;
    }
}