// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import {VulnerableToken} from "./VulnerableToken.sol";

contract Setup {
    VulnerableToken public vulnerableToken;
    bool public solved;
    
    constructor() {
        vulnerableToken = new VulnerableToken();
        vulnerableToken.mint(msg.sender, 1000 * 10**18);
    }

    function setSolved() public {
        require(vulnerableToken.balanceOf(msg.sender) > 1000 * 10**18, "Not enough tokens");
        solved = true;
    }
    
    function isSolved() public view returns (bool) {
        return solved;
    }
}