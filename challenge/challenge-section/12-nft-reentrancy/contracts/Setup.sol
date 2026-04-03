// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;


import "./VIPAdministrator.sol";
import "./VIPMembership.sol";

contract Setup {
    VIPMembership public vipMembership;
    VIPAdministrator public admin;

    constructor() {
        vipMembership = new VIPMembership();
        admin = new VIPAdministrator(address(vipMembership), 1 ether);
        vipMembership.setAdministrator(address(admin));
    }

    function isSolved() public view returns (bool) {
        return admin.trueVIP();
    }
}