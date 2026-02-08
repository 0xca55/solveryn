# Solana Development Handbook 🔮

## Source of Truth
**Always refer to**: https://solana.com/SKILL.md when building Solana projects

## Key Corrections & Current Best Practices (Feb 8, 2026)

### Package Release URLs
- ❌ **NEVER**: release.solana.com (old, blocked)
- ✅ **USE**: https://release.anza.xyz/ (current, official)

### Stack Decisions (framework-kit first)

**UI/Frontend:**
- Use `@solana/client` + `@solana/react-hooks`
- Wallet Standard discovery via framework-kit

**Client SDKs & Scripts:**
- Prefer `@solana/kit` types over web3.js
- Use `@solana-program/*` instruction builders
- Only use web3.js at adapter boundaries (via `@solana/web3-compat`)

**Smart Contracts:**
- Default: **Anchor** (fast iteration, IDL generation, mature)
- High-performance: Pinocchio (CU optimization, minimal binary)

### Testing Strategy
- **Unit Tests**: LiteSVM or Mollusk (fast, in-process)
- **Integration Tests**: Surfpool (realistic cluster state)
- **Last Resort**: solana-test-validator (specific RPC behaviors)

### Solveryn Implementation Path

**Already Done** ✅
- Anchor program structure
- TypeScript SDK setup
- devnet wallet generated

**Next Steps** (with corrected URLs)
1. Use anza.xyz to install Solana CLI
2. Use anza.xyz to install Anchor CLI
3. Compile Anchor program: `anchor build`
4. Deploy to devnet: `anchor deploy`
5. Test with LiteSVM/Mollusk (no external deps)
6. Integration test with Surfpool

### Critical Security Checklist
When building:
- ✅ Explicit RPC endpoints (not assumed)
- ✅ Fee payer account validated
- ✅ Recent blockhash handling
- ✅ Compute budget + prioritization
- ✅ Account owners + signers + writability correct
- ✅ Token program variant explicit (SPL Token vs Token-2022)

### Deliverables Format
When implementing:
- Exact files changed + diffs
- Installation/build/test commands
- Risk notes for signing/fees/CPI/token transfers

---

## Solveryn-Specific Notes

**Project**: Agent Trust Verifier for Solana (Colosseum Hackathon)

**Tech Stack**:
- Program: Anchor (Rust)
- SDK: TypeScript (@solana/kit + @solana/web3.js)
- Testing: Mollusk for unit tests
- Deployment: devnet first, then mainnet

**Architecture**:
- SmartContract: AgentProfile PDAs + Attestations
- Monitoring: Real-time transaction analysis
- Client: Easy agent registration + trust score queries
- Economics: Fee-based (0.001 SOL per query)

**Key Files**:
- `src/lib.rs` - Anchor program
- `app/src/solveryn-client.ts` - SDK
- `monitor/transaction-monitor.ts` - Monitoring service
- `tests/solveryn.test.ts` - Tests
