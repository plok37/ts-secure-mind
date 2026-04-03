// Data for Learning pages, including title, description, and dangerous content for each vulnerability
import { sampleOverflowUnderflow, preventOverflowUnderflow,
  sampleStarter, preventStarter,
  sampleExploitContract, preventExploitContract,
  sampleExploitScript, preventExploitScript,
  sampleDenialOfService, preventDenialOfService,
  sampleHashCollision, preventHashCollision,
  samplePriceOracleManipulation, preventPriceOracleManipulation,
  sampleReentrancy, preventReentrancy,
  sampleBlockTimestampManipulation, preventBlockTimestampManipulation,
  sampleDelegatecallInjection, preventDelegatecallInjection,
  sampleInsecureRandomness, preventInsecureRandomness,
  sampleNftReentrancy, preventNftReentrancy,
  sampleAccessControl, preventAccessControl,
  sampleStorageCollision, preventStorageCollision,
  sampleInlineAssembly, preventInlineAssembly,
  sampleFrontRunning, preventFrontRunning,
  sampleFlashLoan, preventFlashLoan
 } from "@/LearningCodeBlockConstants";
 
import { quizStarter, quizAccessControl, quizBlockTimestampManipulation, quizDelegatecallInjection, quizDenialOfService, quizExploitContract, quizExploitScript, quizFlashLoan, quizFrontRunning, quizHashCollision, quizInlineAssembly, quizInsecureRandomness, quizNftReentrancy, quizOverflowUnderflow, quizReentrancy, quizPriceOracleManipulation, quizStorageCollision } from "@/quiz-data-constants";

// Importing code blocks for each vulnerability and scenario
import {
  codeExploitContract,
  codeStarter,
  codeDenialOfService,
  codeExploitScript,
  codeHashCollision,
  codeOverflowUnderflow,
  codePriceOracleManipulation,
  codeReentrancy,
  codeBlockTimestampManipulation,
  codeDelegatecallInjection,
  codeInsecureRandomness,
  codeNftReentrancy,
  codeAccessControl,
  codeStorageCollision,
  codeInlineAssembly,
  codeFrontRunning,
  codeFlashLoan,
  codeDatingDapp,
  codeSecureMindUniversity,
  codeThunderLoan,
  codeVotingPlatform
} from "@/ChallengeRealWorldCodeBlockConstants";

// For the real-world scenarios (HomePage), we have a list of cards that represent different scenarios. Each card has a number, title, content, gradient colors, and a scenario slug.
export const cardsData = [
  {
    number: "01",
    title: "Thunder Loan",
    content: "Learn how to audit smart contracts for vulnerabilities and best practices.",
    gradientColors: ["#edf0f5", "#b6c5d6"],
    scenario: "thunder-loan"
  },
  {
    number: "02",
    title: "Voting Platform",
    content: "Explore real-world DeFi hacks and how to secure decentralized finance protocols.",
    gradientColors: ["#dae2ea", "#a4b7cc"],
    scenario: "voting-platform"
  },
  {
    number: "03",
    title: "Dating dApp",
    content: "Understand the security challenges in NFT marketplaces and how to mitigate them.",
    gradientColors: ["#edf0f5", "#b6c5d6"],
    scenario: "dating-dapp"
  },
  {
    number: "04",
    title: "SecureMind University",
    content: "Best practices for keeping your crypto wallet safe from phishing and exploits.",
    gradientColors: ["#dae2ea", "#a4b7cc"],
    scenario: "secure-mind-university"
  }
];



// Data for Learning pages, including title, description, and dangerous content for each vulnerability
export const learningData = {
  "starter": {
    title: "Starter",
    description: "Welcome to your journey into smart contract security! This foundational section introduces you to the essential concepts of blockchain security, common vulnerability patterns, and the importance of secure coding practices. Whether you're new to smart contracts or looking to strengthen your security knowledge, this section provides the groundwork you'll need to identify, understand, and prevent security vulnerabilities in decentralized applications. Master these fundamentals before diving into specific vulnerability types and hands-on challenges.",
    dangerous: "These vulnerabilities can lead to unexpected behavior in smart contracts, allowing attackers to manipulate contract state or steal funds.",
    codeOfSample: sampleStarter,
    sampleExplaination: "This code demonstrates a basic smart contract structure with common patterns you'll encounter throughout your security learning journey. It shows a simple contract with state variables, functions, and basic access controls - the building blocks where vulnerabilities often emerge. Understanding this foundational structure is crucial as more complex vulnerabilities build upon these basic concepts. To interact with smart contracts, we could use the tool, 'cast' to send transactions, query state, and test functionality. We could use 'cast send' to execute a function and 'cast call' to query state. This foundational knowledge is essential for understanding how vulnerabilities can arise in more complex contracts. For instance, 'cast send 0xContract_Address 'withdraw(uint256) $ARGUMENTS --rpc-url $RPC_URL --private-key $PK' or 'cast call 0xContract_Address 'owner()' --rpc-url $RPC_URL'.",
    codeToPrevent: preventStarter,
    preventExplaination: "This code shows how to prevent overflow/underflow vulnerabilities by using safe math operations. This code shows how to prevent overflow/underflow asdf asdf asdfa sdfdd sdfsdf .",
    quizData: quizStarter,
  },
  "exploit-contract": {
    title: "Exploit Contract",
    description: "Master the art of writing exploit contracts to understand how attackers target vulnerable smart contracts. This section teaches you to think like an attacker by creating malicious contracts that can drain funds, manipulate state, or break intended functionality. Learning to write exploits is crucial for defensive programming - by understanding attack vectors, you'll become better at identifying and preventing vulnerabilities in your own contracts. This hands-on approach bridges the gap between theoretical knowledge and practical security implementation.",
    dangerous: "These vulnerabilities can lead to unexpected behavior in smart contracts, allowing attackers to manipulate contract state or steal funds.",
    codeOfSample: sampleExploitContract,
    sampleExplaination: "This exploit contract demonstrates how an attacker can systematically target a vulnerable contract using multiple attack vectors. The contract includes functions to identify weaknesses, execute coordinated attacks, and extract maximum value from the target. Notice how the exploit contract maintains its own state to track attack progress and implements fallback functions to handle unexpected scenarios during the exploitation process. To use it, we could just simply deploy the exploit contract to the blockchain using 'forge create $PATH_TO_CONTRACT --rpc-url $RPC --private-key $PK' command with the target contract address as an argument as designed in the constructor of the sample given. After deployment, we could use call the functions in the contract using 'cast send' for state-changing transactions and 'cast call' for non state-changing transactions.",
    codeToPrevent: preventExploitContract,
    preventExplaination: "This code shows how to prevent overflow/underflow vulnerabilities by using safe math operations. This code shows how to prevent overflow/underflow asdf asdf asdfa sdfdd sdfsdf .",
    quizData: quizExploitContract,
  },
  "exploit-script": {
    title: "Exploit Script",
    description: "Master Foundry exploit scripts that automate complex attacks using Solidity scripting. Unlike exploit contracts that are deployed and remain on-chain, exploit scripts are Foundry's Script contracts that execute temporarily to orchestrate attacks, deploy multiple contracts, and coordinate sophisticated exploitations. These scripts inherit from Foundry's Script base contract and use vm.startBroadcast() to execute transactions. Understanding exploit scripts is crucial for red team exercises, security testing, and comprehending how attackers use automated tooling to execute complex multi-step attacks against DeFi protocols and smart contract systems.",
    dangerous: "These vulnerabilities can lead to unexpected behavior in smart contracts, allowing attackers to manipulate contract state or steal funds.",
    codeOfSample: sampleExploitScript,
    sampleExplaination: "This Foundry exploit script demonstrates how attackers use Solidity-based automation to execute sophisticated attacks. The script inherits from Foundry's Script contract and uses vm.startBroadcast() to coordinate multiple transactions, deploy attack contracts, and extract profits. Notice how the script can deploy multiple contracts, coordinate complex attack sequences, and handle the entire exploitation lifecycle in a single automated execution. The script is executed using 'forge script' command with network parameters.",
    codeToPrevent: preventExploitScript,
    preventExplaination: "This code shows how to prevent overflow/underflow vulnerabilities by using safe math operations. This code shows how to prevent overflow/underflow asdf asdf asdfa sdfdd sdfsdf .",
    quizData: quizExploitScript,
  },
  "overflow-underflow": {
    title: "Overflow/Underflow",
    description: "Master integer overflow and underflow vulnerabilities that occur when arithmetic operations exceed the maximum or minimum values that can be stored in a variable type. In older Solidity versions (pre-0.8.0), these vulnerabilities were critical attack vectors that allowed attackers to manipulate balances, bypass checks, and drain funds. While Solidity 0.8.0+ includes automatic overflow protection, understanding these vulnerabilities is essential for auditing legacy contracts, working with unchecked blocks, and recognizing when manual validation is required. Learn how attackers exploit mathematical edge cases to break contract logic.",
    dangerous: "Integer overflow and underflow vulnerabilities can allow attackers to manipulate token balances, bypass security checks, mint unlimited tokens, or drain contract funds. These vulnerabilities have been responsible for millions of dollars in losses across DeFi protocols, making them one of the most historically significant smart contract attack vectors.",
    codeOfSample: sampleOverflowUnderflow,
    sampleExplaination: "This vulnerable contract demonstrates classic integer overflow and underflow scenarios in Solidity versions before 0.8.0. The contract shows how arithmetic operations can wrap around when exceeding variable limits, allowing attackers to manipulate balances and bypass security checks. Notice how the withdraw function can be exploited through underflow to create massive balances, and how the mint function can overflow to reset large balances to small values. These patterns were extremely common in early DeFi protocols.",
    codeToPrevent: preventOverflowUnderflow,
    preventExplaination: "This secure implementation shows multiple strategies to prevent overflow and underflow attacks. The code demonstrates using SafeMath libraries for Solidity <0.8.0, leveraging built-in overflow protection in Solidity >=0.8.0, and implementing manual checks where needed. Key prevention techniques include using require statements for bounds checking, utilizing OpenZeppelin's SafeMath library, and properly handling edge cases in arithmetic operations.",
    quizData: quizOverflowUnderflow,
  },
  "denial-of-service": {
    title: "Denial of Service",
    description: "Understand Denial of Service (DoS) attacks in smart contracts where attackers deliberately cause functions to fail, consume excessive gas, or become permanently unusable. Unlike traditional network DoS attacks, smart contract DoS vulnerabilities exploit gas limits, failed external calls, and unbounded loops to render contracts inoperable. These attacks can lock user funds, prevent withdrawals, disrupt auctions, and halt entire protocol operations. Learning DoS attack vectors is crucial for building resilient contracts that can handle malicious inputs and maintain availability under adversarial conditions.",
    dangerous: "DoS vulnerabilities can completely halt contract functionality, lock user funds indefinitely, disrupt critical protocol operations, and cause significant financial losses. Attackers can exploit these vulnerabilities to manipulate markets, prevent legitimate users from accessing their funds, or force protocols into emergency shutdown states, potentially affecting entire DeFi ecosystems.",
    codeOfSample: sampleDenialOfService,
    sampleExplaination: "This vulnerable bank contract demonstrates three common DoS attack vectors in a simple, easy-to-understand format. The contract shows how unbounded loops in `distributeRewards()` can hit gas limits as the user base grows, how external call failures in `withdraw()` can cause transaction reverts, and how the `withdrawAll()` function can be completely blocked if any single user's transfer fails. These patterns are common in DeFi protocols and demonstrate how seemingly innocent operations can become attack vectors as the system scales.",
    codeToPrevent: preventDenialOfService,
    preventExplaination: "This secure bank contract demonstrates essential DoS prevention strategies using clear, simple patterns. The code shows batch processing with limits in `distributeRewards()` to prevent gas limit issues, pull-over-push patterns in withdrawal functions to isolate external call failures, and circuit breaker functionality for emergency situations. Key prevention techniques include limiting loop iterations, using `call()` instead of `transfer()` for better gas handling, and implementing emergency pause mechanisms that can halt operations during attacks.",
    quizData: quizDenialOfService,
  },
  "hash-collision": {
    title: "Hash Collision",
    description: "Master hash collision vulnerabilities that occur when different inputs produce the same hash output, potentially allowing attackers to manipulate contract logic. Hash collisions can affect signature verification, merkle tree validation, access control systems, and data integrity checks. While cryptographic hash functions are designed to be collision-resistant, improper implementation, weak hashing algorithms, or insufficient input validation can create exploitable vulnerabilities. Understanding hash collisions is crucial for implementing secure authentication, authorization, and data validation mechanisms in smart contracts.",
    dangerous: "Hash collision vulnerabilities can allow attackers to bypass authentication systems, forge signatures, manipulate merkle proofs, gain unauthorized access to restricted functions, and corrupt data integrity checks. These vulnerabilities can lead to complete system compromise, unauthorized fund transfers, and the ability to impersonate legitimate users or administrators.",
    codeOfSample: sampleHashCollision,
    sampleExplaination: "This simplified authentication contract demonstrates common hash collision vulnerabilities in an easy-to-understand format. The contract shows how predictable hash generation in the `login()` function can be exploited, how simple token verification without nonces can be bypassed, and how authorization systems can be vulnerable to hash collisions. Notice how the contract uses basic `keccak256(abi.encodePacked(...))` calls without additional entropy sources like salts or nonces, making it possible for attackers to find or create hash collisions.",
    codeToPrevent: preventHashCollision,
    preventExplaination: "This secure authentication contract demonstrates essential hash collision prevention using simple, clear patterns. The code shows how to use salts and nonces in hash generation, implement proper collision detection, and add entropy sources like `block.chainid` for additional security. Key prevention techniques include incrementing nonces after use, checking for hash reuse, and using multiple entropy sources in the `generateSecureSalt()` function to make hash collisions extremely difficult to exploit.",
    quizData: quizHashCollision,
  },
  "price-oracle-manipulation": {
    title: "Price Oracle Manipulation",
    description: "Master price oracle manipulation vulnerabilities that occur when attackers exploit price feeds to manipulate asset valuations in DeFi protocols. Price oracles provide external price data to smart contracts, but they can be manipulated through flash loans, sandwich attacks, or by targeting vulnerable oracle designs. These attacks can affect lending protocols, automated market makers, and any system that relies on external price data. Understanding oracle manipulation is crucial for building secure DeFi applications that depend on accurate price information for critical financial decisions.",
    dangerous: "Price oracle manipulation can lead to massive financial losses, including liquidation of healthy positions, artificial arbitrage opportunities, protocol insolvency, and market manipulation. Attackers can drain lending pools, manipulate collateralization ratios, and extract millions of dollars by temporarily distorting price feeds. These attacks have been responsible for some of the largest DeFi exploits in history.",
    codeOfSample: samplePriceOracleManipulation,
    sampleExplaination: "This simplified contract demonstrates the core vulnerability in price oracle manipulation. The contract shows how directly using `priceFeed.getLatestPrice()` without any validation or protection can be exploited by attackers. Notice how the `borrow()` function only checks if the price is positive but doesn't validate the price source, implement time-weighted averages, or check for price deviations. This makes it vulnerable to flash loan attacks where attackers can temporarily manipulate the oracle price to their advantage.",
    codeToPrevent: preventPriceOracleManipulation,
    preventExplaination: "This secure implementation demonstrates essential price oracle protection using clear, simple patterns. The code shows how to implement proper price validation with Chainlink oracles, including staleness checks, round data consistency validation, and time-based borrowing restrictions. Key prevention techniques include checking if price data is fresh (not older than 1 hour), validating round data consistency to ensure data integrity, and implementing minimum time intervals between borrows to prevent rapid manipulation attacks.",
    quizData: quizPriceOracleManipulation,
  },
  "reentrancy": {
    title: "Reentrancy",
    description: "Master reentrancy attacks, one of the most critical and devastating smart contract vulnerabilities. Reentrancy occurs when a function makes an external call to another untrusted contract before finishing its execution, allowing the external contract to call back into the original function and manipulate its state. This vulnerability was responsible for the infamous DAO hack of 2016, which resulted in the loss of 3.6 million ETH and led to the Ethereum hard fork. Understanding reentrancy is essential for any smart contract developer, as it represents a fundamental flaw in how contracts handle external interactions and state management.",
    dangerous: "Reentrancy vulnerabilities can lead to complete drainage of contract funds, manipulation of critical state variables, and catastrophic financial losses. Attackers can exploit these vulnerabilities to withdraw more funds than they're entitled to, break token economics, or cause protocol insolvency. The DAO hack alone resulted in losses worth hundreds of millions of dollars, making reentrancy one of the most financially devastating vulnerability classes in blockchain history.",
    codeOfSample: sampleReentrancy,
    sampleExplaination: "This vulnerable contract demonstrates the classic reentrancy pattern that has been exploited in numerous high-profile attacks. The `withdraw()` function first sends Ether to the caller using `call{value: amount}(\"\")`, but only updates the user's balance afterward. This creates a critical window where an attacker can use a malicious contract's `receive()` function to call `withdraw()` again before their balance is reset to zero. Notice how the external call happens before the state update - this is the fundamental flaw that enables reentrancy attacks.",
    codeToPrevent: preventReentrancy,
    preventExplaination: "This secure implementation demonstrates the essential \"Checks-Effects-Interactions\" pattern for preventing reentrancy attacks. The fix is simple but crucial: update the user's balance (`balances[msg.sender] = 0`) before making the external call to send Ether. This ensures that if the recipient contract tries to call `withdraw()` again, the balance check will fail because the balance has already been reset. This pattern should be applied to all functions that make external calls after modifying state.",
    quizData: quizReentrancy,
  },
  "block-timestamp-manipulation": {
    title: "Block Timestamp Manipulation",
    description: "Discover how smart contracts that depend on block timestamps for timing can be exploited by miners and attackers. Block timestamp manipulation occurs when contracts use block.timestamp for critical decisions like auction endings, random number generation, or access control timing. Since miners have some control over when they publish blocks and can adjust timestamps within reasonable limits, they can potentially influence these timing-dependent operations to their advantage. This vulnerability is particularly dangerous in DeFi protocols, gambling applications, and time-sensitive auctions where precise timing affects outcomes and financial rewards.",
    dangerous: "Block timestamp manipulation can allow attackers to influence auction outcomes, manipulate random number generation, bypass time-based restrictions, and exploit contracts that rely on precise timing for security.",
    codeOfSample: sampleBlockTimestampManipulation,
    sampleExplaination: "This vulnerable auction contract relies on block.timestamp for timing decisions. Miners can manipulate timestamps within certain bounds, potentially allowing them to extend auctions, influence random number generation, or bypass time-based security measures.",
    codeToPrevent: preventBlockTimestampManipulation,
    preventExplaination: "This secure version uses block numbers instead of timestamps for critical timing decisions, implements external randomness sources, and includes time range validation to detect suspicious timing patterns and prevent manipulation.",
    quizData: quizBlockTimestampManipulation,
  },
  "delegatecall-injection": {
    title: "Delegatecall Injection",
    description: "Master delegatecall injection vulnerabilities that occur when contracts use delegatecall with user-controlled addresses or data. Delegatecall is a powerful low-level function that executes code from another contract while preserving the calling contract's storage context. When attackers can control the target address or calldata, they can inject malicious code that runs with the victim contract's privileges and storage layout. This vulnerability is particularly dangerous in proxy contracts, upgradeable systems, and contracts that implement dynamic functionality through delegatecall.",
    dangerous: "Delegatecall injection can lead to complete contract takeover, unauthorized storage modifications, fund theft, and privilege escalation. Attackers can overwrite critical storage variables like owner addresses, drain contract balances, manipulate contract logic, and gain administrative control over the entire system. This vulnerability has been responsible for major DeFi exploits and can compromise entire protocol ecosystems.",
    codeOfSample: sampleDelegatecallInjection,
    sampleExplaination: "This vulnerable proxy contract demonstrates how delegatecall injection can occur when user input controls the target address. The `execute()` function allows anyone to specify both the target contract and the calldata, giving attackers complete control over what code executes in the context of the proxy. An attacker can deploy a malicious contract that overwrites the `owner` variable or drains the contract's balance, then call `execute()` with their malicious contract's address.",
    codeToPrevent: preventDelegatecallInjection,
    preventExplaination: "This secure implementation demonstrates essential delegatecall protection strategies. The code shows how to whitelist approved implementation addresses, implement proper access controls, and validate calldata signatures. Key prevention techniques include maintaining an approved contracts mapping, using the `onlyOwner` modifier to restrict who can call delegatecall functions, and implementing function signature validation to ensure only expected functions can be called.",
    quizData: quizDelegatecallInjection,
  },
  "insecure-randomness": {
    title: "Insecure Randomness",
    description: "Discover how smart contracts that rely on predictable sources of randomness can be exploited by attackers. Insecure randomness occurs when contracts use blockchain data like block.timestamp, block.difficulty, or block.number to generate random numbers for critical decisions. Since this data is publicly available and can be influenced by miners, attackers can predict or manipulate outcomes in gambling contracts, lotteries, NFT minting, and random selections. Understanding secure randomness is essential for any application that requires fair and unpredictable outcomes.",
    dangerous: "Insecure randomness can allow attackers to predict lottery outcomes, manipulate gambling results, exploit NFT rarity systems, and gain unfair advantages in any chance-based mechanism. Attackers can calculate outcomes in advance and only participate when they know they will win, leading to significant financial losses for other users and protocol operators.",
    codeOfSample: sampleInsecureRandomness,
    sampleExplaination: "This vulnerable lottery contract demonstrates classic insecure randomness patterns. The `pickWinner()` function uses block.timestamp and block.difficulty to generate random numbers, but these values are predictable and can be influenced by miners. An attacker can calculate the winner before the drawing occurs and only buy tickets when they know they will win.",
    codeToPrevent: preventInsecureRandomness,
    preventExplaination: "This secure implementation demonstrates proper randomness using Chainlink VRF (Verifiable Random Function) and commit-reveal schemes. The code shows how to request truly random numbers from external oracles and implement a two-phase system where users first commit to their participation, then reveal after a random seed is established, preventing prediction and manipulation.",
    quizData: quizInsecureRandomness,
  },
  "nft-reentrancy": {
    title: "NFT Re-entrancy",
    description: "NFT re-entrancy occurs when an attacker exploits the token transfer callbacks in ERC721 contracts to re-enter the contract during a transaction, potentially manipulating state or stealing funds.",
    dangerous: "NFT re-entrancy vulnerabilities can allow attackers to purchase NFTs multiple times with a single payment, manipulate marketplace state, or drain contract funds by exploiting the callback mechanisms in ERC721 transfers.",
    codeOfSample: sampleNftReentrancy,
    sampleExplaination: "This vulnerable NFT marketplace contract demonstrates how an attacker can exploit ERC721's safeTransferFrom callback to re-enter the buyNFT function before the listing is marked as inactive, allowing multiple purchases with one payment.",
    codeToPrevent: preventNftReentrancy,
    preventExplaination: "This secure version uses OpenZeppelin's ReentrancyGuard modifier and follows the checks-effects-interactions pattern, ensuring state changes happen before external calls and preventing re-entrancy attacks.",
    quizData: quizNftReentrancy,
  },
  "access-control": {
    title: "Access Control",
    description: "Access control vulnerabilities occur when smart contracts fail to properly restrict who can execute critical functions, allowing unauthorized users to perform privileged operations.",
    dangerous: "Access control vulnerabilities can allow attackers to steal funds, modify contract state, or gain administrative privileges. They are among the most critical security issues in smart contracts.",
    codeOfSample: sampleAccessControl,
    sampleExplaination: "This vulnerable wallet contract demonstrates two common access control issues: missing access control on the withdraw function and improper use of tx.origin for authentication, allowing anyone to drain the contract.",
    codeToPrevent: preventAccessControl,
    preventExplaination: "This secure version uses OpenZeppelin's Ownable contract and proper access control modifiers, ensuring only authorized users can execute privileged functions and using msg.sender instead of tx.origin.",
    quizData: quizAccessControl,
  },
  "storage-collision": {
    title: "Storage Collision",
    description: "Storage collision is a critical vulnerability that occurs most often in upgradeable (proxy) smart contracts. It happens when two contracts—typically the original logic contract and its upgraded version—use the same storage slot for different variables. This can lead to old data being misinterpreted as new variables, causing unexpected overwrites, bugs, or even security vulnerabilities. For example, if the first version of a contract stores a uint256 at slot 0 and the upgraded version stores an address at slot 0, the new contract will interpret the old value as an address, which can have disastrous consequences. Understanding storage layout and how Solidity assigns storage slots is essential for working with upgradeable contracts.",
    dangerous: "Storage collision vulnerabilities can result in data corruption, loss of funds, or even total contract takeover. Attackers may exploit overwritten variables to gain unauthorized access, become the contract owner, or manipulate balances. Even without a direct attacker, accidental overwrites can break contract logic, making upgrades dangerous if not handled with care. These issues are subtle and often go unnoticed until after an upgrade, making them risky in production systems.",
    codeOfSample: sampleStorageCollision,
    sampleExplaination: "This example demonstrates a classic storage collision scenario in upgradeable contracts. In LogicV1, the variable 'value' is stored at slot 0. In LogicV2, the new variable 'owner' is also placed at slot 0, while 'value' moves to slot 1. After upgrading, the contract will interpret the old 'value' as the new 'owner', which can lead to unauthorized access or loss of control. This highlights why changing the order or type of variables in upgradeable contracts is extremely dangerous.",
    codeToPrevent: preventStorageCollision,
    preventExplaination: "To prevent storage collisions, always append new variables to the end of the storage layout and never change the order or type of existing variables. The prevention example shows a safe upgradeable contract pattern: new variables are added after existing ones, and a storage gap (e.g., uint256[50] private __gap) is reserved for future upgrades. This approach, recommended by OpenZeppelin, ensures that future changes do not accidentally overwrite existing storage. Always review storage layouts carefully before upgrading, and consider using automated tools to check for collisions.",
    quizData: quizStorageCollision,
  },
  "inline-assembly": {
    title: "Inline Assembly",
    description: "Inline assembly in Solidity allows developers to write low-level EVM (Ethereum Virtual Machine) instructions directly within smart contracts. While it can be powerful for optimizing performance or accessing features not available in high-level Solidity, it bypasses many of the safety checks and protections provided by the language. This makes it easy to introduce subtle bugs or vulnerabilities, especially for those unfamiliar with EVM internals. Inline assembly should be used sparingly and only when absolutely necessary.",
    dangerous: "Using inline assembly can lead to critical vulnerabilities such as incorrect memory access, type confusion, reentrancy, or even total loss of contract funds. Since assembly code is not checked by the Solidity compiler for safety, mistakes can go unnoticed and be exploited by attackers. Even small errors can have catastrophic consequences, making contracts difficult to audit and maintain.",
    codeOfSample: sampleInlineAssembly,
    sampleExplaination: "This simple example shows how inline assembly can be used to bypass Solidity's safety checks. The function uses assembly to directly set a storage variable, but a typo or wrong slot index could overwrite important data. Inline assembly can also be used to perform unchecked arithmetic, which may lead to overflows or underflows even in Solidity 0.8.0 and later. Always be cautious when reading or writing to storage using assembly, as it can easily break contract invariants.",
    codeToPrevent: preventInlineAssembly,
    preventExplaination: "To prevent vulnerabilities, avoid using inline assembly unless absolutely necessary. If you must use it, keep the code as short and simple as possible, add thorough comments, and review it carefully. Prefer high-level Solidity constructs, which are safer and easier to audit. If you need low-level operations, use well-tested libraries or patterns from trusted sources. Always test and audit any assembly code extensively before deploying to production.",
    quizData: quizInlineAssembly,
  },
  "front-running": {
    title: "Front-running",
    description: "Front-running is a type of attack where someone observes a pending transaction in the mempool and quickly submits their own transaction with a higher gas fee to get ahead in the execution order. In DeFi, this can allow attackers to profit by anticipating and exploiting user actions, such as buying tokens before a large order or outbidding in an auction. Understanding front-running is crucial for building secure smart contracts that interact with public blockchains.",
    dangerous: "Front-running vulnerabilities can allow attackers to steal profits, manipulate prices, win auctions unfairly, or drain funds from users. Because all pending transactions are visible before being mined, attackers (including miners and bots) can exploit this transparency to their advantage, leading to significant financial losses and unfair outcomes for regular users.",
    codeOfSample: sampleFrontRunning,
    sampleExplaination: "This code demonstrates a simple auction contract that is vulnerable to front-running. When a user places a bid, the transaction is visible in the mempool, allowing an attacker to see the bid and quickly submit a higher bid with a higher gas price. The attacker’s transaction is likely to be mined first, letting them win the auction unfairly. This illustrates how public transaction ordering can be exploited in DeFi protocols.",
    codeToPrevent: preventFrontRunning,
    preventExplaination: "This code shows how to prevent front-running in auctions using a commit-reveal scheme. Instead of submitting bids directly, users first commit to a hashed bid, then reveal their actual bid in a later phase. This prevents attackers from knowing the true value of bids in advance, making it impossible to front-run. Commit-reveal and similar cryptographic patterns are essential for protecting users from transaction ordering attacks in public blockchains.",
    quizData: quizFrontRunning,
  },
  "flash-loan": {
    title: "Flash Loan",
    description: "A flash loan is a special type of loan in DeFi that lets anyone borrow any available amount of assets instantly and without collateral, as long as they pay it back within the same transaction. If the loan is not repaid by the end of the transaction, the whole transaction is reverted. Flash loans are powerful tools for arbitrage, refinancing, and other advanced strategies, but they can also be abused if smart contracts are not carefully designed.",
    dangerous: "Flash loan vulnerabilities can allow attackers to borrow huge amounts of tokens, manipulate prices, drain liquidity pools, or exploit logic errors in a single atomic transaction. Because the loan must be repaid in the same transaction, attackers can chain together multiple actions—like manipulating oracles or draining funds—without ever risking their own money. Many high-profile DeFi hacks have used flash loans to exploit vulnerable contracts.",
    codeOfSample: sampleFlashLoan,
    sampleExplaination: "This simple contract shows a vulnerable lending pool with a flash loan function. The attacker can borrow all the pool's funds, perform an exploit (like manipulating a price or draining another contract), and repay the loan in the same transaction. If the loan is not repaid, the transaction fails, but if the exploit succeeds, the attacker keeps the profit. This example highlights how easy it is to use flash loans for attacks if contracts do not have proper checks.",
    codeToPrevent: preventFlashLoan,
    preventExplaination: "This prevention example shows a safer flash loan pattern. The contract checks that the pool's balance is the same before and after the flash loan, ensuring no funds are lost. It also restricts what actions can be performed during the loan and can add extra checks, like only allowing trusted contracts to use the flash loan. Always validate all state changes and use reentrancy guards to prevent complex attacks.",
    quizData: quizFlashLoan,
  },
};

export type LearningSlug = keyof typeof learningData;












// Data for challenge pages, including title and description for each vulnerability.
export const challengeData = {
  "starter": {
    title: "Starter Challenge",
    description: "Kick off your smart contract security journey with a hands-on introduction to basic vulnerabilities and secure coding practices. This challenge is designed to help you get comfortable with the structure of smart contracts, understand how state changes work, and recognize the importance of careful function design before you tackle more advanced exploits.",
    codeToDisplay: codeStarter,
    port: 37001
  },
  "exploit-contract": {
    title: "Exploit Contract",
    description: "Dive into the world of contract exploitation—learn to spot and exploit common flaws in Ethereum smart contracts. By interacting with intentionally vulnerable contracts, you'll develop an attacker's mindset and gain practical experience in identifying and leveraging weaknesses to your advantage.",
    codeToDisplay: codeExploitContract,
    port: 37002
  },
  "exploit-script": {
    title: "Exploit Script",
    description: "Automate your attacks! Write scripts to exploit vulnerable contracts and understand the power of off-chain automation. This challenge demonstrates how attackers use scripting tools to coordinate complex, multi-step exploits that would be difficult or impossible to execute manually.",
    codeToDisplay: codeExploitScript,
    port: 37003
  },
  "overflow-underflow": {
    title: "Overflow/Underflow",
    description: "Master integer overflow and underflow attacks—see how simple math errors can lead to catastrophic losses. You'll learn how attackers exploit arithmetic bugs to manipulate balances, bypass checks, and drain funds, and why modern Solidity versions include built-in protections.",
    codeToDisplay: codeOverflowUnderflow,
    port: 37004
  },
  "denial-of-service": {
    title: "Denial of Service",
    description: "Disrupt contract functionality by exploiting denial of service vectors. Can you make the contract unusable for others? This challenge explores how attackers can lock funds, block withdrawals, or halt protocol operations by exploiting gas limits, failed external calls, or unbounded loops.",
    codeToDisplay: codeDenialOfService,
    port: 37005
  },
  "hash-collision": {
    title: "Hash Collision",
    description: "Manipulate hash functions to create collisions and bypass contract logic. Learn why unique identifiers matter and how improper use of hashing can allow attackers to impersonate users, bypass authentication, or corrupt data integrity.",
    codeToDisplay: codeHashCollision,
    port: 37006
  },
  "price-oracle-manipulation": {
    title: "Price Oracle Manipulation",
    description: "Exploit weak oracles to manipulate asset prices and drain lending pools. Control the market to your advantage! This challenge demonstrates how attackers can use flash loans or other techniques to temporarily distort price feeds and profit at the expense of protocols and users.",
    codeToDisplay: codePriceOracleManipulation,
    port: 37007
  },
  "reentrancy": {
    title: "Reentrancy",
    description: "Perform a classic reentrancy attack—repeatedly call back into a contract to drain its funds before it can react. You'll see firsthand how improper ordering of state changes and external calls can lead to devastating exploits, as in the infamous DAO hack.",
    codeToDisplay: codeReentrancy,
    port: 37008
  },
  "block-timestamp-manipulation": {
    title: "Block Timestamp Manipulation",
    description: "Leverage block timestamp dependencies to manipulate game outcomes or contract logic. Time is on your side! This challenge shows how miners and attackers can influence block timestamps to win games, bypass restrictions, or trigger unintended contract behavior.",
    codeToDisplay: codeBlockTimestampManipulation,
    port: 37009
  },
  "delegatecall-injection": {
    title: "Delegatecall Injection",
    description: "Abuse delegatecall to execute code in the context of another contract. Hijack storage and seize control! You'll learn how improper use of delegatecall can allow attackers to overwrite critical variables, gain admin privileges, or execute arbitrary code.",
    codeToDisplay: codeDelegatecallInjection,
    port: 37010
  },
  "insecure-randomness": {
    title: "Insecure Randomness",
    description: "Predict and exploit weak sources of randomness to win lotteries or games. Break the illusion of chance by understanding how blockchain data can be manipulated or predicted, and why secure randomness is essential for fair outcomes.",
    codeToDisplay: codeInsecureRandomness,
    port: 37011
  },
  "nft-reentrancy": {
    title: "NFT Re-entrancy",
    description: "Explore reentrancy vulnerabilities in NFT contracts—can you mint or steal more than you should? This challenge highlights how ERC721 callbacks can be abused to manipulate state or drain funds in NFT marketplaces and minting contracts.",
    codeToDisplay: codeNftReentrancy,
    port: 37012
  },
  "access-control": {
    title: "Access Control",
    description: "Bypass or escalate privileges by exploiting flawed access control mechanisms. Become the contract owner! You'll see how missing or misused access checks can allow attackers to steal funds, change contract logic, or take over critical functions.",
    codeToDisplay: codeAccessControl,
    port: 37013
  },
  "storage-collision": {
    title: "Storage Collision",
    description: "Take advantage of storage layout mismatches in upgradeable contracts to overwrite critical variables. This challenge demonstrates the subtle dangers of proxy patterns and why careful storage management is essential for safe upgrades.",
    codeToDisplay: codeStorageCollision,
    port: 37014
  },
  "inline-assembly": {
    title: "Inline Assembly",
    description: "Find and exploit bugs introduced by unsafe inline assembly code. Low-level power, high-level risk! You'll see how bypassing Solidity's safety checks can introduce subtle, dangerous vulnerabilities that are hard to detect and easy to exploit.",
    codeToDisplay: codeInlineAssembly,
    port: 37015
  },
  "front-running": {
    title: "Front-running",
    description: "Outpace your opponents by front-running their transactions. Manipulate the mempool for profit by observing pending transactions and submitting your own with higher gas fees to gain an unfair advantage in auctions, trades, or other time-sensitive operations.",
    codeToDisplay: codeFrontRunning,
    port: 37016
  },
  "flash-loan": {
    title: "Flash Loan",
    description: "Leverage flash loans to exploit contract logic in a single atomic transaction. Infinite capital, instant profit! This challenge shows how attackers can borrow massive amounts of assets, manipulate protocol state, and repay the loan—all within one transaction, leaving protocols vulnerable to rapid, high-impact exploits.",
    codeToDisplay: codeFlashLoan,
    port: 37017
  },
};

// set VulnerabilitySlug type to be the keys of challengeData, for typing handling
export type VulnerabilitySlug = keyof typeof challengeData;

// For the learning and challenge page, we need to map each vulnerability slug to its corresponding icon.
export const iconMap: Record<string, string> = {
  "starter": "/vulnerability-topics-icons/learning-challenge/starter.svg",
  "exploit-contract": "/vulnerability-topics-icons/learning-challenge/exploit-contract.svg",
  "exploit-script": "/vulnerability-topics-icons/learning-challenge/exploit-script.svg",
  "overflow-underflow": "/vulnerability-topics-icons/learning-challenge/overflow-underflow.svg",
  "denial-of-service": "/vulnerability-topics-icons/learning-challenge/dos.svg",
  "hash-collision": "/vulnerability-topics-icons/learning-challenge/hash-collision.svg",
  "short-address": "/vulnerability-topics-icons/learning-challenge/short-address.svg",
  "reentrancy": "/vulnerability-topics-icons/learning-challenge/reentrancy.svg",
  "block-timestamp-manipulation": "/vulnerability-topics-icons/learning-challenge/timestamp-manipulation.svg",
  "delegatecall-injection": "/vulnerability-topics-icons/learning-challenge/delegatecall-injection.svg",
  "insecure-randomness": "/vulnerability-topics-icons/learning-challenge/insecure-randomness.svg",
  "nft-reentrancy": "/vulnerability-topics-icons/learning-challenge/nft-reentrancy.svg",
  "access-control": "/vulnerability-topics-icons/learning-challenge/access-control.svg",
  "storage-collision": "/vulnerability-topics-icons/learning-challenge/storage-collision.svg",
  "inline-assembly": "/vulnerability-topics-icons/learning-challenge/inline-assembly.svg",
  "front-running": "/vulnerability-topics-icons/learning-challenge/front-running.svg",
  "flash-loan": "/vulnerability-topics-icons/learning-challenge/flash-loan.svg",
};

// Map challenge port for each vulnerability (example: starter=37001, exploit-contract=37002, ...)
export const portMap: Record<string, number> = {
  "starter": 37001,
  "exploit-contract": 37002,
  "exploit-script": 37003,
  "overflow-underflow": 37004,
  "denial-of-service": 37005,
  "hash-collision": 37006,
  "short-address": 37007,
  "reentrancy": 37008,
  "block-timestamp-manipulation": 37009,
  "delegatecall-injection": 37010,
  "insecure-randomness": 37011,
  "nft-reentrancy": 37012,
  "access-control": 37013,
  "storage-collision": 37014,
  "inline-assembly": 37015,
  "front-running": 37016,
  "flash-loan": 37017,
  "thunder-loan": 38001,
  "voting-platform": 38002,
  "dating-dapp": 38003,
  "secure-mind-university": 38004
};






// Data for real-world scenario pages, including title and description for each scenario.
export const scenarioData = {
  "thunder-loan": {
    title: "Thunder Loan",
    description: "At long last, you stand before the Thunder Vault, the legendary DeFi stronghold, the culmination of your perilous journey through the world of decentralized lending. Your escape from this digital labyrinth hinges upon mastering the forbidden arts of flash loans, price oracle trickery, and reentrancy sorcery. The Vault is no mere contract—it is a living enchantment, a sentinel woven from liquidity and code, judging all who dare approach. It sees you, divining your intent, weighing your worth in the balance of capital and cunning. But you seek not to be a mere participant, but the Usurper. Defy the Vault's ancient logic. Drain its riches, yet leave no trace, no echo of your passing. Become the unseen, the unwritten, the legend whispered in the mempools but never confirmed. Outwit the Vault. Become a phantom, a myth. Your escape, your destiny, awaits.",
    codeToDisplay: codeThunderLoan,
    port: 38001
  },
  "voting-platform": {
    title: "Voting Platform",
    description: "At the heart of the on-chain republic stands the Assembly Hall, a citadel of governance and intrigue. Here, the fate of protocols is decided by tokens and whispers, by votes cast and secrets kept. But the Hall is no passive arena—it is a living will, a guardian of order, ever watchful for those who would subvert its process. You are not content to be a mere voter. You are the Challenger, the unseen hand. Manipulate the tides of power with flash loans, sway the outcome with cunning, and pass through the Assembly's defenses as a shadow in the night. Leave no mark, no trace, no hint of your influence. Become the myth that haunts the halls of governance, the legend that shapes the future unseen. Your revolution, your legend, begins now.",
    codeToDisplay: codeVotingPlatform,
    port: 38002
  },
  "dating-dapp": {
    title: "Dating dApp",
    description: "Beyond the veil of code lies the Garden of Hearts, a realm where love and blockchain entwine. Here, NFT profiles shimmer with promise, and every match is a dance of fate and cryptography. But the Garden is no mere playground—it is a living puzzle, a guardian of secrets, testing all who seek connection. You are not just a seeker of love, but the Trickster, the unseen suitor. Manipulate the algorithms, steal the rarest profiles, and slip past the gates of access control as a phantom in the code. Leave no digital footprint, no broken heart, no evidence of your passage. Become the legend whispered in the smart contracts, the myth that shapes destinies unseen. Your conquest, your enigma, awaits.",
    codeToDisplay: codeDatingDapp,
    port: 38003
  },
  "secure-mind-university": {
    title: "SecureMind University",
    description: "At the summit of cryptographic wisdom stands SecureMind University, a fortress of knowledge and peril. Its halls are guarded by proxy patterns, its gates by storage enigmas, its very foundation by the magic of upgradeable contracts. The University is no passive institution—it is a living trial, a judge of all who seek mastery. You are not merely a student, but the Usurper of secrets. Exploit the hidden flaws, rewrite the rules of storage, and ascend the ranks unseen. Leave no trace in the ledgers, no echo in the proxies, no sign of your ascent. Become the myth that haunts the archives, the legend that rewrites the future. Your graduation, your legend, is at hand.",
    codeToDisplay: codeSecureMindUniversity,
    port: 38004
  }
};

// set VulnerabilitySlug type to be the keys of challengeData, for typing handling
export type ScenarioSlug = keyof typeof scenarioData;