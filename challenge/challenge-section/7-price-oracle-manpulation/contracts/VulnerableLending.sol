// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPriceOracle {
    function getPrice() external view returns (uint256);
}

contract VulnerableLending {
    IPriceOracle public priceOracle;
    mapping(address => uint256) public collateral;
    mapping(address => uint256) public debt;

    constructor() payable {
        priceOracle = IPriceOracle(msg.sender);
    }

    // Deposit ETH as collateral
    function depositCollateral() external payable {
        require(msg.value > 0, "No ETH sent");
        collateral[msg.sender] += msg.value;
    }

    function borrow(IPriceOracle _ipriceOracle, uint256 amount) external {
        uint256 price = _ipriceOracle.getPrice();
        uint256 maxBorrow = (collateral[msg.sender] * price) / 2e18;
        require(amount <= maxBorrow, "Exceeds borrow limit");
        debt[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }

    function repay() external payable {
        require(msg.value > 0, "No ETH sent");
        require(debt[msg.sender] >= msg.value, "Repay too much");
        debt[msg.sender] -= msg.value;
    }
}