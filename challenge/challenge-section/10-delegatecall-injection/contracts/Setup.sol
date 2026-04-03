// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableProxy } from "./VulnerableProxy.sol";

contract Setup {
    VulnerableProxy public vulnerableProxy;
    bool public solved;

    constructor() payable {
        vulnerableProxy = new VulnerableProxy();
    }

    function setSolved() public {
        require(vulnerableProxy.owner() == msg.sender, "Not the owner of the proxy");
        solved = true;
    }

    // Challenge is solved if player becomes the owner of the proxy contract
    function isSolved() public view returns (bool) {
        return solved;
    }
}