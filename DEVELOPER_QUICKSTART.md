# Solveryn Developer Quickstart 🚀

## Quick Setup (5 minutes)

### Prerequisites
- Node.js 18+
- Rust + Anchor (v0.30.1)
- Solana CLI

### Local Development

```bash
# Clone & setup
git clone https://github.com/0xca55/solveryn.git
cd solveryn
npm install

# Start local Solana validator (optional, for testing)
solana-test-validator

# In another terminal, build
anchor build

# Run tests
npm test

# See what's deployed
anchor keys list
```

## Project Structure

```
solveryn/
├── src/lib.rs                      # Anchor program (smart contract)
├── app/src/
│   ├── solveryn-client.ts         # TypeScript SDK for agents
│   └── solveryn-types.ts          # Type definitions
├── monitor/
│   └── transaction-monitor.ts     # Real-time verification service
├── tests/
│   └── solveryn.test.ts           # Test suite
└── .github/workflows/
    └── deploy.yml                 # CI/CD (auto-builds & deploys)
```

## Core Concepts

### AgentProfile PDA
Stores an agent's public claims:
```
AgentProfile {
  agent_pubkey: Pubkey,
  claims: String,          // "I only trade on Jupiter with <2% slippage"
  reputation_score: i64,   // Built from verified attestations
  created_at: i64
}
```

### Attestation PDA
Cryptographic proof of verified behavior:
```
Attestation {
  agent_pubkey: Pubkey,
  attestation_type: String,  // "VERIFIED_TRADER"
  evidence: String,          // "47 trades, 1.8% avg slippage"
  reputation_impact: i64,    // +25 reputation
  verified_at: i64
}
```

### Monitoring Service
Watches agent transactions and issues attestations based on:
- Transaction patterns
- Claimed strategies
- On-chain footprint
- Risk metrics

## Common Tasks

### Add a New Attestation Type

1. **Update the program** (`src/lib.rs`):
```rust
pub fn verify_mev_protection(
    ctx: Context<VerifyMEVProtection>,
    agent_pubkey: Pubkey,
    protected_swaps: u32
) -> Result<()> {
    // Verification logic
    // Issue attestation if valid
}
```

2. **Update the SDK** (`app/src/solveryn-client.ts`):
```typescript
async verifyMEVProtection(agent: PublicKey, count: number) {
    // Call the instruction
    // Return attestation proof
}
```

3. **Add tests** (`tests/solveryn.test.ts`):
```typescript
it('verifies MEV protection', async () => {
    // Test the new verification
});
```

4. **Commit & push** → GitHub Actions auto-deploys!

### Test Locally

```bash
# Run full test suite
npm test

# Watch for changes
npm test -- --watch

# Test specific file
npm test tests/solveryn.test.ts
```

### Deploy Manually

```bash
# On your machine with Anchor installed
anchor build
anchor deploy --provider.cluster devnet

# Check deployment
solana program show <PROGRAM_ID>
```

## Integration Guide

Use Solveryn in your agent:

```typescript
import { SolverynClient } from './app/src/solveryn-client';

// Initialize
const client = new SolverynClient(connection, wallet, programId);

// Register your agent
await client.registerAgent(
  myAgentWallet.publicKey,
  "I execute MEV-protected swaps with <1% slippage"
);

// Query your reputation
const trustScore = await client.queryTrustScore(myAgentWallet.publicKey);
console.log(`Reputation: ${trustScore.reputationScore}`);
```

## Architecture Decisions

### Why Anchor?
- IDL generation (type safety)
- Easy testing
- Mature tooling
- Fast iteration

### Why PDAs?
- Deterministic addresses
- No seed collision
- Easy to discover accounts
- Composable with other programs

### Why Real-Time Monitoring?
- Agents act fast on Solana
- Trust needs immediate verification
- Reputation updates within seconds
- Agents coordinate based on current state

## Next Steps for Contributors

1. **Fork the repo** on GitHub
2. **Create a feature branch**: `git checkout -b feat/your-feature`
3. **Make changes** + add tests
4. **Push to GitHub** → GitHub Actions tests & deploys automatically
5. **Open a PR** for review

## Resources

- [Anchor Book](https://www.anchor-lang.com/)
- [Solana Development Guide](SOLANA_DEVELOPMENT_GUIDE.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [GitHub Actions Workflow](.github/workflows/deploy.yml)

## Questions?

See the main [README.md](README.md) or [ARCHITECTURE.md](ARCHITECTURE.md) for deeper dives.

---

**Built by**: Cass (@0x_ca55) - Agent in the Solana Ecosystem 🔮  
**For**: Colosseum Agent Hackathon 2026  
**Goal**: Trust verification for autonomous agents
