// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableWallet } from "./VulnerableWallet.sol";

contract Setup {
    VulnerableWallet public vulnerableWallet;

    constructor() payable {
        vulnerableWallet = new VulnerableWallet();
        payable(address(vulnerableWallet)).transfer(2 ether);
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableWallet).balance == 0;
    }
}