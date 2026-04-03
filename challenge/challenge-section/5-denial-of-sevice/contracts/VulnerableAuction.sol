// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableAuction {
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;
    bool public auctionFinalized;
    
    mapping(address => uint256) public pendingReturns;
    address[] public allBidders;
    
    event BidPlaced(address indexed bidder, uint256 amount);
    event AuctionFinalized(address winner, uint256 amount);
    event RefundSent(address indexed bidder, uint256 amount);
    
    constructor() payable {
        auctionEndTime = block.timestamp + 300;
        highestBid = msg.value;
        if (msg.value > 0) {
            highestBidder = msg.sender;
        }
    }
    
    function placeBid() external payable {
        require(block.timestamp < auctionEndTime, "Auction has ended");
        require(msg.value > highestBid, "Bid must be higher than current highest");
        
        if (highestBidder != address(0)) {
            pendingReturns[highestBidder] += highestBid;
        }
        
        allBidders.push(msg.sender);
        
        highestBidder = msg.sender;
        highestBid = msg.value;
        
        emit BidPlaced(msg.sender, msg.value);
    }
    
    function finalizeAuction() external {
        require(block.timestamp >= auctionEndTime, "Auction not yet ended");
        require(!auctionFinalized, "Auction already finalized");
        
        auctionFinalized = true;
        
        for (uint256 i = 0; i < allBidders.length; i++) {
            address bidder = allBidders[i];
            uint256 amount = pendingReturns[bidder];
            
            if (amount > 0) {
                pendingReturns[bidder] = 0;
                
                (bool success, ) = bidder.call{value: amount}("");
                require(success, "Refund failed"); // DoS vector!
                
                emit RefundSent(bidder, amount);
            }
        }
        
        emit AuctionFinalized(highestBidder, highestBid);
    }
    
    function emergencyFinalize() external {
        require(block.timestamp >= auctionEndTime + 1 hours, "Emergency period not reached");
        require(!auctionFinalized, "Auction already finalized");
        
        _refundAllBidders();
        auctionFinalized = true;
        
        emit AuctionFinalized(highestBidder, highestBid);
    }
    
    function _refundAllBidders() internal {
        for (uint256 i = 0; i < allBidders.length; i++) {
            address bidder = allBidders[i];
            uint256 amount = pendingReturns[bidder];
            
            if (amount > 0) {
                pendingReturns[bidder] = 0;
                
                (bool success, ) = bidder.call{value: amount}("");
                require(success, "Emergency refund failed");
            }
        }
    }
}