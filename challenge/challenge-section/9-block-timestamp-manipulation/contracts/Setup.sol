// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Monopoli.sol";

contract Setup {
    Monopoli public monopoli;
    bool private solved;

    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Deploy.");
        monopoli = new Monopoli{value: 30 ether}();
    }

    function isSolved() external view returns (bool) {
        return monopoli.playerWon();
    }
}