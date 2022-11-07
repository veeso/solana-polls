//! # Poll

use anchor_lang::prelude::*;

/// The poll defines a poll created by the user with its options and title
#[account]
pub struct Poll {
    /// Poll id
    pub id: u64,
    /// Poll owner
    pub owner: Pubkey,
    /// Poll title
    pub title: String,
    /// Poll options (id, text)
    pub options: Vec<(u64, String)>,
    /// Is the poll closed
    pub closed: bool,
}

impl Poll {
    /// Instantiate a new Poll
    pub fn new(id: u64, owner: Pubkey, title: String, options: Vec<String>) -> Self {
        Self {
            id,
            owner,
            title,
            options: options
                .into_iter()
                .enumerate()
                .map(|(i, opt)| (i as u64, opt))
                .collect(),
            closed: false,
        }
    }

    /// Close poll
    pub fn close(&mut self) {
        self.closed = true;
    }
}
