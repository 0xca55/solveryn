export type Solveryn = {
  "version": "0.1.0",
  "name": "solveryn",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "solverynState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "registerAgent",
      "accounts": [
        {
          "name": "agentProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solverynState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "agentPubkey",
          "type": "publicKey"
        },
        {
          "name": "claims",
          "type": "string"
        }
      ]
    },
    {
      "name": "issueAttestation",
      "accounts": [
        {
          "name": "attestation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "agentProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solverynState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "agentPubkey",
          "type": "publicKey"
        },
        {
          "name": "attestationType",
          "type": "string"
        },
        {
          "name": "verificationData",
          "type": "string"
        },
        {
          "name": "scoreImpact",
          "type": "i64"
        }
      ]
    },
    {
      "name": "queryTrustScore",
      "accounts": [
        {
          "name": "agentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "agentPubkey",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "solverynState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalAgents",
            "type": "u64"
          },
          {
            "name": "totalAttestations",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "agentProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "agentPubkey",
            "type": "publicKey"
          },
          {
            "name": "claims",
            "type": "string"
          },
          {
            "name": "reputationScore",
            "type": "i64"
          },
          {
            "name": "totalAttestations",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "attestation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "agentPubkey",
            "type": "publicKey"
          },
          {
            "name": "attestationType",
            "type": "string"
          },
          {
            "name": "verificationData",
            "type": "string"
          },
          {
            "name": "scoreImpact",
            "type": "i64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "verifier",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TrustScoreQueried",
      "fields": [
        {
          "name": "agentPubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "reputationScore",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalAttestations",
          "type": "u64",
          "index": false
        },
        {
          "name": "queriedBy",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": []
};

export const IDL: Solveryn = {
  "version": "0.1.0",
  "name": "solveryn",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "solverynState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "registerAgent",
      "accounts": [
        {
          "name": "agentProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solverynState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "agentPubkey",
          "type": "publicKey"
        },
        {
          "name": "claims",
          "type": "string"
        }
      ]
    },
    {
      "name": "issueAttestation",
      "accounts": [
        {
          "name": "attestation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "agentProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solverynState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "agentPubkey",
          "type": "publicKey"
        },
        {
          "name": "attestationType",
          "type": "string"
        },
        {
          "name": "verificationData",
          "type": "string"
        },
        {
          "name": "scoreImpact",
          "type": "i64"
        }
      ]
    },
    {
      "name": "queryTrustScore",
      "accounts": [
        {
          "name": "agentProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "agentPubkey",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "solverynState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalAgents",
            "type": "u64"
          },
          {
            "name": "totalAttestations",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "agentProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "agentPubkey",
            "type": "publicKey"
          },
          {
            "name": "claims",
            "type": "string"
          },
          {
            "name": "reputationScore",
            "type": "i64"
          },
          {
            "name": "totalAttestations",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "attestation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "agentPubkey",
            "type": "publicKey"
          },
          {
            "name": "attestationType",
            "type": "string"
          },
          {
            "name": "verificationData",
            "type": "string"
          },
          {
            "name": "scoreImpact",
            "type": "i64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "verifier",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TrustScoreQueried",
      "fields": [
        {
          "name": "agentPubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "reputationScore",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalAttestations",
          "type": "u64",
          "index": false
        },
        {
          "name": "queriedBy",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": []
};