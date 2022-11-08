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

#[cfg(test)]
mod test {

    use super::*;

    use pretty_assertions::assert_eq;

    #[test]
    fn should_create_vote() {
        let key = Pubkey::new_unique();
        let vote = Vote::new(0, key, 1);
        assert_eq!(vote.poll_id(), 0);
        assert_eq!(vote.option, 1);
        assert_eq!(vote.owner, key);
    }
}
