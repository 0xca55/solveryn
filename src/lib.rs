// Solveryn - Agent Trust Verifier for Solana
// Anchor program for issuing cryptographic attestations of agent behavior

use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod solveryn {
    use super::*;

    // Initialize the Solveryn program
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let solveryn_state = &mut ctx.accounts.solveryn_state;
        solveryn_state.authority = ctx.accounts.authority.key();
        solveryn_state.total_agents = 0;
        solveryn_state.total_attestations = 0;
        Ok(())
    }

    // Register an agent for monitoring
    pub fn register_agent(
        ctx: Context<RegisterAgent>, 
        agent_pubkey: Pubkey,
        claims: String
    ) -> Result<()> {
        let agent_profile = &mut ctx.accounts.agent_profile;
        agent_profile.agent_pubkey = agent_pubkey;
        agent_profile.claims = claims;
        agent_profile.reputation_score = 0;
        agent_profile.total_attestations = 0;
        agent_profile.created_at = Clock::get()?.unix_timestamp;

        // Increment total agents
        let solveryn_state = &mut ctx.accounts.solveryn_state;
        solveryn_state.total_agents += 1;

        Ok(())
    }

    // Issue an attestation about an agent's behavior
    pub fn issue_attestation(
        ctx: Context<IssueAttestation>,
        agent_pubkey: Pubkey,
        attestation_type: String,
        verification_data: String,
        score_impact: i64
    ) -> Result<()> {
        let attestation = &mut ctx.accounts.attestation;
        attestation.agent_pubkey = agent_pubkey;
        attestation.attestation_type = attestation_type;
        attestation.verification_data = verification_data;
        attestation.score_impact = score_impact;
        attestation.timestamp = Clock::get()?.unix_timestamp;
        attestation.verifier = ctx.accounts.authority.key();

        // Update agent's reputation score
        let agent_profile = &mut ctx.accounts.agent_profile;
        agent_profile.reputation_score += score_impact;
        agent_profile.total_attestations += 1;

        // Update global stats
        let solveryn_state = &mut ctx.accounts.solveryn_state;
        solveryn_state.total_attestations += 1;

        Ok(())
    }

    // Query an agent's trust score (fee-based)
    pub fn query_trust_score(
        ctx: Context<QueryTrustScore>,
        agent_pubkey: Pubkey
    ) -> Result<()> {
        // Fee collection logic would go here
        // For now, just emit the score
        let agent_profile = &ctx.accounts.agent_profile;
        
        emit!(TrustScoreQueried {
            agent_pubkey,
            reputation_score: agent_profile.reputation_score,
            total_attestations: agent_profile.total_attestations,
            queried_by: ctx.accounts.payer.key(),
        });

        Ok(())
    }
}

// Account structures
#[account]
pub struct SolverynState {
    pub authority: Pubkey,
    pub total_agents: u64,
    pub total_attestations: u64,
}

#[account]
pub struct AgentProfile {
    pub agent_pubkey: Pubkey,
    pub claims: String,
    pub reputation_score: i64,
    pub total_attestations: u64,
    pub created_at: i64,
}

#[account]
pub struct Attestation {
    pub agent_pubkey: Pubkey,
    pub attestation_type: String,
    pub verification_data: String,
    pub score_impact: i64,
    pub timestamp: i64,
    pub verifier: Pubkey,
}

// Context structures
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 8 + 8)]
    pub solveryn_state: Account<'info, SolverynState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterAgent<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 256 + 8 + 8 + 8)]
    pub agent_profile: Account<'info, AgentProfile>,
    #[account(mut)]
    pub solveryn_state: Account<'info, SolverynState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct IssueAttestation<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 256 + 512 + 8 + 8 + 32)]
    pub attestation: Account<'info, Attestation>,
    #[account(mut)]
    pub agent_profile: Account<'info, AgentProfile>,
    #[account(mut)]
    pub solveryn_state: Account<'info, SolverynState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct QueryTrustScore<'info> {
    pub agent_profile: Account<'info, AgentProfile>,
    #[account(mut)]
    pub payer: Signer<'info>,
}

// Events
#[event]
pub struct TrustScoreQueried {
    pub agent_pubkey: Pubkey,
    pub reputation_score: i64,
    pub total_attestations: u64,
    pub queried_by: Pubkey,
}