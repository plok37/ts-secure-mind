// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableLottery } from "./VulnerableLottery.sol";

contract Setup {
    VulnerableLottery public vulnerableLottery;

    constructor() payable {
        vulnerableLottery = new VulnerableLottery{value: 10 ether}();
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableLottery).balance == 0;
    }
}