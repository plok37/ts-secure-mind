// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableProxy } from "./VulnerableProxy.sol";

contract LogicV1 {
    address public owner;
    uint256 public value;

    function initialize(address _owner) public {
        require(owner == address(0), "Already initialized");
        owner = _owner;
    }

    function setValue(uint256 _value) public {
        require(msg.sender == owner, "Not owner");
        value = _value;
    }
}

contract LogicV2 {
    address public admin;
    uint256 public newValue;

    function setAdmin(address _admin) public {
        admin = _admin;
    }

    function setNewValue(uint256 _value) public {
        newValue = _value;
    }
}

contract Setup {
    VulnerableProxy public vulnerableProxy;
    LogicV1 public logicV1;
    LogicV2 public logicV2;
    bool public solved;

    constructor() payable {
        // Deploy logic contracts
        logicV1 = new LogicV1();
        logicV2 = new LogicV2();
        // Deploy the proxy with 1 ether
        vulnerableProxy = new VulnerableProxy{value: 1 ether}();
        // Set implementation to logicV1
        vulnerableProxy.upgradeTo(address(logicV1));
        // Initialize owner via delegatecall
        (bool ok, ) = address(vulnerableProxy).call(abi.encodeWithSignature("initialize(address)", address(this)));
        require(ok, "Initialization failed");
    }

    function setSolved() public {
        require(vulnerableProxy.owner() == msg.sender, "Not the owner");
        solved = true;
    }

    function isSolved() public view returns (bool) {
        return solved;
    }
}