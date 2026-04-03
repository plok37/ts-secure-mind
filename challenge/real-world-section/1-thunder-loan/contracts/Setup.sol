// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./ThunderLoan.sol";
import {ERC20} from "./ERC20.sol";

contract Setup {
    ThunderLoan public thunderLoan;
    ERC20 public erc20;

    constructor() payable {
        require(msg.value == 50 ether, "Setup requires exactly 50 ETH to initialize the challenge");

        erc20 = new ERC20(1_000_000 ether);

        thunderLoan = new ThunderLoan{value: 50 ether}(IERC20(address(erc20)));
    }

    function isSolved() public view returns (bool) {
        return address(thunderLoan).balance == 0;
    }
}