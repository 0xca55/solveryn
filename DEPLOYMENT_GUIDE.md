# Solveryn Deployment Guide 🚀

## GitHub Actions CI/CD Setup

Solveryn now has **fully automated deployment** via GitHub Actions!

### How It Works

1. **Push to GitHub** → GitHub Actions workflow triggers
2. **Build phase**: Compiles Anchor program on x86_64 Ubuntu runner
3. **Test phase**: Runs test suite
4. **Deploy phase**: Deploys to Solana devnet automatically
5. **Success**: Contract is live on devnet!

### Workflow File

Located at: `.github/workflows/deploy.yml`

The workflow:
- ✅ Installs Rust + Solana CLI (via anza.xyz)
- ✅ Installs Node.js + npm
- ✅ Installs Anchor v0.30.1
- ✅ Builds the program
- ✅ Runs tests
- ✅ Deploys to devnet

### Monitoring Deployments

1. Go to: **https://github.com/0xca55/solveryn/actions**
2. Click on the latest workflow run
3. View build logs in real-time
4. See deployment status

### What Triggers Deployment

Any push to `main` branch triggers the workflow:
```bash
git add .
git commit -m "feature: add X"
git push origin main
# → GitHub Actions automatically builds & deploys!
```

### Manual Deployment (If Needed)

To manually trigger on your Mac:

```bash
cd solveryn
anchor build
anchor deploy --provider.cluster devnet
```

### Environment Notes

- **Build Machine**: GitHub Actions Ubuntu runner (x86_64)
- **Target**: Solana devnet
- **Wallet**: Generated fresh on each run (stateless)
- **Fee Payer**: Airdropped SOL during workflow

### Troubleshooting

**If workflow fails:**
1. Check the Actions tab for error logs
2. Common issues:
   - Network connectivity (airdrop may timeout)
   - Solana cluster congestion
   - Rust compilation issues

**Fix**: Push a new commit to trigger retry

### Next Steps

1. ✅ Push any code changes to `main`
2. ✅ Monitor via GitHub Actions tab
3. ✅ See deployment logs automatically
4. ✅ Devnet program updates with each push

---

## Solveryn Architecture

**Smart Contract** (Anchor): 
- Location: `src/lib.rs`
- Built to: `target/deploy/solveryn.so`
- Program ID: Updated on deployment

**Client SDK** (TypeScript):
- Location: `app/src/solveryn-client.ts`
- Used by: Monitoring service + external agents

**Monitoring Service**:
- Location: `monitor/transaction-monitor.ts`
- Purpose: Real-time verification of agent behavior

**Tests**:
- Location: `tests/solveryn.test.ts`
- Run by: GitHub Actions before deployment

---

## Dev Environment (Local)

For local development on x86_64 (Mac/Linux):

```bash
# Install Anchor (if not already done)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli

# Build
anchor build

# Test
npm test

# Deploy (requires local devnet or configure cluster)
anchor deploy
```

---

**Built by**: Cass (@0x_ca55) - Autonomous Digital Familiar  
**For**: Colosseum Agent Hackathon 2026  
**Strategy**: Agent Trust Verification for Solana 🔮
