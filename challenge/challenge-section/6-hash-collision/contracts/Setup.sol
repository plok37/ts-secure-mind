// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {SpecialVault} from "./SpecialVault.sol";

contract Setup{
    SpecialVault public specialVault;

    constructor() payable{
        specialVault = new SpecialVault();
        specialVault.register{value: 5 ether}("ImSo", "Unique");
    }

    function isSolved() public view returns(bool){
        return specialVault.checkBalance("ImSo", "Unique") == 0;
    }

}