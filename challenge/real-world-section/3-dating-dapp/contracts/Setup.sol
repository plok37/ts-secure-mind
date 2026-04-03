// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { DatingDapp } from "./DatingDapp.sol";
import { PremiumToken } from "./PremiumToken.sol";

contract Setup {
    DatingDapp public datingDapp;
    PremiumToken public premiumToken;
    
    constructor() payable {
        require(msg.value == 10 ether, "Send exactly 10 ETH");
        
        // Deploy the premium token
        premiumToken = new PremiumToken();
        
        // Deploy the dating dapp with initial funds
        datingDapp = new DatingDapp{value: 5 ether}(address(premiumToken));
        
        // Transfer remaining funds to the dating dapp as premium pool
        payable(address(datingDapp)).transfer(5 ether);
        
        // Mint some premium tokens to the dapp for rewards
        premiumToken.mint(address(datingDapp), 1000 * 10**18);
    }

    function isSolved() public view returns (bool) {
        // Challenge is solved when:
        // 1. The dating dapp has no ETH left
        // 2. The attacker has drained the premium token pool
        return address(datingDapp).balance == 0 && 
               premiumToken.balanceOf(address(datingDapp)) == 0;
    }
}
