# SecureMind

> An interactive platform for learning smart contract security through hands-on challenges.

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?logo=next.js)
![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity)
![Foundry](https://img.shields.io/badge/Foundry-Latest-FF6B6B)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

SecureMind is a **Final Year Project (FYP)** that gamifies smart contract security education. Learners solve real vulnerabilities across two difficulty tiers:

- **Learning Section**: 17 foundational challenges covering classic Solidity vulnerabilities
- **Real-World Section**: 4 DApp scenarios with multi-contract interactions

Each challenge teaches attack vectors while providing an interactive frontend and automated verification system.

### Note on Challenge Quality

This project was developed within a limited FYP timeline, so some challenge designs may not yet reach production-grade depth or polish. The focus was to provide practical, hands-on learning scenarios across a broad set of vulnerability topics, with room for future refinement and expansion.

---

## Features

### Educational Content
- **17 Learning Challenges** covering:
  - Reentrancy, Overflow/Underflow, Denial of Service
  - Hash Collisions, Price Oracle Manipulation
  - DelegateCall Injection, Insecure Randomness, Flash Loans
  - Access Control, Storage Collision, Inline Assembly
  - Front-Running, Block Timestamp Manipulation, NFT Reentrancy
  - And more...

### Web3 Integration
- **Wallet Connection**: RainbowKit & wagmi for multi-chain support
- **NFT Minting**: SecureMind Robot (ERC721A) on-chain NFT collection
- **Marketplace**: NFT marketplace with event indexing
- **Blockchain Indexing**: rindexer for tracking smart contract events & state

### Developer Tools
- Local Anvil testnet with persistent state
- Foundry for contract testing & deployment
- Docker support for containerized challenges
- Automated challenge verification system

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15.3.1 with TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Web3**: viem, wagmi, RainbowKit (v2.2.4)
- **Query**: TanStack React Query (v5)
- **Animations**: Motion, Lucide React Icons

### Backend / Smart Contracts
- **Language**: Solidity 0.8.28
- **Framework**: Foundry + OpenZeppelin Contracts
- **Standards**: ERC721A (optimized NFTs), ERC20 tokens
- **Testing**: Foundry test suite

### Infrastructure
- **Local Testnet**: Anvil with saved state snapshots
- **Blockchain Indexer**: rindexer (PostgreSQL backed)
- **Containerization**: Docker + Docker Compose
- **Package Manager**: pnpm

---

## Quick Start

### Prerequisites
- Node.js 18+ & pnpm
- Foundry (`curl -L https://foundry.paradigm.xyz | bash`)
- Docker & Docker Compose

### Installation

```bash
# Clone and setup
git clone <repo-url>
cd ts-secure-mind-ui
pnpm install
```

### Running Locally

#### 1. Start Local Blockchain
```bash
pnpm anvil
```
Loads the persisted Anvil state with pre-configured contracts.

#### 2. Start Blockchain Indexer (Optional)
```bash
pnpm reset-indexer    # First time only - sets up PostgreSQL
pnpm indexer          # Starts rindexer to track events
```

#### 3. Start Frontend
```bash
pnpm dev
```
Opens http://localhost:3000 in your browser.

### CTF-based Challenges

```bash
cd challenge

# Interactive challenge launcher
./select_start.sh

# Start a single challenge environment
./start.sh

# Clean up challenge environment
./stop.sh
```

---

## Project Structure

```
ts-secure-mind-ui/
├── foundry/                      # Smart contracts
│   ├── src/
│   │   ├── SecureMindRobot.sol  # ERC721A NFT contract
│   │   ├── NftMarketplace.sol   # Marketplace logic
│   │   ├── SecureMindToken.sol  # Platform token
│   │   └── RobotRenderer.sol    # On-chain NFT rendering
│   ├── script/
│   │   └── DeployAll.s.sol      # Deployment scripts
│   └── test/                    # Foundry test suite
│
├── src/
│   ├── app/
│   │   ├── challenges/          # Challenge pages
│   │   ├── learning/            # Learning content pages
│   │   ├── real-world-scenario/ # Real-world challenges pages
│   │   ├── nft-selection/       # NFT minting UI
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── challenge-real-world-page/
│   │   ├── connect-wallet/
│   │   ├── header/
│   │   ├── homepage/
│   │   └── ...                  # Reusable UI components
│   ├── constants.ts             # Constants
│   └── RainbowKitConfig.tsx     # web3 wallet integration toolkit configuration
│
├── challenge/                   # Challenge environments
│   ├── challenge-section/       # 17 learning challenges
│   ├── real-world-section/      # 4 real-world scenarios
│   └── scripts/                 # Docker & test orchestration
│
├── marketplaceIndexer/          # Blockchain indexing
│   ├── rindexer.yaml           # Indexer configuration
│   ├── abis/                   # Contract ABIs
│   └── generated_csv/          # Indexed event data
│
└── public/                      # Static assets
```

---

## Challenge Format

Each challenge includes:

1. **Vulnerable Smart Contract**: Intentionally buggy code to study
2. **Setup Contract**: Initializes testnet state & verification logic
3. **Challenge Objective**: Clear goal (e.g., "drain the contract")
4. **Interactive UI**: Code viewer with syntax highlighting
5. **Automated Verification**: On-chain `isSolved()` check

---

## Key Accomplishments

### Educational Value
- **17 vulnerability types** ensures most of the common vulnerabilities
- **Automated verification system** ensures correct exploitation

### Security Best Practices
- Showcases **actual CVE patterns** used in real exploits
- Teaches **defense strategies** by fixing contracts
- Demonstrates **audit-ready patterns** (OpenZeppelin contracts)

### ull-Stack Integration
- **Smart contracts** deployed on Anvil with persistent state
- **Frontend** with wallet connection & real-time challenge updates
- **Blockchain indexing** for event tracking & analytics
- **NFT ecosystem**: Mint on-chain & trade on marketplace

### Developer Experience
- Local testnet with saved snapshots for instant challenges
- Docker-based challenges for team environments
- TypeScript + Next.js for modern frontend development

---

## Learning Outcomes

By completing SecureMind, able to understand:

- How common smart contract vulnerabilities work  
- Exploit techniques  
- Defense mechanisms & secure coding patterns  
- Web3 stack (Solidity, Foundry, viem, wagmi)  
- Full-stack dApp development  

---

## Documentation

- [Foundry Book](https://book.getfoundry.sh/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [wagmi Documentation](https://wagmi.sh/)
- [Next.js Guide](https://nextjs.org/docs)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- OpenZeppelin for battle-tested smart contract libraries
- Foundry team for exceptional Solidity development tools
- Ethereum security community for vulnerability research
- ENUMA's challenge Docker container methods that inspired this ctf-based challenge setup

---