// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Setup} from "./Setup.sol";

contract VulnerableProxy {
    address public owner;
    address public implementation;
    bool public firstUpgrade;
    bool public initialized;
    Setup public setup;

    constructor() payable {
        owner = msg.sender;
        setup = Setup(msg.sender);
    }

    function initialize(address _owner) public {
        require(!initialized, "Contract instance has already been initialized");
        initialized = true;
        owner = _owner;
    }

    function upgradeTo(address newImpl) public {
        if (!firstUpgrade) {
            require(msg.sender == owner, "Only owner can upgrade");
            firstUpgrade = true;
            implementation = newImpl;
        } else {
            require(
                newImpl == address(setup.logicV2()),
                "Only logicV2 can be upgraded to"
            );
            implementation = newImpl;
        }
    }

    fallback() external payable {
        address impl = implementation;
        require(impl != address(0), "No implementation");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {}
}
