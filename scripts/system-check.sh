#!/bin/bash

# Solveryn System Check Script
# Verifies all required tools are installed and configured

echo "🔍 Solveryn System Check"
echo "========================"

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js: Not installed"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm: Not installed"
    exit 1
fi

# Check Rust
if command -v rustc &> /dev/null; then
    echo "✅ Rust: $(rustc --version)"
else
    echo "❌ Rust: Not installed"
    exit 1
fi

# Check Cargo
if command -v cargo &> /dev/null; then
    echo "✅ Cargo: $(cargo --version)"
else
    echo "❌ Cargo: Not installed"  
    exit 1
fi

# Check Solana CLI
if command -v solana &> /dev/null; then
    echo "✅ Solana CLI: $(solana --version)"
    echo "   Current cluster: $(solana config get | grep 'RPC URL' | awk '{print $3}')"
else
    echo "❌ Solana CLI: Not installed"
    echo "   ⏳ Installation may still be in progress..."
fi

# Check Anchor CLI
if command -v anchor &> /dev/null; then
    echo "✅ Anchor CLI: $(anchor --version)"
else
    echo "❌ Anchor CLI: Not installed"
    echo "   ⏳ Will install after Solana CLI completes"
fi

# Check TypeScript
if command -v tsc &> /dev/null; then
    echo "✅ TypeScript: $(tsc --version)"
else
    echo "❌ TypeScript: Not installed (will install with npm dependencies)"
fi

# Check wallet setup
if [ -f ~/.config/solana/id.json ]; then
    echo "✅ Solana Wallet: Found at ~/.config/solana/id.json"
    if command -v solana &> /dev/null; then
        echo "   Address: $(solana address 2>/dev/null || echo 'CLI not ready yet')"
    fi
else
    echo "❌ Solana Wallet: Not found"
    echo "   📝 Need to run: solana-keygen new --no-bip39-passphrase"
fi

echo ""
echo "📦 Project Dependencies"
echo "======================="

if [ -f package.json ]; then
    echo "✅ package.json: Found"
    if [ -d node_modules ]; then
        echo "✅ Node modules: Installed"
    else
        echo "❌ Node modules: Need to run 'npm install'"
    fi
else
    echo "❌ package.json: Not found"
fi

if [ -f Cargo.toml ]; then
    echo "✅ Cargo.toml: Found"
else
    echo "❌ Cargo.toml: Not found"
fi

if [ -f Anchor.toml ]; then
    echo "✅ Anchor.toml: Found"
else
    echo "❌ Anchor.toml: Not found"
fi

echo ""
echo "🏗️  Build Status"
echo "==============="

if [ -f src/lib.rs ]; then
    echo "✅ Smart Contract: src/lib.rs exists"
    echo "   Lines: $(wc -l < src/lib.rs)"
else
    echo "❌ Smart Contract: src/lib.rs missing"
fi

if [ -f app/src/solveryn-client.ts ]; then
    echo "✅ TypeScript Client: app/src/solveryn-client.ts exists"
    echo "   Lines: $(wc -l < app/src/solveryn-client.ts)"
else
    echo "❌ TypeScript Client: Missing"
fi

if [ -f monitor/transaction-monitor.ts ]; then
    echo "✅ Monitoring Service: monitor/transaction-monitor.ts exists"
    echo "   Lines: $(wc -l < monitor/transaction-monitor.ts)"
else
    echo "❌ Monitoring Service: Missing"
fi

echo ""
echo "🎯 Ready to Deploy?"
echo "=================="

READY=true

# Check critical dependencies
if ! command -v node &> /dev/null; then READY=false; fi
if ! command -v cargo &> /dev/null; then READY=false; fi
if [ ! -f src/lib.rs ]; then READY=false; fi

if [ "$READY" = true ]; then
    if command -v solana &> /dev/null && command -v anchor &> /dev/null; then
        echo "🚀 READY FOR DEPLOYMENT!"
        echo ""
        echo "Next steps:"
        echo "1. npm install          # Install TypeScript dependencies"
        echo "2. anchor build         # Compile the smart contract"
        echo "3. anchor deploy        # Deploy to devnet"
        echo "4. npm run demo         # Run the live demo"
    else
        echo "⏳ ALMOST READY - Waiting for toolchain installation"
        echo ""
        echo "Current installations in progress:"
        echo "- Solana CLI (compiling...)"
        echo "- Anchor CLI (queued)"
    fi
else
    echo "❌ NOT READY - Missing critical dependencies"
fi

echo ""
echo "💡 Quick Commands"
echo "================="
echo "System Status:    ./scripts/system-check.sh"
echo "Install deps:     npm install"  
echo "Build program:    anchor build"
echo "Deploy program:   anchor deploy"
echo "Run demo:         npm run demo"
echo "Check balance:    solana balance"
echo "Get airdrop:      solana airdrop 2"

echo ""
echo "🔮 Happy building with Solveryn!"