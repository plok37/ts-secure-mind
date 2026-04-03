// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/ERC20.sol";
import "./access/Ownable.sol";

contract PremiumToken is ERC20, Ownable {
    
    constructor() ERC20("PremiumToken", "PREM") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
