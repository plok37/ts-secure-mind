// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./VIPMembership.sol";

contract VIPAdministrator {
    VIPMembership public vipMembership;

    bool public trueVIP;
    uint256 public fee;
    address public owner;

    mapping(address => bool) public joined;

    constructor(address _vipMembership, uint256 _fee) {
        owner = msg.sender;
        vipMembership = VIPMembership(_vipMembership);
        fee = _fee;
    }

    function joinVIP() public payable {
        require(msg.value == fee, "Membership fee required!");
        require(joined[msg.sender] == false, "Already a VIP member!");
        vipMembership.mintMembership(msg.sender);
        joined[msg.sender] = true;
    }

    function checkTrueVIP() public {
        require(joined[msg.sender] == true, "Must be a VIP member!");
        if (vipMembership.getMembershipCount(msg.sender) == 10) {
            trueVIP = true;
        }
    }
}
