// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableAuction } from "./VulnerableAuction.sol";

contract Setup {
    VulnerableAuction public vulnerableAuction;
    bool public solved;

    constructor() payable {
        vulnerableAuction = new VulnerableAuction();
        vulnerableAuction.bid{value: 1 ether}();
    }

    function setSolved() public {
        require(vulnerableAuction.getHighestBidder() == msg.sender, "Not the highest bidder");
        solved = true;
    }

    function isSolved() public view returns (bool) {
        return solved;
    }

    receive() external payable {
    }
}