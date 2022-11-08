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
#[derive(Default)]
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

    pub fn close_poll(&mut self, account: Pubkey, poll_id: u32) -> PollResult<()> {
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
    pub fn vote(&mut self, voter: Pubkey, poll_id: u32, option: u32) -> PollResult<()> {
        if self.has_already_vote(voter, poll_id) {
            return Err(PollError::AlreadyVoted);
        }
        let poll = match self.get_poll_by_id(poll_id) {
            Some(p) => p,
            None => return Err(PollError::NoSuchPoll),
        };
        if poll.closed {
            return Err(PollError::PollClosed);
        }
        // check if option exists
        if !poll.options.iter().any(|x| x.id == option) {
            return Err(PollError::NoSuchOption);
        }
        // register vote
        self.votes.push(Vote::new(poll_id, voter, option));
        Ok(())
    }

    /// Returns whether an account has already voted
    fn has_already_vote(&self, voter: Pubkey, poll_id: u32) -> bool {
        self.votes
            .iter()
            .any(|x| x.poll_id() == poll_id && x.owner == voter)
    }

    /// Get next poll id
    fn next_poll_id(&self) -> u32 {
        if let Some(poll) = self.polls.last() {
            poll.id + 1
        } else {
            0
        }
    }

    /// Get poll by id
    fn get_poll_by_id(&mut self, id: u32) -> Option<&mut Poll> {
        self.polls.iter_mut().find(|x| x.id == id)
    }
}

#[cfg(test)]
mod test {

    use super::*;

    use pretty_assertions::assert_eq;

    #[test]
    fn should_create_poll() {
        let mut data = Data::default();
        data.create_poll(
            Pubkey::new_unique(),
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert_eq!(data.polls.len(), 1);
        assert_eq!(data.polls.get(0).unwrap().id, 0);
        data.create_poll(
            Pubkey::new_unique(),
            "My poll 2".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert_eq!(data.polls.len(), 2);
        assert_eq!(data.polls.get(1).unwrap().id, 1);
    }

    #[test]
    fn should_close_poll() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert!(data.close_poll(key, 0).is_ok());
        assert_eq!(data.get_poll_by_id(0).unwrap().closed, true);
    }

    #[test]
    fn should_not_close_poll_twice() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert!(data.close_poll(key, 0).is_ok());
        assert_eq!(data.get_poll_by_id(0).unwrap().closed, true);
        assert_eq!(
            data.close_poll(key, 0).unwrap_err(),
            PollError::PollAlreadyClosed
        );
    }

    #[test]
    fn should_not_allow_another_account_to_close_poll() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert_eq!(
            data.close_poll(Pubkey::new_unique(), 0).unwrap_err(),
            PollError::OperationNotAllowed
        );
    }

    #[test]
    fn should_not_close_unexisting_poll() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert_eq!(
            data.close_poll(Pubkey::new_unique(), 2).unwrap_err(),
            PollError::NoSuchPoll
        );
    }

    #[test]
    fn should_vote_poll() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert!(data.vote(key, 0, 1).is_ok());
        assert_eq!(data.votes.get(0).unwrap().poll_id(), 0);
        assert_eq!(data.votes.get(0).unwrap().option, 1);
    }

    #[test]
    fn should_not_vote_twice() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert!(data.vote(key, 0, 1).is_ok());
        assert_eq!(data.vote(key, 0, 0).unwrap_err(), PollError::AlreadyVoted);
    }

    #[test]
    fn should_not_vote_unexisting_poll() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert_eq!(data.vote(key, 1, 0).unwrap_err(), PollError::NoSuchPoll);
    }

    #[test]
    fn should_not_vote_closed_poll() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert!(data.close_poll(key, 0).is_ok());
        assert_eq!(data.vote(key, 0, 0).unwrap_err(), PollError::PollClosed);
    }

    #[test]
    fn should_not_vote_unexisting_option() {
        let mut data = Data::default();
        let key = Pubkey::new_unique();
        data.create_poll(
            key,
            "My poll".to_string(),
            vec![String::from("yes"), String::from("no")],
        );
        assert_eq!(data.vote(key, 0, 3).unwrap_err(), PollError::NoSuchOption);
    }
}
