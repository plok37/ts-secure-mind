// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./utils/ReentrancyGuard.sol";

contract DatingDapp is ReentrancyGuard {
    IERC20 public premiumToken;
    
    struct Profile {
        string name;
        uint256 age;
        string bio;
        bool isPremium;
        uint256 likes;
        bool isActive;
    }
    
    struct Match {
        address user1;
        address user2;
        uint256 timestamp;
        bool isActive;
        uint256 rewardClaimed;
    }
    
    mapping(address => Profile) public profiles;
    mapping(address => mapping(address => bool)) public hasLiked;
    mapping(bytes32 => Match) public matches;
    mapping(address => uint256) public userDeposits;
    mapping(address => uint256) public premiumExpiry;
    
    address[] public users;
    bytes32[] public activeMatches;
    
    uint256 public constant PREMIUM_COST = 0.1 ether;
    uint256 public constant MATCH_REWARD = 100 * 10**18;
    uint256 public constant WITHDRAWAL_FEE = 0.01 ether;
    
    address public owner;
    bool private _locked;
    
    event ProfileCreated(address indexed user, string name);
    event LikeGiven(address indexed from, address indexed to);
    event MatchCreated(address indexed user1, address indexed user2, bytes32 matchId);
    event PremiumPurchased(address indexed user, uint256 duration);
    event RewardClaimed(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier onlyActiveUser() {
        require(profiles[msg.sender].isActive, "Profile not active");
        _;
    }
    
    modifier noReentrant() {
        require(!_locked, "ReentrancyGuard: reentrant call");
        _locked = true;
        _;
        _locked = false;
    }
    
    constructor(address _premiumToken) payable {
        premiumToken = IERC20(_premiumToken);
        owner = msg.sender;
    }
    
    receive() external payable {}
    
    function createProfile(string memory _name, uint256 _age, string memory _bio) external {
        require(!profiles[msg.sender].isActive, "Profile already exists");
        require(_age >= 18, "Must be 18 or older");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        profiles[msg.sender] = Profile({
            name: _name,
            age: _age,
            bio: _bio,
            isPremium: false,
            likes: 0,
            isActive: true
        });
        
        users.push(msg.sender);
        emit ProfileCreated(msg.sender, _name);
    }
    
    function purchasePremium(uint256 duration) external payable onlyActiveUser {
        require(msg.value == PREMIUM_COST * duration, "Incorrect payment amount");
        require(duration > 0 && duration <= 12, "Duration must be 1-12 months");
        
        profiles[msg.sender].isPremium = true;
        premiumExpiry[msg.sender] = block.timestamp + (duration * 30 days);
        userDeposits[msg.sender] += msg.value;
        
        emit PremiumPurchased(msg.sender, duration);
    }
    
    function likeUser(address targetUser) external onlyActiveUser {
        require(targetUser != msg.sender, "Cannot like yourself");
        require(profiles[targetUser].isActive, "Target user not active");
        require(!hasLiked[msg.sender][targetUser], "Already liked this user");
        
        hasLiked[msg.sender][targetUser] = true;
        profiles[targetUser].likes++;
        
        emit LikeGiven(msg.sender, targetUser);
        
        // Check for mutual like (match)
        if (hasLiked[targetUser][msg.sender]) {
            createMatch(msg.sender, targetUser);
        }
    }
    
    function createMatch(address user1, address user2) internal {
        bytes32 matchId = keccak256(abi.encodePacked(user1, user2, block.timestamp));
        matches[matchId] = Match({
            user1: user1,
            user2: user2,
            timestamp: block.timestamp,
            isActive: true,
            rewardClaimed: 0
        });
        
        activeMatches.push(matchId);
        emit MatchCreated(user1, user2, matchId);
    }
    
    function claimMatchReward(bytes32 matchId) external noReentrant {
        Match storage matchData = matches[matchId];
        require(matchData.isActive, "Match not active");
        require(msg.sender == matchData.user1 || msg.sender == matchData.user2, "Not part of this match");
        require(matchData.rewardClaimed < 2, "Rewards already claimed");
        
        require(premiumToken.transfer(msg.sender, MATCH_REWARD), "Token transfer failed");
        
        matchData.rewardClaimed++;
        emit RewardClaimed(msg.sender, MATCH_REWARD);
    }
    
    function emergencyWithdraw() external {
        require(userDeposits[msg.sender] > 0, "No deposits to withdraw");
        
        uint256 amount = address(this).balance;
        userDeposits[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    function withdrawFunds() external onlyActiveUser {
        uint256 deposit = userDeposits[msg.sender];
        require(deposit > 0, "No funds to withdraw");
        
        uint256 withdrawAmount = deposit - WITHDRAWAL_FEE;
        userDeposits[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: withdrawAmount}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(msg.sender, withdrawAmount);
    }
    
    function grantBonusTokens(address user, uint256 amount) external {
        require(profiles[user].isPremium, "User must be premium");
        require(premiumToken.transfer(user, amount), "Token transfer failed");
    }
    
    function updateProfile(string memory _name, uint256 _age, string memory _bio) external {
        Profile storage profile = profiles[msg.sender];
        profile.name = _name;
        profile.age = _age;
        profile.bio = _bio;
    }
    
    function setOwner(address newOwner) external {
        owner = newOwner;
    }
    
    function drainEmergencyFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");
    }
    
    function getProfile(address user) external view returns (Profile memory) {
        return profiles[user];
    }
    
    function getMatch(bytes32 matchId) external view returns (Match memory) {
        return matches[matchId];
    }
    
    function getUserDeposit(address user) external view returns (uint256) {
        return userDeposits[user];
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getActiveMatches() external view returns (bytes32[] memory) {
        return activeMatches;
    }
    
    function getUserCount() external view returns (uint256) {
        return users.length;
    }
    
    function isPremiumActive(address user) external view returns (bool) {
        return profiles[user].isPremium && premiumExpiry[user] > block.timestamp;
    }
}
