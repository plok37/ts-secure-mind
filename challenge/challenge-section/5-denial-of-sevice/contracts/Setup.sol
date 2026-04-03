// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VulnerableAuction} from "./VulnerableAuction.sol";

contract Setup {
    VulnerableAuction public immutable vulnerableAuction;
    address public immutable DEPLOYER;
    bool public solved;

    constructor() payable {
        DEPLOYER = msg.sender;
        vulnerableAuction = new VulnerableAuction{value: 1 ether}();
        
        // Place an initial bid to start the auction
        vulnerableAuction.placeBid{value: 1.1 ether}();
    }

    function setSolved() public {
        require(checkSolved() , "Haven't achieved DoS yet");
        solved = true;
    }

    function checkSolved() public returns (bool) {
        // Challenge is solved when:
        // 1. The auction has ended (past end time)
        // 2. The finalize function consistently fails (DoS achieved)
        // 3. The highest bidder is the attacker

        bool auctionEnded = block.timestamp >
            vulnerableAuction.auctionEndTime();
        bool attackerIsHighestBidder = vulnerableAuction.highestBidder() !=
            DEPLOYER &&
            vulnerableAuction.highestBidder() != address(0);

        if (!auctionEnded || !attackerIsHighestBidder) {
            return false;
        }

        // Try to finalize - if it fails, DoS is successful
        try vulnerableAuction.finalizeAuction() {
            return false; // If finalize succeeds, DoS failed
        } catch {
            return true; // If finalize fails, DoS succeeded
        }
    }

    function isSolved() public view returns (bool) {
        return solved;
    }
}
