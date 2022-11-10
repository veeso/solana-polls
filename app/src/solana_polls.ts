export type SolanaPolls = {
  "version": "0.1.0",
  "name": "solana_polls",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
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
      "name": "createPoll",
      "docs": [
        "Create a new poll in the application"
      ],
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "options",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "closePoll",
      "docs": [
        "Close poll"
      ],
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "vote",
      "docs": [
        "Vote poll"
      ],
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u32"
        },
        {
          "name": "option",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "docs": [
        "The polls databaase"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "polls",
            "docs": [
              "Existing polls"
            ],
            "type": {
              "vec": {
                "defined": "Poll"
              }
            }
          },
          {
            "name": "votes",
            "docs": [
              "Poll votes"
            ],
            "type": {
              "vec": {
                "defined": "Vote"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Poll",
      "docs": [
        "The poll defines a poll created by the user with its options and title"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "Poll id"
            ],
            "type": "u32"
          },
          {
            "name": "owner",
            "docs": [
              "Poll owner"
            ],
            "type": "publicKey"
          },
          {
            "name": "title",
            "docs": [
              "Poll title"
            ],
            "type": "string"
          },
          {
            "name": "options",
            "docs": [
              "Poll options (id, text)"
            ],
            "type": {
              "vec": {
                "defined": "Option"
              }
            }
          },
          {
            "name": "closed",
            "docs": [
              "Is the poll closed"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "Option",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "text",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "Vote",
      "docs": [
        "Represents a vote to a poll"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pollId",
            "docs": [
              "Poll id"
            ],
            "type": "u32"
          },
          {
            "name": "owner",
            "docs": [
              "The address which issued the vote"
            ],
            "type": "publicKey"
          },
          {
            "name": "option",
            "docs": [
              "Option voted"
            ],
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyVoted"
    },
    {
      "code": 6001,
      "name": "NoSuchOption"
    },
    {
      "code": 6002,
      "name": "NoSuchPoll"
    },
    {
      "code": 6003,
      "name": "OperationNotAllowed"
    },
    {
      "code": 6004,
      "name": "PollAlreadyClosed"
    },
    {
      "code": 6005,
      "name": "PollClosed"
    }
  ]
};

export const IDL: SolanaPolls = {
  "version": "0.1.0",
  "name": "solana_polls",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
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
      "name": "createPoll",
      "docs": [
        "Create a new poll in the application"
      ],
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "options",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "closePoll",
      "docs": [
        "Close poll"
      ],
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "vote",
      "docs": [
        "Vote poll"
      ],
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u32"
        },
        {
          "name": "option",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "docs": [
        "The polls databaase"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "polls",
            "docs": [
              "Existing polls"
            ],
            "type": {
              "vec": {
                "defined": "Poll"
              }
            }
          },
          {
            "name": "votes",
            "docs": [
              "Poll votes"
            ],
            "type": {
              "vec": {
                "defined": "Vote"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Poll",
      "docs": [
        "The poll defines a poll created by the user with its options and title"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "Poll id"
            ],
            "type": "u32"
          },
          {
            "name": "owner",
            "docs": [
              "Poll owner"
            ],
            "type": "publicKey"
          },
          {
            "name": "title",
            "docs": [
              "Poll title"
            ],
            "type": "string"
          },
          {
            "name": "options",
            "docs": [
              "Poll options (id, text)"
            ],
            "type": {
              "vec": {
                "defined": "Option"
              }
            }
          },
          {
            "name": "closed",
            "docs": [
              "Is the poll closed"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "Option",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "text",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "Vote",
      "docs": [
        "Represents a vote to a poll"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pollId",
            "docs": [
              "Poll id"
            ],
            "type": "u32"
          },
          {
            "name": "owner",
            "docs": [
              "The address which issued the vote"
            ],
            "type": "publicKey"
          },
          {
            "name": "option",
            "docs": [
              "Option voted"
            ],
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyVoted"
    },
    {
      "code": 6001,
      "name": "NoSuchOption"
    },
    {
      "code": 6002,
      "name": "NoSuchPoll"
    },
    {
      "code": 6003,
      "name": "OperationNotAllowed"
    },
    {
      "code": 6004,
      "name": "PollAlreadyClosed"
    },
    {
      "code": 6005,
      "name": "PollClosed"
    }
  ]
};
