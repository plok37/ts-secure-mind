// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingPlatform.sol";

contract Setup {
    VotingPlatform public votingPlatform;
    address public attacker;
    
    constructor() payable {
        require(msg.value == 13 ether, "Setup requires exactly 13 ETH");
        
        votingPlatform = new VotingPlatform();
        
        attacker = address(0);
        
        _setupInitialState();
    }
    
    function setAttacker(address _attacker) external {
        require(attacker == address(0), "Attacker already set");
        require(_attacker != address(0), "Invalid attacker address");
        attacker = _attacker;
        
        payable(_attacker).transfer(3 ether);
    }
    
    function _setupInitialState() private {
        votingPlatform.createProposal{value: 2 ether}("Proposal 1: Increase platform fees");
        votingPlatform.createProposal{value: 2 ether}("Proposal 2: Add new voting features");
        
        // Simulate some voting activity
        votingPlatform.vote{value: 3 ether}(1, true); 
        votingPlatform.vote{value: 3 ether}(2, false); 
    }
    
    function isSolved() external view returns (bool) {
        require(attacker != address(0), "Challenge not started - call setAttacker first");
        
        // Check if attacker is now the admin
        bool isAdmin = votingPlatform.admin() == attacker;
        
        // Check if contract has been drained (less than 2 ETH remaining)
        bool isDrained = address(votingPlatform).balance < 2 ether;
        
        return isAdmin && isDrained;
    }
    
    /**
     * @dev Allow contract to receive ETH
     */
    receive() external payable {}
}