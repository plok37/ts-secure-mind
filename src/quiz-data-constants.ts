export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // index of the correct answer in options
  explanation?: string;
}

// 1-starter
export const quizStarter: QuizQuestion[] = [
  {
    question: "What is an integer overflow in smart contracts?",
    options: [
      "When a variable exceeds its maximum value and wraps around to zero or a negative number.",
      "When a contract runs out of gas.",
      "When a function is called with too many arguments.",
      "When a contract is deployed on the wrong network."
    ],
    answer: 0,
    explanation: "Integer overflow occurs when a value exceeds the maximum limit of its data type, causing it to wrap around to zero or a negative value."
  },
  {
    question: "Which of the following can help prevent overflow/underflow vulnerabilities?",
    options: [
      "Using unchecked blocks everywhere.",
      "Using SafeMath or built-in checked arithmetic.",
      "Ignoring compiler warnings.",
      "Increasing the gas limit."
    ],
    answer: 1,
    explanation: "SafeMath or Solidity's built-in checked arithmetic (from 0.8.x) helps prevent overflow/underflow by reverting on such operations."
  },
  {
    question: "What happens if an attacker exploits an underflow in a smart contract?",
    options: [
      "The contract will always revert.",
      "The attacker can manipulate the contract state, possibly stealing funds.",
      "Nothing, underflows are harmless.",
      "The contract will be deleted."
    ],
    answer: 1,
    explanation: "Exploiting an underflow can allow an attacker to manipulate contract state, which may lead to loss of funds or other unintended behavior."
  }
];

// 2-exploit-contract
export const quizExploitContract: QuizQuestion[] = [
  {
    question: "What is an integer overflow in smart contracts?",
    options: [
      "When a variable exceeds its maximum value and wraps around to zero or a negative number.",
      "When a contract runs out of gas.",
      "When a function is called with too many arguments.",
      "When a contract is deployed on the wrong network."
    ],
    answer: 0,
    explanation: "Integer overflow occurs when a value exceeds the maximum limit of its data type, causing it to wrap around to zero or a negative value."
  },
  {
    question: "Which of the following can help prevent overflow/underflow vulnerabilities?",
    options: [
      "Using unchecked blocks everywhere.",
      "Using SafeMath or built-in checked arithmetic.",
      "Ignoring compiler warnings.",
      "Increasing the gas limit."
    ],
    answer: 1,
    explanation: "SafeMath or Solidity's built-in checked arithmetic (from 0.8.x) helps prevent overflow/underflow by reverting on such operations."
  },
  {
    question: "What happens if an attacker exploits an underflow in a smart contract?",
    options: [
      "The contract will always revert.",
      "The attacker can manipulate the contract state, possibly stealing funds.",
      "Nothing, underflows are harmless.",
      "The contract will be deleted."
    ],
    answer: 1,
    explanation: "Exploiting an underflow can allow an attacker to manipulate contract state, which may lead to loss of funds or other unintended behavior."
  }
];

// 3-exploit-script
export const quizExploitScript: QuizQuestion[] = [
  {
    question: "What is an integer overflow in smart contracts?",
    options: [
      "When a variable exceeds its maximum value and wraps around to zero or a negative number.",
      "When a contract runs out of gas.",
      "When a function is called with too many arguments.",
      "When a contract is deployed on the wrong network."
    ],
    answer: 0,
    explanation: "Integer overflow occurs when a value exceeds the maximum limit of its data type, causing it to wrap around to zero or a negative value."
  },
  {
    question: "Which of the following can help prevent overflow/underflow vulnerabilities?",
    options: [
      "Using unchecked blocks everywhere.",
      "Using SafeMath or built-in checked arithmetic.",
      "Ignoring compiler warnings.",
      "Increasing the gas limit."
    ],
    answer: 1,
    explanation: "SafeMath or Solidity's built-in checked arithmetic (from 0.8.x) helps prevent overflow/underflow by reverting on such operations."
  },
  {
    question: "What happens if an attacker exploits an underflow in a smart contract?",
    options: [
      "The contract will always revert.",
      "The attacker can manipulate the contract state, possibly stealing funds.",
      "Nothing, underflows are harmless.",
      "The contract will be deleted."
    ],
    answer: 1,
    explanation: "Exploiting an underflow can allow an attacker to manipulate contract state, which may lead to loss of funds or other unintended behavior."
  }
];

// 4-overflow-underflow
export const quizOverflowUnderflow: QuizQuestion[] = [
  {
    question: "What is an integer overflow in smart contracts?",
    options: [
      "When a variable exceeds its maximum value and wraps around to zero or a negative number.",
      "When a contract runs out of gas.",
      "When a function is called with too many arguments.",
      "When a contract is deployed on the wrong network."
    ],
    answer: 0,
    explanation: "Integer overflow occurs when a value exceeds the maximum limit of its data type, causing it to wrap around to zero or a negative value."
  },
  {
    question: "Which of the following can help prevent overflow/underflow vulnerabilities?",
    options: [
      "Using unchecked blocks everywhere.",
      "Using SafeMath or built-in checked arithmetic.",
      "Ignoring compiler warnings.",
      "Increasing the gas limit."
    ],
    answer: 1,
    explanation: "SafeMath or Solidity's built-in checked arithmetic (from 0.8.x) helps prevent overflow/underflow by reverting on such operations."
  },
  {
    question: "What happens if an attacker exploits an underflow in a smart contract?",
    options: [
      "The contract will always revert.",
      "The attacker can manipulate the contract state, possibly stealing funds.",
      "Nothing, underflows are harmless.",
      "The contract will be deleted."
    ],
    answer: 1,
    explanation: "Exploiting an underflow can allow an attacker to manipulate contract state, which may lead to loss of funds or other unintended behavior."
  }
];

// 5-denial-of-service
export const quizDenialOfService: QuizQuestion[] = [
  {
    question: "What is a Denial of Service (DoS) attack in smart contracts?",
    options: [
      "An attack that steals funds from a contract.",
      "An attack that makes a contract unusable or causes functions to fail permanently.",
      "An attack that changes the contract's source code.",
      "An attack that deploys malicious contracts."
    ],
    answer: 1,
    explanation: "A DoS attack in smart contracts makes functions unusable, causes them to fail permanently, or prevents users from interacting with the contract, often by exploiting gas limits or external call failures."
  },
  {
    question: "Which of the following can cause a gas limit DoS attack?",
    options: [
      "Using SafeMath for arithmetic operations.",
      "Processing an unbounded array in a single transaction.",
      "Implementing proper access controls.",
      "Using the latest Solidity version."
    ],
    answer: 1,
    explanation: "Processing an unbounded array (like looping through all users) in a single transaction can consume excessive gas and hit the block gas limit, causing the function to fail permanently as the array grows."
  },
  {
    question: "What is the 'pull-over-push' pattern used for?",
    options: [
      "To increase gas efficiency in loops.",
      "To prevent external call failures from blocking other operations.",
      "To reduce contract deployment costs.",
      "To improve contract upgradeability."
    ],
    answer: 1,
    explanation: "The pull-over-push pattern prevents external call failures from blocking other operations by letting users withdraw funds individually rather than pushing payments to multiple recipients in batch operations."
  },
  {
    question: "How can a circuit breaker help prevent DoS attacks?",
    options: [
      "By automatically fixing vulnerable code.",
      "By providing emergency pause functionality during attacks.",
      "By increasing the gas limit for transactions.",
      "By encrypting sensitive contract data."
    ],
    answer: 1,
    explanation: "A circuit breaker provides emergency pause functionality that allows contract owners to halt operations during attacks, preventing further damage and allowing time to implement fixes."
  },
  {
    question: "Which is safer for external transfers in smart contracts?",
    options: [
      "Using transfer() because it's simpler.",
      "Using send() because it returns a boolean.",
      "Using call() because it provides more control over gas and error handling.",
      "Using selfdestruct() to force send Ether."
    ],
    answer: 2,
    explanation: "Using call() is safer because it provides more control over gas limits and error handling, allowing contracts to handle failures gracefully without reverting the entire transaction."
  }
];

// 6-hash-collision
export const quizHashCollision: QuizQuestion[] = [
  {
    question: "What is a hash collision in the context of smart contracts?",
    options: [
      "When two different inputs produce the same hash output.",
      "When a hash function runs out of memory.",
      "When a hash function takes too long to compute.",
      "When a hash function produces random outputs."
    ],
    answer: 0,
    explanation: "A hash collision occurs when two different inputs produce the same hash output, which can be exploited to bypass security mechanisms that rely on hash uniqueness."
  },
  {
    question: "Which of the following can help prevent hash collision attacks?",
    options: [
      "Using shorter hash outputs for faster computation.",
      "Using nonces and salts to increase hash uniqueness.",
      "Removing input validation from hash functions.",
      "Using the same hash input for all operations."
    ],
    answer: 1,
    explanation: "Using nonces (numbers used once) and salts (random data) increases hash uniqueness and makes it much harder for attackers to create hash collisions."
  },
  {
    question: "Why are hash collisions particularly dangerous in signature verification?",
    options: [
      "They make signatures load faster.",
      "They allow attackers to forge valid signatures for unauthorized actions.",
      "They reduce the gas cost of transactions.",
      "They improve contract performance."
    ],
    answer: 1,
    explanation: "Hash collisions in signature verification allow attackers to create different messages that produce the same hash, enabling them to forge valid signatures and perform unauthorized actions."
  },
  {
    question: "What is the purpose of using a nonce in hash-based authentication?",
    options: [
      "To make the hash function run faster.",
      "To reduce the size of the hash output.",
      "To ensure each hash is unique and prevent replay attacks.",
      "To make the hash function more predictable."
    ],
    answer: 2,
    explanation: "A nonce ensures that each hash is unique by providing a different input each time, preventing replay attacks and making hash collisions much more difficult to exploit."
  },
  {
    question: "How can merkle tree implementations be vulnerable to hash collisions?",
    options: [
      "By using too many leaf nodes in the tree.",
      "By allowing identical hashes to be treated as different nodes.",
      "By making the tree too deep.",
      "By storing too much data in each node."
    ],
    answer: 1,
    explanation: "Merkle trees can be vulnerable when identical hashes are treated as different nodes, allowing attackers to create fraudulent proofs by exploiting hash collisions between different tree branches."
  }
];

// 7-price-oracle-manipulation
export const quizPriceOracleManipulation: QuizQuestion[] = [
  {
    question: "What is price oracle manipulation in DeFi protocols?",
    options: [
      "Changing the source code of price feeds.",
      "Temporarily distorting price data to exploit lending or trading protocols.",
      "Permanently breaking price oracle contracts.",
      "Increasing transaction fees for price queries."
    ],
    answer: 1,
    explanation: "Price oracle manipulation involves temporarily distorting price data (often using flash loans) to exploit protocols that rely on this data for critical financial decisions like liquidations or trades."
  },
  {
    question: "Which of the following is a common method used to manipulate price oracles?",
    options: [
      "Using time-weighted average prices (TWAP).",
      "Flash loan attacks to temporarily skew market prices.",
      "Implementing multiple oracle sources.",
      "Adding price staleness checks."
    ],
    answer: 1,
    explanation: "Flash loan attacks allow attackers to borrow large amounts without collateral, manipulate prices in AMMs or DEXs, exploit the distorted prices, and repay the loan in the same transaction."
  },
  {
    question: "What is a Time-Weighted Average Price (TWAP) and why is it useful?",
    options: [
      "A price that changes every second to be more accurate.",
      "An average price calculated over a period of time to reduce manipulation impact.",
      "The highest price recorded in a trading session.",
      "A price that includes transaction fees."
    ],
    answer: 1,
    explanation: "TWAP calculates the average price over a time period, making it much harder for attackers to manipulate since they would need to maintain artificial prices for an extended duration, which is costly."
  },
  {
    question: "How can price staleness checks help prevent oracle manipulation?",
    options: [
      "By making prices update faster.",
      "By ensuring price data is recent and hasn't been stale for too long.",
      "By reducing the cost of price queries.",
      "By encrypting price data."
    ],
    answer: 1,
    explanation: "Price staleness checks ensure that price data is recent and fresh, preventing the use of outdated prices that might not reflect current market conditions or could be from a manipulated state."
  },
  {
    question: "Why is it dangerous for a protocol to rely on a single price oracle?",
    options: [
      "It makes the contract run slower.",
      "It creates a single point of failure that can be manipulated or compromised.",
      "It increases gas costs significantly.",
      "It makes the code more complex."
    ],
    answer: 1,
    explanation: "Relying on a single price oracle creates a single point of failure. If that oracle is manipulated, compromised, or fails, the entire protocol becomes vulnerable to exploitation or incorrect pricing decisions."
  }
];

// 8-reentrancy
export const quizReentrancy: QuizQuestion[] = [
  {
    question: "What is a reentrancy attack in smart contracts?",
    options: [
      "When a function calls itself recursively without limits.",
      "When an external contract calls back into the original contract before the first execution finishes.",
      "When a contract runs out of gas during execution.",
      "When multiple users try to call the same function simultaneously."
    ],
    answer: 1,
    explanation: "A reentrancy attack occurs when an external contract calls back into the original contract before the first function call has completed, potentially allowing manipulation of contract state and draining of funds."
  },
  {
    question: "What was the significance of the DAO hack in 2016?",
    options: [
      "It was the first smart contract deployed on Ethereum.",
      "It demonstrated a successful reentrancy attack that drained 3.6 million ETH and led to Ethereum's hard fork.",
      "It proved that smart contracts are completely secure.",
      "It was the largest ICO in blockchain history."
    ],
    answer: 1,
    explanation: "The DAO hack was a devastating reentrancy attack that exploited a vulnerable withdraw function, resulting in the loss of 3.6 million ETH (worth hundreds of millions of dollars) and ultimately led to the Ethereum hard fork to recover the funds."
  },
  {
    question: "Which pattern is most effective for preventing reentrancy attacks?",
    options: [
      "Checks-Effects-Interactions pattern",
      "Using only internal functions",
      "Adding more require statements",
      "Using assembly code for all operations"
    ],
    answer: 0,
    explanation: "The Checks-Effects-Interactions pattern prevents reentrancy by ensuring that all state changes happen before any external calls. This means that if an external contract tries to call back, the state has already been updated and the attack fails."
  },
  {
    question: "In the vulnerable reentrancy example, what enables the attack?",
    options: [
      "The function doesn't check the user's balance.",
      "The external call (sending Ether) happens before updating the balance.",
      "The function is marked as payable.",
      "The contract doesn't have an owner."
    ],
    answer: 1,
    explanation: "The vulnerability occurs because the external call to send Ether happens before the user's balance is updated to zero. This allows an attacker's contract to call the withdraw function again during the external call, before their balance is reset."
  },
  {
    question: "What is the correct order of operations to prevent reentrancy?",
    options: [
      "External call → State update → Input validation",
      "Input validation → External call → State update",
      "State update → Input validation → External call",
      "Input validation → State update → External call"
    ],
    answer: 3,
    explanation: "The correct order is: 1) Input validation (checks), 2) State update (effects), and 3) External call (interactions). This Checks-Effects-Interactions pattern ensures that state is updated before any external calls that could trigger reentrancy."
  }
];

// 9-block-timestamp-manipulation
export const quizBlockTimestampManipulation: QuizQuestion[] = [
  {
    question: "What is the main vulnerability in contracts that rely on block.timestamp for critical timing decisions?",
    options: [
      "Miners can manipulate timestamps within a certain range to their advantage.",
      "Timestamps are always incorrect on the blockchain.",
      "Block timestamps cause integer overflow vulnerabilities.",
      "Timestamps cannot be read by smart contracts."
    ],
    answer: 0,
    explanation: "Miners can manipulate block timestamps within approximately 15 seconds of the actual time, allowing them to influence time-based contract logic like auctions, random number generation, and access controls."
  },
  {
    question: "In the vulnerable auction contract, how can an attacker exploit the timestamp dependency?",
    options: [
      "By changing the system clock on their computer.",
      "By being a miner and setting block.timestamp to extend the auction or influence timing.",
      "By sending transactions with future timestamps.",
      "By using a different timezone."
    ],
    answer: 1,
    explanation: "Miners can manipulate the block.timestamp within reasonable bounds to extend auction times, influence bid timing, or manipulate any time-based logic that depends on block.timestamp."
  },
  {
    question: "What is a better alternative to using block.timestamp for critical timing in smart contracts?",
    options: [
      "Using block.number for timing decisions.",
      "Using the current date from an external API.",
      "Using block.difficulty for timing.",
      "Using msg.sender as a timestamp."
    ],
    answer: 0,
    explanation: "Block numbers are much more difficult to manipulate than timestamps and provide more predictable timing. Since blocks are mined at relatively consistent intervals, using block numbers for timing is more secure."
  },
  {
    question: "Why is using block.timestamp for random number generation dangerous?",
    options: [
      "Because timestamps are always sequential and predictable.",
      "Because miners can influence the timestamp to manipulate randomness outcomes.",
      "Because timestamps use too much gas to compute.",
      "Because timestamps are encrypted and cannot be used for randomness."
    ],
    answer: 1,
    explanation: "When randomness depends on block.timestamp, miners can manipulate the timestamp within allowed bounds to influence random outcomes, potentially affecting lottery results, random selections, or any chance-based mechanisms."
  },
  {
    question: "What additional security measure should be implemented when using external randomness sources?",
    options: [
      "Always use block.timestamp as backup randomness.",
      "Validate the randomness input and combine it with multiple entropy sources.",
      "Only use randomness during specific hours of the day.",
      "Store randomness values in public variables for transparency."
    ],
    answer: 1,
    explanation: "External randomness should be validated (not zero/empty) and combined with multiple entropy sources like block.difficulty and block.number to make manipulation more difficult and ensure randomness quality."
  }
];

export const quizDelegatecallInjection: QuizQuestion[] = [
  {
    question: "What is the main danger of delegatecall injection vulnerabilities?",
    options: [
      "Attackers can execute malicious code in the context of the victim contract.",
      "Delegatecall uses too much gas and causes transactions to fail.",
      "Delegatecall can only be used with approved contracts.",
      "Delegatecall automatically transfers ownership of the contract."
    ],
    answer: 0,
    explanation: "Delegatecall injection allows attackers to execute arbitrary code in the calling contract's context, potentially overwriting storage variables, stealing funds, or taking control of the contract."
  },
  {
    question: "In the vulnerable proxy contract, what makes the execute() function dangerous?",
    options: [
      "It doesn't check the gas limit for the delegatecall.",
      "Users can specify both the target contract address and the calldata.",
      "It only works with contracts deployed by the owner.",
      "It automatically sends all the contract's Ether to the caller."
    ],
    answer: 1,
    explanation: "The vulnerability exists because users have complete control over both the target address and the calldata, allowing them to execute any function from any contract in the proxy's context."
  },
  {
    question: "How can an attacker use delegatecall injection to steal funds from a proxy contract?",
    options: [
      "By calling the withdraw function directly.",
      "By deploying a malicious contract that transfers funds and calling execute() with it.",
      "By sending Ether directly to the proxy contract.",
      "By changing the proxy's source code."
    ],
    answer: 1,
    explanation: "An attacker can deploy a malicious contract with a function that transfers funds, then use the vulnerable execute() function to delegatecall into their malicious contract, causing it to run in the proxy's context and steal funds."
  },
  {
    question: "What is the most effective way to prevent delegatecall injection attacks?",
    options: [
      "Never use delegatecall in smart contracts.",
      "Implement a whitelist of approved implementation contracts and restrict access.",
      "Only allow delegatecall during specific times of day.",
      "Use delegatecall only with contracts that have been audited."
    ],
    answer: 1,
    explanation: "The most effective prevention is to maintain a whitelist of approved implementation contracts, restrict access to authorized users (like the owner), and validate function signatures to ensure only safe functions can be called."
  },
  {
    question: "Why is function signature validation important in preventing delegatecall injection?",
    options: [
      "Function signatures determine the gas cost of the delegatecall.",
      "It ensures only specific, safe functions can be executed via delegatecall.",
      "Function signatures are required for all external calls.",
      "It prevents the delegatecall from failing due to invalid parameters."
    ],
    answer: 1,
    explanation: "Function signature validation ensures that only predefined, safe functions can be called through delegatecall, preventing attackers from calling dangerous functions that could compromise the contract's security."
  }
];

export const quizInsecureRandomness: QuizQuestion[] = [
  {
    question: "What is insecure randomness in smart contracts?",
    options: [
      "Using predictable sources like block.timestamp or block.number for random numbers.",
      "Using too many random numbers in a single transaction.",
      "Generating random numbers too frequently.",
      "Using random numbers that are too large."
    ],
    answer: 0,
    explanation: "Insecure randomness occurs when contracts use predictable blockchain data like timestamps or block numbers for randomness, allowing attackers to predict or manipulate outcomes."
  },
  {
    question: "Which of the following is NOT a secure source of randomness for smart contracts?",
    options: [
      "Chainlink VRF (Verifiable Random Function)",
      "Block.timestamp combined with block.difficulty",
      "External oracle-based randomness",
      "Commit-reveal schemes"
    ],
    answer: 1,
    explanation: "Block.timestamp and block.difficulty are predictable and manipulable by miners, making them insecure for randomness. The other options provide more secure randomness sources."
  },
  {
    question: "What can attackers do with predictable randomness in a gambling contract?",
    options: [
      "Predict outcomes and only participate when they will win.",
      "Increase the randomness quality.",
      "Reduce gas costs for random number generation.",
      "Improve the contract's security."
    ],
    answer: 0,
    explanation: "With predictable randomness, attackers can calculate outcomes in advance and only participate when they know they will win, giving them an unfair advantage."
  },
  {
    question: "How does a commit-reveal scheme help improve randomness security?",
    options: [
      "It makes random number generation faster.",
      "It prevents participants from knowing the outcome before committing to participate.",
      "It reduces the gas cost of random number generation.",
      "It automatically generates truly random numbers."
    ],
    answer: 1,
    explanation: "Commit-reveal schemes require participants to commit to their participation before the random seed is revealed, preventing them from only participating when they know they will win."
  },
  {
    question: "Why is Chainlink VRF considered a secure source of randomness?",
    options: [
      "It's faster than blockchain-based randomness.",
      "It provides verifiable randomness from external oracles that can't be manipulated by miners.",
      "It's cheaper than other randomness sources.",
      "It doesn't require any smart contract integration."
    ],
    answer: 1,
    explanation: "Chainlink VRF provides cryptographically secure and verifiable randomness from external oracles, making it impossible for miners or other parties to predict or manipulate the random numbers."
  }
];

export const quizNftReentrancy: QuizQuestion[] = [
  {
    question: "What makes NFT contracts particularly vulnerable to re-entrancy attacks?",
    options: [
      "NFTs are more expensive than regular tokens.",
      "ERC721's safeTransferFrom function includes a callback to the recipient.",
      "NFTs can only be transferred once.",
      "NFT contracts don't use gas optimization."
    ],
    answer: 1,
    explanation: "ERC721's safeTransferFrom includes an onERC721Received callback to the recipient, which can be exploited to re-enter the original contract during execution."
  },
  {
    question: "In a vulnerable NFT marketplace, what could an attacker achieve through re-entrancy?",
    options: [
      "Delete all NFTs from the marketplace.",
      "Purchase multiple NFTs with a single payment by re-entering before state updates.",
      "Change the ownership of the contract.",
      "Increase the gas limit of transactions."
    ],
    answer: 1,
    explanation: "An attacker can exploit the callback mechanism to re-enter the purchase function multiple times before the listing state is updated, buying multiple NFTs with one payment."
  },
  {
    question: "Which pattern should be followed to prevent NFT re-entrancy attacks?",
    options: [
      "Interactions-Effects-Checks pattern.",
      "Checks-Effects-Interactions pattern.",
      "Effects-Interactions-Checks pattern.",
      "Random execution order."
    ],
    answer: 1,
    explanation: "The Checks-Effects-Interactions pattern ensures all state changes happen before external calls, preventing re-entrancy vulnerabilities."
  },
  {
    question: "What is the purpose of OpenZeppelin's ReentrancyGuard?",
    options: [
      "To optimize gas usage in contracts.",
      "To prevent functions from being called while they're still executing.",
      "To automatically refund excess payments.",
      "To validate NFT metadata."
    ],
    answer: 1,
    explanation: "ReentrancyGuard prevents functions from being called recursively, protecting against re-entrancy attacks by blocking subsequent calls while execution is in progress."
  }
];

export const quizAccessControl: QuizQuestion[] = [
  {
    question: "What is the main problem with access control vulnerabilities in smart contracts?",
    options: [
      "They make contracts run slower.",
      "They allow unauthorized users to execute privileged functions.",
      "They increase gas costs for legitimate users.",
      "They prevent contracts from being deployed."
    ],
    answer: 1,
    explanation: "Access control vulnerabilities allow unauthorized users to execute functions that should be restricted to specific roles like owners or admins, potentially leading to fund theft or state manipulation."
  },
  {
    question: "Why is using tx.origin for authentication dangerous?",
    options: [
      "It's more expensive than msg.sender in terms of gas.",
      "It can be exploited through phishing attacks where a malicious contract tricks users.",
      "It doesn't work on all Ethereum networks.",
      "It's deprecated and will be removed in future Solidity versions."
    ],
    answer: 1,
    explanation: "tx.origin refers to the original external account that started the transaction chain. A malicious contract can trick users into calling it, then use the user's tx.origin to bypass authentication checks."
  },
  {
    question: "What is the most secure way to implement access control in smart contracts?",
    options: [
      "Use tx.origin to verify the original transaction sender.",
      "Use msg.sender with proper role-based access control modifiers.",
      "Store passwords in plain text within the contract.",
      "Allow all functions to be called by anyone."
    ],
    answer: 1,
    explanation: "Using msg.sender with proper access control modifiers (like onlyOwner) is the most secure approach. It ensures that only the immediate caller with the correct permissions can execute privileged functions."
  },
  {
    question: "What does the 'onlyOwner' modifier typically do?",
    options: [
      "It prevents all users from calling the function.",
      "It allows only the contract owner to execute the function.",
      "It makes the function cost more gas to execute.",
      "It automatically transfers ownership to the caller."
    ],
    answer: 1,
    explanation: "The onlyOwner modifier restricts function execution to only the contract owner, providing a basic but effective access control mechanism for administrative functions."
  },
  {
    question: "In the vulnerable wallet example, what allows anyone to drain the contract?",
    options: [
      "The deposit function doesn't validate the amount.",
      "The withdraw function has no access control check.",
      "The contract doesn't have enough gas.",
      "The balance tracking is incorrect."
    ],
    answer: 1,
    explanation: "The withdraw function lacks any access control check, meaning anyone can call it and withdraw funds from the contract, regardless of whether they are the owner or have deposited funds."
  }
];

export const quizStorageCollision: QuizQuestion[] = [
  {
    question: "What is storage collision in the context of upgradeable smart contracts?",
    options: [
      "When two contracts use the same storage slot for different variables, causing data to be overwritten or misinterpreted.",
      "When a contract runs out of storage space.",
      "When two contracts have the same contract address.",
      "When a contract stores too much data in a single variable."
    ],
    answer: 0,
    explanation: "Storage collision occurs when two contracts (often in upgradeable proxy patterns) use the same storage slot for different variables. This can cause old data to be misinterpreted as new variables, leading to bugs or vulnerabilities."
  },
  {
    question: "Why is storage collision dangerous in upgradeable contracts?",
    options: [
      "It can cause data corruption, unauthorized access, or loss of funds.",
      "It only affects the contract's performance.",
      "It makes the contract more expensive to deploy.",
      "It has no real impact on contract security."
    ],
    answer: 0,
    explanation: "Storage collision can result in overwritten variables, which may allow attackers to gain control, corrupt balances, or break contract logic after an upgrade."
  },
  {
    question: "How can you prevent storage collision when upgrading a contract?",
    options: [
      "Always append new variables to the end of the storage layout and never change the order or type of existing variables.",
      "Add new variables at the top of the contract.",
      "Remove unused variables to save space.",
      "Change variable types to optimize storage."
    ],
    answer: 0,
    explanation: "To prevent storage collision, always add new variables at the end of the contract and never change the order or type of existing variables. Using a storage gap (e.g., uint256[50] private __gap) is also recommended for future upgrades."
  },
  {
    question: "What is the purpose of a storage gap (e.g., uint256[50] private __gap) in upgradeable contracts?",
    options: [
      "To reserve storage slots for future variables and prevent accidental collisions.",
      "To increase the contract's gas efficiency.",
      "To store temporary data during contract execution.",
      "To make the contract compatible with all blockchains."
    ],
    answer: 0,
    explanation: "A storage gap reserves extra storage slots for future variables, making it safer to upgrade contracts without risking storage collisions."
  }
];

// 10-inline-assembly
export const quizInlineAssembly: QuizQuestion[] = [
  {
    question: "What is inline assembly in Solidity?",
    options: [
      "A way to write low-level EVM instructions directly inside Solidity code.",
      "A tool for compiling smart contracts.",
      "A method for importing external libraries.",
      "A feature for automatic code optimization."
    ],
    answer: 0,
    explanation: "Inline assembly allows developers to write raw EVM instructions within Solidity, giving more control but less safety."
  },
  {
    question: "How does inline assembly work in a Solidity contract?",
    options: [
      "By using the 'assembly' keyword to write EVM instructions inside a function.",
      "By calling external contracts only.",
      "By using require statements for validation.",
      "By deploying contracts with a special compiler."
    ],
    answer: 0,
    explanation: "The 'assembly' keyword lets you write EVM instructions directly inside Solidity functions, bypassing many compiler checks."
  },
  {
    question: "Why is inline assembly dangerous in smart contracts?",
    options: [
      "It bypasses Solidity's safety checks and can introduce critical bugs or vulnerabilities.",
      "It makes contracts run slower.",
      "It increases gas costs for all functions.",
      "It prevents contracts from being deployed."
    ],
    answer: 0,
    explanation: "Inline assembly is not checked for safety by the compiler, so mistakes can lead to severe vulnerabilities or loss of funds."
  },
  {
    question: "How can you prevent vulnerabilities when using inline assembly?",
    options: [
      "Avoid using inline assembly unless absolutely necessary, and keep it simple and well-documented.",
      "Use inline assembly for all arithmetic operations.",
      "Never use comments in assembly code.",
      "Write all contract logic in assembly for better performance."
    ],
    answer: 0,
    explanation: "Only use inline assembly when you have no safer alternative, and always keep it minimal, clear, and well-reviewed."
  },
  {
    question: "Which of the following is a best practice when writing inline assembly?",
    options: [
      "Add thorough comments and test extensively.",
      "Use assembly to access random storage slots.",
      "Skip code reviews for assembly sections.",
      "Mix assembly and high-level code without documentation."
    ],
    answer: 0,
    explanation: "Always comment, test, and review assembly code carefully, as it is error-prone and hard to audit."
  }
];

// 11-front-running
export const quizFrontRunning: QuizQuestion[] = [
  {
    question: "What is a front-running attack in DeFi?",
    options: [
      "When someone observes a pending transaction and submits their own with a higher gas fee to get ahead.",
      "When a contract runs out of gas.",
      "When a function is called with too many arguments.",
      "When a contract is deployed on the wrong network."
    ],
    answer: 0,
    explanation: "Front-running is when an attacker sees a pending transaction in the mempool and quickly submits their own transaction with a higher gas price to be executed first, often to gain an unfair advantage."
  },
  {
    question: "Why are front-running attacks dangerous in smart contracts?",
    options: [
      "They can allow attackers to steal profits, manipulate prices, or win auctions unfairly.",
      "They only slow down the network.",
      "They make contracts more expensive to deploy.",
      "They have no real impact on users."
    ],
    answer: 0,
    explanation: "Front-running can result in financial losses, unfair outcomes, and manipulation of DeFi protocols by letting attackers act before honest users."
  },
  {
    question: "Which pattern can help prevent front-running in auctions?",
    options: [
      "Commit-reveal scheme.",
      "Using unchecked blocks everywhere.",
      "Ignoring compiler warnings.",
      "Increasing the gas limit."
    ],
    answer: 0,
    explanation: "A commit-reveal scheme hides the true value of bids until a later phase, preventing attackers from knowing and front-running user bids."
  },
  {
    question: "How does a commit-reveal scheme work to prevent front-running?",
    options: [
      "Users first submit a hash of their bid (commit), then reveal the actual bid in a later phase.",
      "Users send their bids directly and publicly.",
      "The contract automatically increases all bids.",
      "Bids are only accepted from the contract owner."
    ],
    answer: 0,
    explanation: "In a commit-reveal scheme, users first commit to a hashed value, then reveal their actual bid later. This prevents attackers from knowing the bid values in advance."
  },
  {
    question: "Who can perform front-running attacks on public blockchains?",
    options: [
      "Anyone who can see pending transactions, including miners and bots.",
      "Only the contract owner.",
      "Only users with special wallets.",
      "No one, because transactions are private."
    ],
    answer: 0,
    explanation: "Because pending transactions are visible in the mempool, anyone—including miners and bots—can attempt to front-run transactions."
  }
];

// 12-flash-loan
export const quizFlashLoan: QuizQuestion[] = [
  {
    question: "What is a flash loan in DeFi?",
    options: [
      "A loan that must be borrowed and repaid within a single transaction.",
      "A loan that lasts for one year.",
      "A loan that requires a lot of collateral.",
      "A loan that is only available to contract owners."
    ],
    answer: 0,
    explanation: "A flash loan lets anyone borrow assets instantly and without collateral, as long as they repay it within the same transaction."
  },
  {
    question: "Why are flash loans potentially dangerous?",
    options: [
      "Attackers can use them to manipulate prices, drain funds, or exploit vulnerable contracts in a single transaction.",
      "They are always safe to use.",
      "They make contracts run faster.",
      "They require a lot of gas."
    ],
    answer: 0,
    explanation: "Flash loans can be abused to perform complex attacks without risk, since the attacker never needs to use their own money."
  },
  {
    question: "What is a key prevention technique for safe flash loan implementation?",
    options: [
      "Check that the contract's balance is the same before and after the flash loan.",
      "Allow anyone to borrow any amount with no checks.",
      "Ignore what happens during the loan.",
      "Let users borrow without repaying."
    ],
    answer: 0,
    explanation: "Always check that all funds are returned at the end of the flash loan, so the pool cannot be drained."
  },
  {
    question: "Who can use flash loans on public blockchains?",
    options: [
      "Anyone with a smart contract.",
      "Only the contract owner.",
      "Only miners.",
      "No one, because they are private."
    ],
    answer: 0,
    explanation: "Anyone can use flash loans if the contract allows it, which is why proper checks are essential."
  },
  {
    question: "What happens if a flash loan is not repaid in the same transaction?",
    options: [
      "The entire transaction is reverted and nothing changes.",
      "The contract loses money.",
      "The attacker keeps the loan.",
      "The contract is destroyed."
    ],
    answer: 0,
    explanation: "If the loan is not repaid, the transaction fails and all changes are undone."
  }
];
