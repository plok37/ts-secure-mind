// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFlashLoanReceiver {
    function execute() external payable;
}

contract VulnerableLendingPool {
    mapping (address => uint256) amounts;
    
    function deposit() public payable {
        require(msg.value > 0, "Must send ETH to deposit");
        amounts[msg.sender] += msg.value;
    }

    function flashLoan(uint256 amount, address receiver) public {
        uint256 balanceBefore = address(this).balance;
        require(balanceBefore >= amount, "Not enough ETH in pool");
        
        (bool sent, ) = receiver.call{value: amount}("");
        require(sent, "Transfer failed");
        
        IFlashLoanReceiver(receiver).execute{value: 0}();
        require(address(this).balance >= balanceBefore, "Flash loan not repaid");
    }

    function withdraw() public {
        uint256 amount = amounts[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        amounts[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
    }

    receive() external payable {}
}