import { Connection, PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet, BN } from '@coral-xyz/anchor';
import { IDL, Solveryn } from './solveryn-types';

export class SolverynClient {
    private connection: Connection;
    private provider: AnchorProvider;
    private program: Program<Solveryn>;
    private solverynStateKey: PublicKey;

    constructor(
        connection: Connection,
        wallet: Wallet,
        programId: PublicKey
    ) {
        this.connection = connection;
        this.provider = new AnchorProvider(connection, wallet, {});
        this.program = new Program(IDL, programId, this.provider);
        
        // Derive PDA for Solveryn state
        this.solverynStateKey = PublicKey.findProgramAddressSync(
            [Buffer.from("solveryn_state")],
            programId
        )[0];
    }

    async initialize(): Promise<string> {
        const tx = await this.program.methods
            .initialize()
            .accounts({
                solverynState: this.solverynStateKey,
                authority: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc();
        
        console.log("✅ Solveryn initialized. Transaction:", tx);
        return tx;
    }

    async registerAgent(
        agentPubkey: PublicKey,
        claims: string
    ): Promise<string> {
        // Derive PDA for agent profile
        const [agentProfileKey] = PublicKey.findProgramAddressSync(
            [Buffer.from("agent_profile"), agentPubkey.toBuffer()],
            this.program.programId
        );

        const tx = await this.program.methods
            .registerAgent(agentPubkey, claims)
            .accounts({
                agentProfile: agentProfileKey,
                solverynState: this.solverynStateKey,
                authority: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc();

        console.log(`✅ Agent ${agentPubkey.toString()} registered. Transaction:`, tx);
        return tx;
    }

    async issueAttestation(
        agentPubkey: PublicKey,
        attestationType: string,
        verificationData: string,
        scoreImpact: number
    ): Promise<string> {
        // Derive PDA for agent profile
        const [agentProfileKey] = PublicKey.findProgramAddressSync(
            [Buffer.from("agent_profile"), agentPubkey.toBuffer()],
            this.program.programId
        );

        // Generate unique attestation key
        const attestationKeypair = Keypair.generate();

        const tx = await this.program.methods
            .issueAttestation(
                agentPubkey,
                attestationType,
                verificationData,
                new BN(scoreImpact)
            )
            .accounts({
                attestation: attestationKeypair.publicKey,
                agentProfile: agentProfileKey,
                solverynState: this.solverynStateKey,
                authority: this.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([attestationKeypair])
            .rpc();

        console.log(`✅ Attestation issued for ${agentPubkey.toString()}. Transaction:`, tx);
        return tx;
    }

    async queryTrustScore(agentPubkey: PublicKey): Promise<any> {
        // Derive PDA for agent profile
        const [agentProfileKey] = PublicKey.findProgramAddressSync(
            [Buffer.from("agent_profile"), agentPubkey.toBuffer()],
            this.program.programId
        );

        try {
            const agentProfile = await this.program.account.agentProfile.fetch(agentProfileKey);
            
            console.log(`🔍 Trust Score for ${agentPubkey.toString()}:`);
            console.log(`  Reputation Score: ${agentProfile.reputationScore.toString()}`);
            console.log(`  Total Attestations: ${agentProfile.totalAttestations.toString()}`);
            console.log(`  Claims: ${agentProfile.claims}`);
            
            return {
                agentPubkey,
                reputationScore: agentProfile.reputationScore.toNumber(),
                totalAttestations: agentProfile.totalAttestations.toNumber(),
                claims: agentProfile.claims,
                createdAt: agentProfile.createdAt.toNumber()
            };
        } catch (error) {
            console.log(`❌ Agent ${agentPubkey.toString()} not found or error:`, error);
            throw error;
        }
    }

    async getGlobalStats(): Promise<any> {
        try {
            const solverynState = await this.program.account.solverynState.fetch(this.solverynStateKey);
            
            return {
                totalAgents: solverynState.totalAgents.toNumber(),
                totalAttestations: solverynState.totalAttestations.toNumber(),
                authority: solverynState.authority
            };
        } catch (error) {
            console.log("❌ Error fetching global stats:", error);
            throw error;
        }
    }

    // Utility method to monitor transactions for a specific agent
    async monitorAgentTransactions(
        agentPubkey: PublicKey,
        callback: (signature: string, transaction: any) => void
    ): Promise<void> {
        console.log(`🔄 Starting transaction monitoring for ${agentPubkey.toString()}`);
        
        // This would implement real-time transaction monitoring
        // For now, just a placeholder showing the concept
        const signatures = await this.connection.getSignaturesForAddress(agentPubkey, { limit: 10 });
        
        for (const signatureInfo of signatures) {
            const transaction = await this.connection.getTransaction(signatureInfo.signature);
            callback(signatureInfo.signature, transaction);
        }
    }
}