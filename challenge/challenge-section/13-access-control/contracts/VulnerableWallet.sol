// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function withdrawAll() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}