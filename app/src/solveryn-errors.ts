/**
 * Solveryn Error Handling
 * Comprehensive error types for agent trust verification
 */

export class SolverynError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'SolverynError';
  }
}

// Verification Errors
export class AgentNotFoundError extends SolverynError {
  constructor(agentPubkey: string) {
    super('AGENT_NOT_FOUND', `Agent ${agentPubkey} not registered in Solveryn`, {
      agentPubkey
    });
  }
}

export class InsufficientReputationError extends SolverynError {
  constructor(currentReputation: number, requiredReputation: number) {
    super('INSUFFICIENT_REPUTATION', 
      `Reputation too low (${currentReputation} < ${requiredReputation})`, 
      { currentReputation, requiredReputation }
    );
  }
}

export class AttestationFailedError extends SolverynError {
  constructor(attestationType: string, reason: string) {
    super('ATTESTATION_FAILED', 
      `Attestation '${attestationType}' failed: ${reason}`,
      { attestationType, reason }
    );
  }
}

// Network Errors
export class RpcError extends SolverynError {
  constructor(endpoint: string, originalError: Error) {
    super('RPC_ERROR', 
      `RPC call failed to ${endpoint}: ${originalError.message}`,
      { endpoint, originalError: originalError.message }
    );
  }
}

export class TransactionFailedError extends SolverynError {
  constructor(txHash: string, reason: string) {
    super('TRANSACTION_FAILED',
      `Transaction ${txHash} failed: ${reason}`,
      { txHash, reason }
    );
  }
}

// Validation Errors
export class InvalidClaimsError extends SolverynError {
  constructor(claims: string) {
    super('INVALID_CLAIMS',
      `Invalid agent claims format: "${claims}"`,
      { claims }
    );
  }
}

export class MissingParameterError extends SolverynError {
  constructor(paramName: string) {
    super('MISSING_PARAMETER',
      `Required parameter missing: ${paramName}`,
      { paramName }
    );
  }
}

// Monitoring Errors
export class MonitoringError extends SolverynError {
  constructor(message: string, details?: Record<string, any>) {
    super('MONITORING_ERROR', message, details);
  }
}

/**
 * Error handler utility
 */
export function handleSolverynError(error: any): SolverynError {
  if (error instanceof SolverynError) {
    return error;
  }
  
  if (error.code === 'RPC_ERROR') {
    return new RpcError(error.endpoint || 'unknown', error);
  }
  
  if (error.message?.includes('agent not found')) {
    return new AgentNotFoundError(error.agentPubkey || 'unknown');
  }
  
  return new SolverynError('UNKNOWN_ERROR', error.message || String(error), {
    originalError: error
  });
}
