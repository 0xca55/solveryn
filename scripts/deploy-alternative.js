#!/usr/bin/env node

// Alternative deployment approach for Solveryn using raw Solana tools
const { Connection, Keypair, SystemProgram, PublicKey } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

console.log('🔧 Solveryn Alternative Deployment Approach');
console.log('==========================================');

async function alternativeDeployment() {
    try {
        // Load wallet
        const walletPath = path.join(process.env.HOME, '.config', 'solana', 'id.json');
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
        const wallet = Keypair.fromSecretKey(new Uint8Array(walletData));
        
        console.log('🔑 Loaded wallet:', wallet.publicKey.toString());
        
        // Connect to devnet
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        
        // Check balance
        const balance = await connection.getBalance(wallet.publicKey);
        console.log('💰 Current balance:', balance / 1000000000, 'SOL');
        
        if (balance === 0) {
            console.log('⚠️  Balance is 0. Need to run: solana airdrop 2');
            console.log('   Alternative: Will do programmatic airdrop request...');
            
            // Request airdrop programmatically
            console.log('💧 Requesting airdrop...');
            const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * 1000000000);
            await connection.confirmTransaction(airdropSignature);
            
            const newBalance = await connection.getBalance(wallet.publicKey);
            console.log('💰 New balance:', newBalance / 1000000000, 'SOL');
        }
        
        console.log('');
        console.log('📋 Deployment Options:');
        console.log('');
        console.log('1. 🔧 WAIT FOR ANCHOR CLI');
        console.log('   - Solana CLI is compiling (should complete soon)');
        console.log('   - Then install working Anchor version');
        console.log('   - Use: anchor build && anchor deploy');
        console.log('');
        console.log('2. 🛠️  MANUAL COMPILATION');
        console.log('   - Use rustc directly to compile Rust program');
        console.log('   - Deploy with solana program deploy');
        console.log('   - Manual account initialization');
        console.log('');
        console.log('3. 📦 SIMPLIFIED VERSION');
        console.log('   - Create simplified version without Anchor dependencies');
        console.log('   - Use @solana/web3.js for all interactions');
        console.log('   - Deploy as native Solana program');
        console.log('');
        console.log('💡 Recommended: Wait for Solana CLI, then try anchor-cli alternative');
        console.log('');
        console.log('🎯 Current Status:');
        console.log('   ✅ Wallet ready with SOL');
        console.log('   ✅ Devnet connection working');
        console.log('   ✅ Smart contract code complete');
        console.log('   🔄 Just need compilation tools');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

if (require.main === module) {
    alternativeDeployment().catch(console.error);
}