// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableAuction {
    address private highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;

    constructor() payable {
        auctionEndTime = block.timestamp + 10 minutes;
    }

    function bid() public payable {
        require(block.timestamp < auctionEndTime, "Auction ended");
        require(msg.value > highestBid, "Bid too low");
        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function getHighestBidder() public view returns (address) {
        return highestBidder;
    }
}