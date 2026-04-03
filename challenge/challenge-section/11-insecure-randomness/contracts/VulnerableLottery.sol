// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableLottery {
    address public winner;
    uint256 public lastBlock;
    uint256 public ticketPrice = 1 ether;

    constructor() payable {
        lastBlock = block.number;
    }

    function enter() external payable {
        require(msg.value == ticketPrice, "Wrong ticket price");
        require(block.number > lastBlock, "Wait for next block");
        lastBlock = block.number;
        uint256 prevrandao = block.prevrandao;
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, prevrandao, msg.sender)));
        if (random % 10 == 0) {
            winner = msg.sender;
        }
    }

    function claimPrize() external {
        require(msg.sender == winner, "Not the winner");
        require(address(this).balance > 0, "No prize left");
        payable(msg.sender).transfer(address(this).balance);
    }
}