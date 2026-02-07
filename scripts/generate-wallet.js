#!/usr/bin/env node

// Generate Solana devnet wallet for Solveryn development
const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

console.log('🔐 Generating Solveryn Development Wallet');
console.log('========================================');

// Generate new keypair
const keypair = Keypair.generate();

// Create the wallet in standard Solana format
const walletData = Array.from(keypair.secretKey);

// Ensure .config/solana directory exists
const solanaConfigDir = path.join(process.env.HOME, '.config', 'solana');
if (!fs.existsSync(solanaConfigDir)) {
    fs.mkdirSync(solanaConfigDir, { recursive: true });
}

// Write wallet to standard location
const walletPath = path.join(solanaConfigDir, 'id.json');
fs.writeFileSync(walletPath, JSON.stringify(walletData));

console.log('✅ Wallet generated successfully!');
console.log('');
console.log('📍 Location:', walletPath);
console.log('🔑 Public Key:', keypair.publicKey.toString());
console.log('');
console.log('⚠️  SECURITY NOTICE:');
console.log('   This is a DEVELOPMENT wallet for devnet only.');
console.log('   Never send real funds to this address.');
console.log('');
console.log('🚀 Next Steps:');
console.log('   1. Configure Solana CLI: solana config set --url devnet');
console.log('   2. Get devnet SOL: solana airdrop 2');
console.log('   3. Check balance: solana balance');
console.log('');
console.log('💡 This wallet is ready for Solveryn deployment!');

// Also save to project for easy access
const projectWalletPath = path.join(__dirname, '..', 'devnet-wallet.json');
fs.writeFileSync(projectWalletPath, JSON.stringify(walletData));
console.log('💾 Backup saved to:', projectWalletPath);

console.log('');
console.log('🔮 Ready to build the agent trust infrastructure!');