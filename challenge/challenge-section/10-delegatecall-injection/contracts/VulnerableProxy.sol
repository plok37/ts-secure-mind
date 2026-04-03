// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableProxy {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function execute(address target, bytes calldata data) external {
        (bool success, ) = target.delegatecall(data);
        require(success, "Delegatecall failed");
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}