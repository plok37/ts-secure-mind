// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableReentrancy {
    mapping(address => uint256) public balances;

    constructor() payable {
    }

    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        uint256 balance = balances[msg.sender] - amount;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
        balances[msg.sender] = balance;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}