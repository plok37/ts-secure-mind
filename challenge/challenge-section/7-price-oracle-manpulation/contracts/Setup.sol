// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableLending } from "./VulnerableLending.sol";

contract Setup {
    VulnerableLending public vulnerableLending;

    constructor() payable {
        vulnerableLending = new VulnerableLending{value: 10 ether}();
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableLending).balance == 0;
    }
}