// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract Monopoli {
    address public dealer;
    address public player;
    uint256 public playerPosition;
    uint256 public dealerPosition;
    uint256 public playerBalance;
    uint256 public dealerBalance;
    bool public playerWon;
    bool public dealerWon;
    uint8 public constant BOARD_SIZE = 10;
    
    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Start the game");
        dealer = msg.sender;
        playerBalance = 10 ether;
        dealerBalance = 10 ether;
        playerPosition = 0;
        dealerPosition = 0;
    }

    function joinGame() public {
        require(player == address(0), "Player already joined");
        player = msg.sender;
    }

    function rollDice() public {
        require(player == msg.sender, "Only player can roll");
        require(!playerWon && !dealerWon, "Game over");
        // Vulnerable randomness
        uint256 dice1 = (uint256(keccak256(abi.encodePacked(block.timestamp, playerPosition))) % 6) + 1;
        uint256 dice2 = 4;
        playerPosition = (playerPosition + dice1 + dice2) % BOARD_SIZE;
        // If player lands on position 0 (GO), they win
        if (playerPosition == 0) {
            playerWon = true;
        }
        // Dealer's turn (always moves 3 spaces)
        dealerPosition = (dealerPosition + 3) % BOARD_SIZE;
        if (dealerPosition == 0) {
            dealerWon = true;
        }
    }
}