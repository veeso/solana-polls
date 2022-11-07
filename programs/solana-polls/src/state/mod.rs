//! # Data
//!
//! defines accounts types

use anchor_lang::prelude::*;

use super::PollError;

mod poll;
mod vote;

use poll::Poll;
use vote::Vote;

type PollResult<T> = std::result::Result<T, PollError>;

/// The polls databaase
#[account]
pub struct Data {
    /// Existing polls
    pub polls: Vec<Poll>,
    /// Poll votes
    pub votes: Vec<Vote>,
}

impl Data {
    /// Create and a new poll into data
    pub fn create_poll(&mut self, owner: Pubkey, title: String, options: Vec<String>) {
        let poll = Poll::new(self.next_poll_id(), owner, title, options);
        self.polls.push(poll);
    }

    pub fn close_poll(&mut self, account: Pubkey, poll_id: u64) -> PollResult<()> {
        let poll = match self.get_poll_by_id(poll_id) {
            Some(p) => p,
            None => return Err(PollError::NoSuchPoll),
        };
        if poll.owner != account {
            return Err(PollError::OperationNotAllowed);
        }
        if poll.closed {
            return Err(PollError::PollAlreadyClosed);
        }
        poll.close();

        Ok(())
    }

    /// Try to enregister a vote for provided poll
    pub fn vote(&mut self, voter: Pubkey, poll_id: u64, option: u64) -> PollResult<()> {
        if self.has_already_vote(voter, poll_id) {
            return Err(PollError::AlreadyVoted);
        }
        let poll = match self.get_poll_by_id(poll_id) {
            Some(p) => p,
            None => return Err(PollError::NoSuchPoll),
        };
        if poll.closed {
            return Err(PollError::PollAlreadyClosed);
        }
        // check if option exists
        if !poll.options.iter().any(|(i, _)| *i == option) {
            return Err(PollError::NoSuchOption);
        }
        // register vote
        self.votes.push(Vote::new(poll_id, voter, option));
        Ok(())
    }

    /// Returns whether an account has already voted
    fn has_already_vote(&self, voter: Pubkey, poll_id: u64) -> bool {
        self.votes
            .iter()
            .any(|x| x.poll_id() == poll_id && x.owner == voter)
    }

    /// Get next poll id
    fn next_poll_id(&self) -> u64 {
        if let Some(poll) = self.polls.last() {
            poll.id + 1
        } else {
            0
        }
    }

    /// Get poll by id
    fn get_poll_by_id(&mut self, id: u64) -> Option<&mut Poll> {
        self.polls.iter_mut().find(|x| x.id == id)
    }
}
