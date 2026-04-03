// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721URIStorage, ERC721} from "./ERC721/extensions/ERC721URIStorage.sol";

contract VIPMembership is ERC721URIStorage {
    struct MembershipStatus {
        address member;
        bool isVIP;
    }

    address public owner;
    address public administrator;
    uint256 public membershipCounter = 1;
    mapping(address => uint256) public MembershipsOwned;
    mapping(uint256 => MembershipStatus) public VIPNFT;

    modifier onlyOwner {
        require(msg.sender == owner, "Owner Only Function");
        _;
    }

    modifier onlyAdministrator {
        require(msg.sender == administrator);
        _;
    }

    constructor() payable ERC721("VIP Membership", "VIP") {
        owner = msg.sender;
    }

    function setAdministrator(address _administrator) public onlyOwner {
        administrator = _administrator;
    }

    function mintMembership(address _to) public onlyAdministrator {
        uint256 newVIPNFT = membershipCounter++;
        MembershipsOwned[_to] += 1;

        _safeMint(_to, newVIPNFT);
        VIPNFT[newVIPNFT] = MembershipStatus({
            member: _to,
            isVIP: true
        });
    }

    function getMembershipStatus(uint256 _id) public view returns (MembershipStatus memory) {
        return VIPNFT[_id];
    }

    function getMembershipCount(address _who) public view returns (uint256) {
        return MembershipsOwned[_who];
    }
}
