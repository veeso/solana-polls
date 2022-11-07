//! # Vote

use anchor_lang::prelude::*;

/// Represents a vote to a poll
#[account]
pub struct Vote {
    /// Poll id
    poll_id: u64,
    /// The address which issued the vote
    pub owner: Pubkey,
    /// Option voted
    pub option: u64,
}

impl Vote {
    /// Instantiates a new vote
    pub fn new(poll_id: u64, owner: Pubkey, option: u64) -> Self {
        Self {
            poll_id,
            owner,
            option,
        }
    }

    pub fn poll_id(&self) -> u64 {
        self.poll_id
    }
}
