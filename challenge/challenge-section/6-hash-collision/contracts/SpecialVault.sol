// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SpecialVault{

    mapping(bytes=>uint256) public balanceOf;
    mapping(string=>mapping(string=>address)) public users;

    function getUniqueId(string memory _prefixOfId, string memory _suffixOfId) public pure returns(bytes memory){
        return abi.encodePacked(_prefixOfId, _suffixOfId);
    }

    function register(string memory _prefixOfId, string memory _suffixOfId) public payable{
        require(users[_prefixOfId][_suffixOfId] == address(0), "Already Registered");
        require(msg.value > 0);
        bytes memory uniqueId = getUniqueId(_prefixOfId, _suffixOfId);
        balanceOf[uniqueId] += msg.value;
        users[_prefixOfId][_suffixOfId] = msg.sender;
    }

    function withdraw(string memory _prefixOfId, string memory _suffixOfId, uint256 _amount) public{
        require(users[_prefixOfId][_suffixOfId] == msg.sender, "You cannot withraw other people money!");
        bytes memory uniqueId = getUniqueId(_prefixOfId, _suffixOfId);
        require(balanceOf[uniqueId] - _amount >= 0, "You don't have this kind of money!");
        balanceOf[uniqueId] -= _amount;
    }

    function checkBalance(string memory _prefixOfId, string memory _suffixOfId) public view returns(uint256){
        bytes memory uniqueId = getUniqueId(_prefixOfId, _suffixOfId);
        return balanceOf[uniqueId];
    }
}