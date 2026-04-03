// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/ReentrancyGuard.sol";

contract VotingPlatform {
    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 endTime;
        bool executed;
        address proposer;
        uint256 reward;
    }

    struct Voter {
        bool hasVoted;
        uint256 proposalId;
        bool voteChoice;
        uint256 stake;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => Voter) public voters;
    mapping(address => uint256) public balances;

    uint256 public proposalCount;
    address public admin;
    uint256 public constant MIN_STAKE = 1 ether;
    uint256 public constant VOTING_DURATION = 7 days;

    bool private locked;

    event ProposalCreated(
        uint256 indexed proposalId,
        string description,
        address proposer
    );
    event VoteCast(
        uint256 indexed proposalId,
        address voter,
        bool choice,
        uint256 stake
    );
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    event RewardClaimed(address voter, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier noReentrant() {
        require(!locked, "ReentrancyGuard: reentrant call");
        locked = true;
        _;
        locked = false;
    }

    constructor() {
        admin = msg.sender;
    }

    function createProposal(string memory _description) external payable {
        require(msg.value >= MIN_STAKE, "Insufficient stake for proposal");

        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            endTime: block.timestamp + VOTING_DURATION,
            executed: false,
            proposer: msg.sender,
            reward: msg.value
        });

        balances[msg.sender] += msg.value;

        emit ProposalCreated(proposalCount, _description, msg.sender);
    }

    function vote(uint256 _proposalId, bool _choice) external payable {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Invalid proposal ID"
        );
        require(msg.value >= MIN_STAKE, "Insufficient stake to vote");

        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.endTime, "Voting period ended");
        require(!proposal.executed, "Proposal already executed");

        Voter storage voter = voters[msg.sender];
        if (voter.hasVoted && voter.proposalId == _proposalId) {
            require(
                voter.stake < msg.value,
                "Cannot vote with same or lower stake"
            );
            
            if (voter.voteChoice) {
                proposal.votesFor -= voter.stake;
            } else {
                proposal.votesAgainst -= voter.stake;
            }
        }

        uint256 voteWeight = msg.value / MIN_STAKE;
        if (_choice) {
            proposal.votesFor += voteWeight;
        } else {
            proposal.votesAgainst += voteWeight;
        }

        voter.hasVoted = true;
        voter.proposalId = _proposalId;
        voter.voteChoice = _choice;
        voter.stake = msg.value;

        balances[msg.sender] += msg.value;

        emit VoteCast(_proposalId, msg.sender, _choice, msg.value);
    }

    function executeProposal(uint256 _proposalId) external {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Invalid proposal ID"
        );

        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.endTime, "Voting period not ended");
        require(!proposal.executed, "Proposal already executed");

        bool passed = proposal.votesFor > proposal.votesAgainst;
        proposal.executed = true;

        if (passed) {
            balances[proposal.proposer] += proposal.reward;
        }

        emit ProposalExecuted(_proposalId, passed);
    }

    function claimReward() external noReentrant {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No reward to claim");

        balances[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: reward}("");
        require(success, "Transfer failed");

        emit RewardClaimed(msg.sender, reward);
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0;
    }

    function calculateReward(address _voter) public view returns (uint256) {
        Voter memory voter = voters[_voter];
        if (!voter.hasVoted) return 0;

        Proposal memory proposal = proposals[voter.proposalId];
        if (!proposal.executed) return 0;

        bool voterWon = (proposal.votesFor > proposal.votesAgainst &&
            voter.voteChoice) ||
            (proposal.votesAgainst > proposal.votesFor && !voter.voteChoice);

        if (voterWon) {
            return voter.stake * 2;
        }

        return 0;
    }

    function emergencyWithdraw() external onlyAdmin {
        uint256 contractBalance = address(this).balance;
        (bool success, ) = admin.call{value: contractBalance}("");
        require(success, "Transfer failed");
    }

    function changeAdmin(address _newAdmin) external {
        require(_newAdmin != address(0), "Invalid admin address");
        admin = _newAdmin;
    }

    function getProposal(
        uint256 _proposalId
    )
        external
        view
        returns (
            uint256 id,
            string memory description,
            uint256 votesFor,
            uint256 votesAgainst,
            uint256 endTime,
            bool executed,
            address proposer,
            uint256 reward
        )
    {
        require(
            _proposalId > 0 && _proposalId <= proposalCount,
            "Invalid proposal ID"
        );
        Proposal memory proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.endTime,
            proposal.executed,
            proposal.proposer,
            proposal.reward
        );
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}
