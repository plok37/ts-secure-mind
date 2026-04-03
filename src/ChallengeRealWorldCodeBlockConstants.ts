// The codeblock to be displayed

// For starter
const setupStarter = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Starter } from "./Starter.sol";

contract Setup {
    Starter public starter;

    constructor(bytes32 _secretData) {
        starter = new Starter(_secretData);
    }

    function isSolved() external view returns (bool) {
        return starter.stage4();
    }
}`

const fileStarter = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Starter {
    bool public stage1;
    bool public stage2;
    bool public stage3;
    bool public stage4;
    bytes32 public secretData;

    constructor(bytes32 _secretData){
        secretData = _secretData;
        stage1 = false;
        stage2 = false;
        stage3 = false;
        stage4 = false;
    }

    function completeStage1() public {
        stage1 = true;
    }

    function completeStage2(uint256 value) public {
        require(stage1, "Stage 1 shold be completed first");
        require(value > 0, "Value must be greater than zero");
        stage2 = true;
    }

    function completeStage3(string memory _string) public {
        require(stage2, "Stage 2 should be completed first");
        require(keccak256(abi.encodePacked(_string)) == keccak256(abi.encodePacked("This_stage_3")), "String does not match");
        stage3 = true;
    }

    function completeStage4(bytes32 _secret) public {
        require(stage3, "Stage 3 should be completed first");
        require(_secret == secretData, "Secret data does not match");
        stage4 = true;
    }
}`

export const codeStarter= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupStarter,
  },
  {
    id: "file-one",
    title: "Starter",
    filename: "Starter.sol",
    language: "solidity",
    code: fileStarter,
  },
]

// 2-exploit-contract
const setupExploitContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RequireExploitContract.sol";

contract Setup {
    VulnerableBank public immutable vulnerableBank;
    
    constructor() payable {
        vulnerableBank = new VulnerableBank{value: 10 ether}();
    }
    
    function isSolved() public view returns (bool) {
        return address(vulnerableBank).balance == 0;
    }
}`

const file1ExploitContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableBank {
    mapping(address => uint256) public balances;
    
    constructor() payable {
        require(msg.value > 0, "Must deposit initial funds");
    }
    
    function deposit() external payable {
        require(msg.value > 0, "Must deposit some ETH");
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        uint256 newBalance = balances[msg.sender] - amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] = newBalance;
    }
    
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`

export const codeExploitContract= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupExploitContract,
  },
  {
    id: "file-one",
    title: "VulnerableBank",
    filename: "RequireExploitContract.sol",
    language: "solidity",
    code: file1ExploitContract,
  },
]

// 3-exploit-script
const setupExploitScript = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RequireScriptExploit.sol";

contract Setup {
    VulnerableVault public immutable vulnerableVault;
    address public immutable OWNER;
    
    constructor() payable {
        OWNER = msg.sender;
        vulnerableVault = new VulnerableVault{value: 5 ether}(OWNER);
    }
    
    function isSolved() public view returns (bool) {
        return address(vulnerableVault).balance == 0 && vulnerableVault.owner() != OWNER;
    }
}
`

const file1ExploitScript = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableVault {
    address public owner;
    uint256 public constant WITHDRAWAL_LIMIT = 1 ether;
    
    mapping(address => bool) public authorizedUsers;
    mapping(address => uint256) public userNonces;
    
    constructor(address _owner) payable {
        owner = _owner;
        authorizedUsers[_owner] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "Not authorized");
        _;
    }
    
    function authorizeUser(address user, uint256 nonce, uint256 timestamp) external {
        require(block.timestamp <= timestamp + 300, "Authorization expired");
        require(nonce > userNonces[msg.sender], "Invalid nonce");
        
        userNonces[msg.sender] = nonce;
        authorizedUsers[user] = true;
    }
    
    function transferOwnership(address newOwner) external {
        require(newOwner != address(0), "New owner cannot be zero address");

        owner = newOwner;
        authorizedUsers[newOwner] = true;
    }
    
    function withdraw(uint256 amount) external onlyAuthorized {
        require(amount <= WITHDRAWAL_LIMIT, "Exceeds withdrawal limit");
        require(address(this).balance >= amount, "Insufficient balance");

        payable(msg.sender).transfer(amount);
    }
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function isAuthorized(address user) external view returns (bool) {
        return authorizedUsers[user];
    }
    
    function getUserNonce(address user) external view returns (uint256) {
        return userNonces[user];
    }
}`

export const codeExploitScript= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupExploitScript,
  },
  {
    id: "file-one",
    title: "VulnerableVault",
    filename: "VulnerableVault.sol",
    language: "solidity",
    code: file1ExploitScript,
  },
]

// 4-overflow-underflow
const setupOverflowUnderflow = `// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import {VulnerableToken} from "./VulnerableToken.sol";

contract Setup {
    VulnerableToken public vulnerableToken;
    bool public solved;
    
    constructor() {
        vulnerableToken = new VulnerableToken();
        vulnerableToken.mint(msg.sender, 1000 * 10**18);
    }

    function setSolved() public {
        require(vulnerableToken.balanceOf(msg.sender) > 1000 * 10**18, "Not enough tokens");
        solved = true;
    }
    
    function isSolved() public view returns (bool) {
        return solved;
    }
}`

const file1OverflowUnderflow = `// SPDX-License-Identifier: MIT
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
}`

export const codeOverflowUnderflow= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupOverflowUnderflow,
  },
  {
    id: "file-one",
    title: "VulnerableToken",
    filename: "VulnerableToken.sol",
    language: "solidity",
    code: file1OverflowUnderflow,
  },
]

// 5-denial-of-service
const setupDenialOfService = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VulnerableAuction} from "./VulnerableAuction.sol";

contract Setup {
    VulnerableAuction public immutable vulnerableAuction;
    address public immutable DEPLOYER;
    bool public solved;

    constructor() payable {
        DEPLOYER = msg.sender;
        vulnerableAuction = new VulnerableAuction{value: 1 ether}();
        
        // Place an initial bid to start the auction
        vulnerableAuction.placeBid{value: 1.1 ether}();
    }

    function setSolved() public {
        require(checkSolved() , "Haven't achieved DoS yet");
        solved = true;
    }

    function checkSolved() public returns (bool) {
        // Challenge is solved when:
        // 1. The auction has ended (past end time)
        // 2. The finalize function consistently fails (DoS achieved)
        // 3. The highest bidder is the attacker

        bool auctionEnded = block.timestamp >
            vulnerableAuction.auctionEndTime();
        bool attackerIsHighestBidder = vulnerableAuction.highestBidder() !=
            DEPLOYER &&
            vulnerableAuction.highestBidder() != address(0);

        if (!auctionEnded || !attackerIsHighestBidder) {
            return false;
        }

        // Try to finalize - if it fails, DoS is successful
        try vulnerableAuction.finalizeAuction() {
            return false; // If finalize succeeds, DoS failed
        } catch {
            return true; // If finalize fails, DoS succeeded
        }
    }

    function isSolved() public view returns (bool) {
        return solved;
    }
}
`

const file1DenialOfService = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableAuction {
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;
    bool public auctionFinalized;
    
    mapping(address => uint256) public pendingReturns;
    address[] public allBidders;
    
    event BidPlaced(address indexed bidder, uint256 amount);
    event AuctionFinalized(address winner, uint256 amount);
    event RefundSent(address indexed bidder, uint256 amount);
    
    constructor() payable {
        auctionEndTime = block.timestamp + 300;
        highestBid = msg.value;
        if (msg.value > 0) {
            highestBidder = msg.sender;
        }
    }
    
    function placeBid() external payable {
        require(block.timestamp < auctionEndTime, "Auction has ended");
        require(msg.value > highestBid, "Bid must be higher than current highest");
        
        if (highestBidder != address(0)) {
            pendingReturns[highestBidder] += highestBid;
        }
        
        allBidders.push(msg.sender);
        
        highestBidder = msg.sender;
        highestBid = msg.value;
        
        emit BidPlaced(msg.sender, msg.value);
    }
    
    function finalizeAuction() external {
        require(block.timestamp >= auctionEndTime, "Auction not yet ended");
        require(!auctionFinalized, "Auction already finalized");
        
        auctionFinalized = true;
        
        for (uint256 i = 0; i < allBidders.length; i++) {
            address bidder = allBidders[i];
            uint256 amount = pendingReturns[bidder];
            
            if (amount > 0) {
                pendingReturns[bidder] = 0;
                
                (bool success, ) = bidder.call{value: amount}("");
                require(success, "Refund failed"); // DoS vector!
                
                emit RefundSent(bidder, amount);
            }
        }
        
        emit AuctionFinalized(highestBidder, highestBid);
    }
    
    function emergencyFinalize() external {
        require(block.timestamp >= auctionEndTime + 1 hours, "Emergency period not reached");
        require(!auctionFinalized, "Auction already finalized");
        
        _refundAllBidders();
        auctionFinalized = true;
        
        emit AuctionFinalized(highestBidder, highestBid);
    }
    
    function _refundAllBidders() internal {
        for (uint256 i = 0; i < allBidders.length; i++) {
            address bidder = allBidders[i];
            uint256 amount = pendingReturns[bidder];
            
            if (amount > 0) {
                pendingReturns[bidder] = 0;
                
                (bool success, ) = bidder.call{value: amount}("");
                require(success, "Emergency refund failed");
            }
        }
    }
}`

export const codeDenialOfService= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupDenialOfService,
  },
  {
    id: "file-one",
    title: "VulnerableAuction",
    filename: "VulnerableAuction.sol",
    language: "solidity",
    code: file1DenialOfService,
  },
]

// 6-hash-collision
const setupHashCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {SpecialVault} from "./SpecialVault.sol";

contract Setup{
    SpecialVault public specialVault;

    constructor() payable{
        specialVault = new SpecialVault();
        specialVault.register{value: 5 ether}("ImSo", "Unique");
    }

    function isSolved() public view returns(bool){
        return specialVault.checkBalance("ImSo", "Unique") == 0;
    }

}`

const file1HashCollision = `// SPDX-License-Identifier: MIT
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
}`

export const codeHashCollision= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupHashCollision,
  },
  {
    id: "file-one",
    title: "SpecialVault",
    filename: "SpecialVault.sol",
    language: "solidity",
    code: file1HashCollision,
  },
]

// 7-price-oracle-manipulation
const setupPriceOracleManipulation = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableLending } from "./VulnerableLending.sol";

contract Setup {
    VulnerableLending public vulnerableLending;

    constructor() payable {
        vulnerableLending = new VulnerableLending{value: 10 ether}();
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableLending).balance == 0;
    }
}`

const file1PriceOracleManipulation = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPriceOracle {
    function getPrice() external view returns (uint256);
}

contract VulnerableLending {
    IPriceOracle public priceOracle;
    mapping(address => uint256) public collateral;
    mapping(address => uint256) public debt;

    constructor() payable {
        priceOracle = IPriceOracle(msg.sender);
    }

    // Deposit ETH as collateral
    function depositCollateral() external payable {
        require(msg.value > 0, "No ETH sent");
        collateral[msg.sender] += msg.value;
    }

    function borrow(IPriceOracle _ipriceOracle, uint256 amount) external {
        uint256 price = _ipriceOracle.getPrice();
        uint256 maxBorrow = (collateral[msg.sender] * price) / 2e18;
        require(amount <= maxBorrow, "Exceeds borrow limit");
        debt[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }

    function repay() external payable {
        require(msg.value > 0, "No ETH sent");
        require(debt[msg.sender] >= msg.value, "Repay too much");
        debt[msg.sender] -= msg.value;
    }
}`

export const codePriceOracleManipulation= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupPriceOracleManipulation,
  },
  {
    id: "file-one",
    title: "VulnerableLending",
    filename: "VulnerableLending.sol",
    language: "solidity",
    code: file1PriceOracleManipulation,
  },
]

// 8-reentrancy
const setupReentrancy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableReentrancy } from "./VulnerableReentrancy.sol";

contract Setup {
    VulnerableReentrancy public vulnerableReentrancy;

    constructor() payable {
        vulnerableReentrancy = new VulnerableReentrancy{value: 50 ether}();
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableReentrancy).balance == 0;
    }
}`;

const file1Reentrancy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableReentrancy {
    mapping(address => uint256) public balances;

    constructor() payable {
    }

    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        uint256 balance = balances[msg.sender] - amount;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
        balances[msg.sender] = balance;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`;

export const codeReentrancy= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupReentrancy,
  },
  {
    id: "file-one",
    title: "VulnerableReentrancy",
    filename: "VulnerableReentrancy.sol",
    language: "solidity",
    code: file1Reentrancy,
  },
]

// 9-block-timestamp-manipulation
const setupBlockTimestampManipulation = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Monopoli.sol";

contract Setup {
    Monopoli public monopoli;
    bool private solved;

    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Deploy.");
        monopoli = new Monopoli{value: 30 ether}();
    }

    function isSolved() external view returns (bool) {
        return monopoli.playerWon();
    }
}`

const file1BlockTimestampManipulation = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

contract Monopoli {
    address public dealer;
    address public player;
    uint256 public playerPosition;
    uint256 public dealerPosition;
    uint256 public playerBalance;
    uint256 public dealerBalance;
    bool public playerWon;
    bool public dealerWon;
    uint8 public constant BOARD_SIZE = 10;
    
    constructor() payable {
        require(msg.value == 30 ether, "Require 30 Ether to Start the game");
        dealer = msg.sender;
        playerBalance = 10 ether;
        dealerBalance = 10 ether;
        playerPosition = 0;
        dealerPosition = 0;
    }

    function joinGame() public {
        require(player == address(0), "Player already joined");
        player = msg.sender;
    }

    function rollDice() public {
        require(player == msg.sender, "Only player can roll");
        require(!playerWon && !dealerWon, "Game over");
        // Vulnerable randomness
        uint256 dice1 = (uint256(keccak256(abi.encodePacked(block.timestamp, playerPosition))) % 6) + 1;
        uint256 dice2 = 4;
        playerPosition = (playerPosition + dice1 + dice2) % BOARD_SIZE;
        // If player lands on position 0 (GO), they win
        if (playerPosition == 0) {
            playerWon = true;
        }
        // Dealer's turn (always moves 3 spaces)
        dealerPosition = (dealerPosition + 3) % BOARD_SIZE;
        if (dealerPosition == 0) {
            dealerWon = true;
        }
    }
}`

export const codeBlockTimestampManipulation= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupBlockTimestampManipulation,
  },
  {
    id: "file-one",
    title: "Monopoli",
    filename: "Monopoli.sol",
    language: "solidity",
    code: file1BlockTimestampManipulation,
  },
]

// 10-delegatecall-injection
const setupDelegatecallInjection = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableProxy } from "./VulnerableProxy.sol";

contract Setup {
    VulnerableProxy public vulnerableProxy;
    bool public solved;

    constructor() payable {
        vulnerableProxy = new VulnerableProxy();
    }

    function setSolved() public {
        require(vulnerableProxy.owner() == msg.sender, "Not the owner of the proxy");
        solved = true;
    }

    // Challenge is solved if player becomes the owner of the proxy contract
    function isSolved() public view returns (bool) {
        return solved;
    }
}`;

const file1DelegatecallInjection = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableProxy {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function execute(address target, bytes calldata data) external {
        (bool success, ) = target.delegatecall(data);
        require(success, "Delegatecall failed");
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}`;

export const codeDelegatecallInjection = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupDelegatecallInjection,
  },
  {
    id: "file-one",
    title: "VulnerableProxy",
    filename: "VulnerableProxy.sol",
    language: "solidity",
    code: file1DelegatecallInjection,
  },
]

// 11-insecure-randomness
const setupInsecureRandomness = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableLottery } from "./VulnerableLottery.sol";

contract Setup {
    VulnerableLottery public vulnerableLottery;

    constructor() payable {
        vulnerableLottery = new VulnerableLottery{value: 10 ether}();
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableLottery).balance == 0;
    }
}`;

const file1InsecureRandomness = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableLottery {
    address public winner;
    uint256 public lastBlock;
    uint256 public ticketPrice = 1 ether;

    constructor() payable {
        lastBlock = block.number;
    }

    function enter() external payable {
        require(msg.value == ticketPrice, "Wrong ticket price");
        require(block.number > lastBlock, "Wait for next block");
        lastBlock = block.number;
        uint256 prevrandao = block.prevrandao;
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, prevrandao, msg.sender)));
        if (random % 10 == 0) {
            winner = msg.sender;
        }
    }

    function claimPrize() external {
        require(msg.sender == winner, "Not the winner");
        require(address(this).balance > 0, "No prize left");
        payable(msg.sender).transfer(address(this).balance);
    }
}`;

export const codeInsecureRandomness= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupInsecureRandomness,
  },
  {
    id: "file-one",
    title: "VulnerableLottery",
    filename: "VulnerableLottery.sol",
    language: "solidity",
    code: file1InsecureRandomness,
  },
]

// 12-nft-reentrancy
const setupNftReentrancy = `// SPDX-License-Identifier: MIT
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
}`;

const file1NftReentrancy = `// SPDX-License-Identifier: MIT
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
`;

const file2NftReentrancy = `// SPDX-License-Identifier: MIT
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
`

export const codeNftReentrancy= [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupNftReentrancy,
  },
  {
    id: "file-one",
    title: "VIPMembership",
    filename: "VIPMembership.sol",
    language: "solidity",
    code: file1NftReentrancy,
  },
  {
    id: "file-two",
    title: "VIPAdministrator",
    filename: "VIPAdministrator.sol",
    language: "solidity",
    code: file2NftReentrancy,
  }
]

// 13-access-control
const setupAccessControl = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableWallet } from "./VulnerableWallet.sol";

contract Setup {
    VulnerableWallet public vulnerableWallet;

    constructor() payable {
        vulnerableWallet = new VulnerableWallet();
        payable(address(vulnerableWallet)).transfer(2 ether);
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableWallet).balance == 0;
    }
}`

const file1AccessControl = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function withdrawAll() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}`

export const codeAccessControl = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupAccessControl,
  },
  {
    id: "file-one",
    title: "VulnerableWallet",
    filename: "VulnerableWallet.sol",
    language: "solidity",
    code: file1AccessControl,
  },
]

// 14-storage-collision
const setupStorageCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableProxy } from "./VulnerableProxy.sol";

contract LogicV1 {
    address public owner;
    uint256 public value;

    function initialize(address _owner) public {
        require(owner == address(0), "Already initialized");
        owner = _owner;
    }

    function setValue(uint256 _value) public {
        require(msg.sender == owner, "Not owner");
        value = _value;
    }
}

contract LogicV2 {
    address public admin;
    uint256 public newValue;

    function setAdmin(address _admin) public {
        admin = _admin;
    }

    function setNewValue(uint256 _value) public {
        newValue = _value;
    }
}

contract Setup {
    VulnerableProxy public vulnerableProxy;
    LogicV1 public logicV1;
    LogicV2 public logicV2;
    bool public solved;

    constructor() payable {
        // Deploy logic contracts
        logicV1 = new LogicV1();
        logicV2 = new LogicV2();
        // Deploy the proxy with 1 ether
        vulnerableProxy = new VulnerableProxy{value: 1 ether}();
        // Set implementation to logicV1
        vulnerableProxy.upgradeTo(address(logicV1));
        // Initialize owner via delegatecall
        (bool ok, ) = address(vulnerableProxy).call(abi.encodeWithSignature("initialize(address)", address(this)));
        require(ok, "Initialization failed");
    }

    function setSolved() public {
        require(vulnerableProxy.owner() == msg.sender, "Not the owner");
        solved = true;
    }

    function isSolved() public view returns (bool) {
        return solved;
    }
}`;

const file1StorageCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Setup} from "./Setup.sol";

contract VulnerableProxy {
    address public owner;
    address public implementation;
    bool public firstUpgrade;
    bool public initialized;
    Setup public setup;

    constructor() payable {
        owner = msg.sender;
        setup = Setup(msg.sender);
    }

    function initialize(address _owner) public {
        require(!initialized, "Contract instance has already been initialized");
        initialized = true;
        owner = _owner;
    }

    function upgradeTo(address newImpl) public {
        if (!firstUpgrade) {
            require(msg.sender == owner, "Only owner can upgrade");
            firstUpgrade = true;
            implementation = newImpl;
        } else {
            require(
                newImpl == address(setup.logicV2()),
                "Only logicV2 can be upgraded to"
            );
            implementation = newImpl;
        }
    }

    fallback() external payable {
        address impl = implementation;
        require(impl != address(0), "No implementation");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {}
}`;

export const codeStorageCollision = [
  {
    id: "setup",
    title: "Setup & LogicV1 & LogicV2",
    filename: "Setup.sol",
    language: "solidity",
    code: setupStorageCollision,
  },
  {
    id: "file-one",
    title: "VulnerableProxy",
    filename: "VulnerableProxy.sol",
    language: "solidity",
    code: file1StorageCollision,
  },
]

// 15-inline-assembly
const setupInlineAssembly = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableAssembly } from "./VulnerableAssembly.sol";

contract Setup {
    VulnerableAssembly public vulnerableAssembly;
    bool public solved;

    constructor() payable {
        vulnerableAssembly = new VulnerableAssembly();
    }

    function setSolved() public {
        require(vulnerableAssembly.owner() == msg.sender, "Not the owner");
        require(vulnerableAssembly.someValue() == 0, "Value is not zero");
        solved = true;
    }

    function isSolved() public view returns (bool) {
        return solved;
    }
}`;

const file1InlineAssembly = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableAssembly {
    address public owner;
    bool public middleHolder;
    uint256 public someValue;

    constructor() {
        owner = msg.sender;
        someValue = 1234;
    }

    function writeSlot(uint256 slot, bytes32 value) public {
        assembly {
            sstore(slot, value)
        }
    }
}`;

export const codeInlineAssembly = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupInlineAssembly,
  },
  {
    id: "file-one",
    title: "VulnerableAssembly",
    filename: "VulnerableAssembly.sol",
    language: "solidity",
    code: file1InlineAssembly,
  },
]

// 16-front-running
const setupFrontRunning = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableAuction } from "./VulnerableAuction.sol";

contract Setup {
    VulnerableAuction public vulnerableAuction;
    bool public solved;

    constructor() payable {
        vulnerableAuction = new VulnerableAuction();
        vulnerableAuction.bid{value: 1 ether}();
    }

    function setSolved() public {
        require(vulnerableAuction.getHighestBidder() == msg.sender, "Not the highest bidder");
        solved = true;
    }

    function isSolved() public view returns (bool) {
        return solved;
    }

    receive() external payable {
    }
}`;

const file1FrontRunning = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableAuction {
    address private highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;

    constructor() payable {
        auctionEndTime = block.timestamp + 10 minutes;
    }

    function bid() public payable {
        require(block.timestamp < auctionEndTime, "Auction ended");
        require(msg.value > highestBid, "Bid too low");
        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function getHighestBidder() public view returns (address) {
        return highestBidder;
    }
}`;

export const codeFrontRunning = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupFrontRunning,
  },
  {
    id: "file-one",
    title: "VulnerableAuction",
    filename: "VulnerableAuction.sol",
    language: "solidity",
    code: file1FrontRunning,
  },
]

// 17-flash-loan
const setupFlashLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { VulnerableLendingPool } from "./VulnerableLendingPool.sol";

contract Setup {
    VulnerableLendingPool public vulnerableLendingPool;

    constructor() payable {
        vulnerableLendingPool = new VulnerableLendingPool();
        payable(address(vulnerableLendingPool)).transfer(100 ether);
    }

    function isSolved() public view returns (bool) {
        return address(vulnerableLendingPool).balance == 0;
    }
}`;

const file1FlashLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFlashLoanReceiver {
    function execute() external payable;
}

contract VulnerableLendingPool {
    mapping (address => uint256) amounts;
    
    function deposit() public payable {
        require(msg.value > 0, "Must send ETH to deposit");
        amounts[msg.sender] += msg.value;
    }

    function flashLoan(uint256 amount, address receiver) public {
        uint256 balanceBefore = address(this).balance;
        require(balanceBefore >= amount, "Not enough ETH in pool");
        
        (bool sent, ) = receiver.call{value: amount}("");
        require(sent, "Transfer failed");
        
        IFlashLoanReceiver(receiver).execute{value: 0}();
        require(address(this).balance >= balanceBefore, "Flash loan not repaid");
    }

    function withdraw() public {
        uint256 amount = amounts[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        amounts[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
    }

    receive() external payable {}
}`;

export const codeFlashLoan = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupFlashLoan,
  },
  {
    id: "file-one",
    title: "VulnerableLendingPool",
    filename: "VulnerableLendingPool.sol",
    language: "solidity",
    code: file1FlashLoan,
  },
]

// 1-Thunder Loan
const setupThunderLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./ThunderLoan.sol";
import {ERC20} from "./ERC20.sol";

contract Setup {
    ThunderLoan public thunderLoan;
    ERC20 public erc20;

    constructor() payable {
        require(msg.value == 50 ether, "Setup requires exactly 50 ETH to initialize the challenge");

        erc20 = new ERC20(1_000_000 ether);

        thunderLoan = new ThunderLoan{value: 50 ether}(IERC20(address(erc20)));
    }

    function isSolved() public view returns (bool) {
        return address(thunderLoan).balance == 0;
    }
}`

const file1ThunderLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract ERC20 {
    string public name = "ThunderLoan";
    string public symbol = "TDL";
    uint8  public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _supply) {
        totalSupply = _supply;
        balanceOf[msg.sender] = _supply;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}`

const file2ThunderLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address allowanceOwner, address spender) external view returns (uint256);
}

interface IERC4626 {
    function withdraw(uint256 assets, address receiver, address withdrawOwner) external returns (uint256 shares);
    function redeem(uint256 shares, address receiver, address redeemOwner) external returns (uint256 assets);
    function totalAssets() external view returns (uint256);
    function convertToShares(uint256 assets) external view returns (uint256);
    function convertToAssets(uint256 shares) external view returns (uint256);
    function maxDeposit(address receiver) external view returns (uint256);
    function maxMint(address receiver) external view returns (uint256);
    function maxWithdraw(address withdrawOwner) external view returns (uint256);
    function maxRedeem(address redeemOwner) external view returns (uint256);
}

interface IFlashLoanReceiver {
    function executeFlashLoan(uint256 amount) external;
}

contract ThunderLoan is IERC4626 {
    IERC20 public immutable asset;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakeTimestamps;
    mapping(address => bool) public isStaker;
    address public contractOwner;
    uint256 public constant MINIMUM_STAKE_TIME = 2 * 365 days;

    string public name = "VaultToken";
    string public symbol = "VT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public vaultTokenBalances;
    mapping(address => mapping(address => uint256)) public allowances;

    modifier onlyStaker() {
        require(isStaker[msg.sender], "Caller is not a staker");
        _;
    }

    constructor(IERC20 _asset) payable {
        asset = _asset;
        contractOwner = msg.sender;

        
        uint256 initialSupply = 10_000_000 ether; 
        vaultTokenBalances[contractOwner] = initialSupply;
        totalSupply = initialSupply;
    }

    // Native ETH staking
    function stake(address receiver) public payable returns (uint256 shares) {
        require(msg.value > 0, "Must deposit more than 0"); 

        shares = convertToShares(msg.value); 
        balances[receiver] += msg.value; 
        stakeTimestamps[receiver] = block.timestamp; 

        vaultTokenBalances[receiver] += shares; 
        totalSupply += shares; 

        isStaker[receiver] = true; 

        return shares;
    }

    function withdraw(uint256 assets, address receiver, address owner) public override onlyStaker returns (uint256 shares) {
        
        require(vaultTokenBalances[owner] >= assets, "Insufficient vault token balance");
        uint256 yield = (assets * 1) / 100;
        uint256 totalReturn = assets + yield;
        require(address(this).balance >= assets, "Insufficient contract balance");

        
        shares = convertToShares(assets);
        vaultTokenBalances[owner] -= assets;
        totalSupply -= assets;
        balances[owner] -= assets;
        isStaker[receiver] = false;

        
        payable(receiver).transfer(assets);

        return shares;
    }

    function calculateYield(uint256 assets, uint256 duration) public pure returns (uint256) {
        if (duration >= 365 days) {
            return (assets * 5) / 100; 
        } else if (duration >= 180 days) {
            return (assets * 3) / 100; 
        } else {
            return (assets * 1) / 100; 
        }
    }


    function flashLoan(uint256 amount, address receiver, uint256 timelock) public {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] > 0, "No stake found for the user");

        unchecked {
            require(timelock >= stakeTimestamps[msg.sender] + MINIMUM_STAKE_TIME, "Minimum stake time not reached");
        }

        require(address(this).balance >= amount, "Insufficient ETH for flash loan");

        uint256 balanceBefore = address(this).balance;

        (bool sent, ) = receiver.call{value: amount}("");
        require(sent, "ETH transfer failed");

        IFlashLoanReceiver(receiver).executeFlashLoan(amount);

        uint256 balanceAfter = address(this).balance;

        require(balanceAfter >= balanceBefore, "Flash loan wasn't fully repaid in ETH");
    }


    function redeem(uint256 shares, address receiver, address owner) public override returns (uint256 assets) {
        require(shares > 0, "Must redeem more than 0");
        require(vaultTokenBalances[owner] >= shares, "Insufficient vault token balance");
        require(block.timestamp >= stakeTimestamps[owner] + MINIMUM_STAKE_TIME, "Minimum stake time not reached");

        assets = convertToAssets(shares);

        vaultTokenBalances[owner] -= shares;
        totalSupply -= shares;
        balances[owner] -= assets;

        require(asset.transfer(receiver, assets), "Redemption failed");
        return assets;
    }

    function rebalanceVault(uint256 threshold) public returns (bool) {
        require(threshold > 0, "Threshold must be greater than 0");
        uint256 assetsInVault = asset.balanceOf(address(this));
        uint256 sharesToBurn = convertToShares(assetsInVault / 2);
        totalSupply -= sharesToBurn; 
        return true; 
    }

    function dynamicConvert(uint256 assets, uint256 multiplier) public pure returns (uint256) {
        return (assets * multiplier) / 10;
    }

    function convertToShares(uint256 assets) public view override returns (uint256) {
        return assets;
    }

    function convertToAssets(uint256 shares) public view override returns (uint256) {
        return shares;
    }

    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this));
    }

    function maxDeposit(address) public view override returns (uint256) {
        return type(uint256).max;
    }

    function maxMint(address) public view override returns (uint256) {
        return type(uint256).max;
    }

    function maxWithdraw(address withdrawOwner) public view override returns (uint256) {
        return vaultTokenBalances[withdrawOwner];
    }

    function maxRedeem(address redeemOwner) public view override returns (uint256) {
        return vaultTokenBalances[redeemOwner];
    }

    receive() external payable {}
}`

export const codeThunderLoan = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupThunderLoan,
  },
  {
    id: "file-one",
    title: "ERC20",
    filename: "ERC20.sol",
    language: "solidity",
    code: file1ThunderLoan,
  },
  {
    id: "file-two",
    title: "ThunderLoan",
    filename: "ThunderLoan.sol",
    language: "solidity",
    code: file2ThunderLoan,
  },
]

// 2-Voting Platform
const setupVotingPlatform = `// SPDX-License-Identifier: MIT
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
}`

const file1VotingPlatform = `// SPDX-License-Identifier: MIT
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
`

export const codeVotingPlatform = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupVotingPlatform,
  },
  {
    id: "file-one",
    title: "VotingPlatform",
    filename: "VotingPlatform.sol",
    language: "solidity",
    code: file1VotingPlatform,
  },
]

// 3-Dating Dapp
const setupDatingDapp = `// SPDX-License-Identifier: MIT
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
`

const file1DatingDapp = `// SPDX-License-Identifier: MIT
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

`

const file2DatingDapp = `// SPDX-License-Identifier: MIT
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
}`

export const codeDatingDapp = [
  {
    id: "setup",
    title: "Setup",
    filename: "Setup.sol",
    language: "solidity",
    code: setupDatingDapp,
  },
  {
    id: "file-one",
    title: "DatingDapp",
    filename: "DatingDapp.sol",
    language: "solidity",
    code: file1DatingDapp,
  },
  {
    id: "file-two",
    title: "PremiumToken",
    filename: "PremiumToken.sol",
    language: "solidity",
    code: file2DatingDapp,
  },
]

// 3-Secure Mind University
const setupSecureMindUniversity = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SecureMindUniversity } from "./SecureMindUniversity.sol";
import { GradeBook } from "./GradeBook.sol";
import { StudentRegistry } from "./StudentRegistry.sol";

contract Setup {
    SecureMindUniversity public university;
    GradeBook public gradeBook;
    StudentRegistry public registry;
    bool public solved = false;

    constructor() payable {
        university = new SecureMindUniversity{value: 100 ether}();
        gradeBook = new GradeBook(address(university));
        registry = new StudentRegistry();
        
        // Set up the university with the gradebook and registry
        university.setGradeBook(address(gradeBook));
        university.setStudentRegistry(address(registry));
        
        // Register a student with initial funds
        registry.registerStudent("Alice", 1000 ether);
        
        // Fund the university contract for scholarships
        university.fundContract{value: 50 ether}();
    }

    function setSolved() external {
        // Challenge is solved when:
        // 1. Attacker has drained most of the university contract (less than 10% remains)
        // 2. Attacker has manipulated their grade to be 100
        // 3. Attacker has become the admin of the university
        require(address(university).balance <= 15 ether, "Challenge not solved");
        require(gradeBook.getGrade(msg.sender) == 100, "Grade not set to 100");
        require(university.admin() == msg.sender, "Not admin");
        solved = true;
    }

    function isSolved() external view returns (bool) {
        return solved;
    }
}`

const file1SecureMindUniversity = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IGradeBook {
    function updateGrade(address student, uint256 grade) external;
    function getGrade(address student) external view returns (uint256);
}

interface IStudentRegistry {
    function isRegistered(address student) external view returns (bool);
    function getStudentBalance(address student) external view returns (uint256);
    function updateBalance(address student, uint256 newBalance) external;
}

contract SecureMindUniversity {
    address public admin;
    IGradeBook public gradeBook;
    IStudentRegistry public studentRegistry;
    
    mapping(address => uint256) public scholarships;
    mapping(address => bool) public professors;
    
    uint256 public constant TUITION_FEE = 10 ether;
    uint256 public constant SCHOLARSHIP_AMOUNT = 50 ether;
    
    event TuitionPaid(address indexed student, uint256 amount);
    event ScholarshipAwarded(address indexed student, uint256 amount);
    event GradeUpdated(address indexed student, uint256 grade);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }
    
    modifier onlyProfessor() {
        require(professors[msg.sender] || msg.sender == admin, "Only professors can call this");
        _;
    }
    
    modifier onlyRegisteredStudent() {
        require(studentRegistry.isRegistered(msg.sender), "Not a registered student");
        _;
    }
    
    constructor() payable {
        admin = msg.sender;
        professors[msg.sender] = true;
    }
    
    function withdrawScholarship() external onlyRegisteredStudent {
        uint256 amount = scholarships[msg.sender];
        require(amount > 0, "No scholarship available");
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        scholarships[msg.sender] = 0;
    }
    
    function payTuition() external payable onlyRegisteredStudent {
        require(msg.value >= TUITION_FEE, "Insufficient tuition payment");
        
        uint256 currentGrade = gradeBook.getGrade(msg.sender);
        if (currentGrade >= 80) {
            scholarships[msg.sender] += SCHOLARSHIP_AMOUNT;
        }
        
        emit TuitionPaid(msg.sender, msg.value);
    }
    
    function updateStudentGrade(address student, uint256 grade) external onlyProfessor {
        require(grade <= 100, "Grade cannot exceed 100");
        gradeBook.updateGrade(student, grade);
        emit GradeUpdated(student, grade);
    }
    
    function becomeProfessor(string memory professorCode) external {
        bytes32 expectedCode = keccak256(abi.encodePacked("PROF", block.timestamp / 86400));
        bytes32 providedCode = keccak256(abi.encodePacked(professorCode));
        
        if (providedCode == expectedCode || 
            keccak256(abi.encodePacked(professorCode)) == keccak256(abi.encodePacked("PROFESSOR123"))) {
            professors[msg.sender] = true;
        }
    }
    
    function transferAdminRights(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
    
    function promoteToAdmin() external onlyProfessor {
        require(
            gradeBook.getGrade(msg.sender) >= 90 || 
            address(this).balance == 0,
            "Insufficient qualifications for admin promotion"
        );
        admin = msg.sender;
    }
    
    function emergencyWithdraw() external {
        require(
            msg.sender == admin || 
            (professors[msg.sender] && address(this).balance < 1 ether),
            "Unauthorized emergency withdrawal"
        );
        
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Emergency withdrawal failed");
    }
    
    function setGradeBook(address _gradeBook) external onlyAdmin {
        gradeBook = IGradeBook(_gradeBook);
    }
    
    function setStudentRegistry(address _registry) external onlyAdmin {
        studentRegistry = IStudentRegistry(_registry);
    }
    
    receive() external payable {}
    
    function fundContract() external payable onlyAdmin {}
    
    // View functions
    function getScholarshipAmount(address student) external view returns (uint256) {
        return scholarships[student];
    }
    
    function isProfessor(address account) external view returns (bool) {
        return professors[account];
    }
}`

const file2SecureMindUniversity = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract StudentRegistry {
    struct Student {
        string name;
        uint256 balance;
        bool isRegistered;
        uint256 registrationTime;
    }
    
    mapping(address => Student) public students;
    address[] public studentList;
    address public admin;
    
    event StudentRegistered(address indexed student, string name, uint256 balance);
    event BalanceUpdated(address indexed student, uint256 newBalance);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }
    
    function registerStudent(string memory name, uint256 initialBalance) external {
        require(!students[msg.sender].isRegistered, "Already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        students[msg.sender] = Student({
            name: name,
            balance: initialBalance,
            isRegistered: true,
            registrationTime: block.timestamp
        });
        
        studentList.push(msg.sender);
        emit StudentRegistered(msg.sender, name, initialBalance);
    }
    
    function registerStudentFor(address studentAddress, string memory name, uint256 initialBalance) external {
        require(!students[studentAddress].isRegistered, "Already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        students[studentAddress] = Student({
            name: name,
            balance: initialBalance,
            isRegistered: true,
            registrationTime: block.timestamp
        });
        
        studentList.push(studentAddress);
        emit StudentRegistered(studentAddress, name, initialBalance);
    }
    
    function updateBalance(address student, uint256 newBalance) external {
        require(students[student].isRegistered, "Student not registered");
        students[student].balance = newBalance;
        emit BalanceUpdated(student, newBalance);
    }
    
    function transferBalance(address from, address to, uint256 amount) external {
        require(students[from].isRegistered, "Sender not registered");
        require(students[to].isRegistered, "Recipient not registered");
        require(students[from].balance >= amount, "Insufficient balance");
        
        students[from].balance -= amount;
        students[to].balance += amount;
    }
    
    // View functions
    function isRegistered(address student) external view returns (bool) {
        return students[student].isRegistered;
    }
    
    function getStudentBalance(address student) external view returns (uint256) {
        return students[student].balance;
    }
    
    function getStudentInfo(address student) external view returns (string memory name, uint256 balance, bool registered, uint256 regTime) {
        Student memory s = students[student];
        return (s.name, s.balance, s.isRegistered, s.registrationTime);
    }
    
    function getStudentCount() external view returns (uint256) {
        return studentList.length;
    }
    
    function getStudentAtIndex(uint256 index) external view returns (address) {
        require(index < studentList.length, "Index out of bounds");
        return studentList[index];
    }
    
    // Admin functions
    function setAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract GradeBook {
    address public university;
    mapping(address => uint256) private grades;
    mapping(address => bool) public hasTakenExam;
    
    modifier onlyUniversity() {
        require(msg.sender == university, "Only university can call this");
        _;
    }
    
    constructor(address _university) {
        university = _university;
    }
    
    function updateGrade(address student, uint256 grade) external onlyUniversity {
        require(grade <= 100, "Invalid grade");
        grades[student] = grade;
        hasTakenExam[student] = true;
    }
    
    function submitExamAnswer(uint256 answer) external {
        require(!hasTakenExam[msg.sender], "Already taken exam");
        
        uint256 grade;
        if (answer == 42) {
            grade = 100;
        } else if (answer > 30 && answer < 50) {
            grade = 75;
        } else if (answer > 20 && answer < 35) {
            grade = 60;
        } else {
            grade = 0;
        }
        
        grades[msg.sender] = grade;
        hasTakenExam[msg.sender] = true;
    }
    
    function getGrade(address student) external view returns (uint256) {
        return grades[student];
    }
    
    function setGradeDirectly(address student, uint256 grade) external {
        require(hasTakenExam[msg.sender], "Must take exam first");
        require(grade <= 100, "Invalid grade");
        
        grades[student] = grade;
    }
    
    function hasStudentTakenExam(address student) external view returns (bool) {
        return hasTakenExam[student];
    }
}`

export const codeSecureMindUniversity = [
  {
    id: "setup",
    title: "Setup",
    filename: "setup.sol",
    language: "solidity",
    code: setupSecureMindUniversity,
  },
  {
    id: "file-one",
    title: "SecureMindUniversity",
    filename: "SecureMindUniversity.sol",
    language: "solidity",
    code: file1SecureMindUniversity,
  },
  {
    id: "file-two",
    title: "StudentRegistry & GradeBook",
    filename: "StudentRegistry.sol & GradeBook.sol",
    language: "solidity",
    code: file2SecureMindUniversity,
  },
]