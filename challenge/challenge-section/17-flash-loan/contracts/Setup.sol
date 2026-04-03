// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableLendingPool } from "./VulnerableLendingPool.sol";

contract Setup {
    VulnerableLendingPool public vulnerableLendingPool;

    constructor() payable {
        vulnerableLendingPool = new VulnerableLendingPool();
        payable(address(vulnerableLendingPool)).transfer(100 ether);
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableLendingPool).balance == 0;
    }
}