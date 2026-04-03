// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract VulnerableToken {
    string public name = "VulnerableToken";
    string public symbol = "VTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    constructor() {
        owner = msg.sender;
    }
    
    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint");
        totalSupply += amount;
        balanceOf[to] += amount;
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");
        
        allowance[from][msg.sender] -= value;
        balanceOf[from] -= value;
        balanceOf[to] += value;
        
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        return true;
    }
    
    function burn(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
    }
    
    function claimReward() public {
        uint256 reward = calculateReward(msg.sender);
        
        balanceOf[msg.sender] += reward;
        totalSupply += reward;
    }
    
    function calculateReward(address user) public view returns (uint256) {
        uint256 balance = balanceOf[user];
        
        return (balance * 100) / 10000;
    }
    
    function getMaxUint256() public pure returns (uint256) {
        return type(uint256).max;
    }
    
    function hasTokens(address user) public view returns (bool) {
        return balanceOf[user] > 0;
    }
}