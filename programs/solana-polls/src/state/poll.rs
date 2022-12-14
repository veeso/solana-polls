//! # Poll

use anchor_lang::prelude::*;

/// The poll defines a poll created by the user with its options and title
#[derive(PartialEq, Eq, Debug, AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Poll {
    /// Poll id
    pub id: u32,
    /// Poll owner
    pub owner: Pubkey,
    /// Poll title
    pub title: String,
    /// Poll options (id, text)
    pub options: Vec<Option>,
    /// Is the poll closed
    pub closed: bool,
}

impl Poll {
    /// Instantiate a new Poll
    pub fn new(id: u32, owner: Pubkey, title: String, options: Vec<String>) -> Self {
        Self {
            id,
            owner,
            title,
            options: options
                .into_iter()
                .enumerate()
                .map(|(i, opt)| Option::new(i as u32, opt))
                .collect(),
            closed: false,
        }
    }

    /// Close poll
    pub fn close(&mut self) {
        self.closed = true;
    }
}

#[derive(PartialEq, Eq, Debug, AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Option {
    pub id: u32,
    pub text: String,
}

impl Option {
    pub fn new(id: u32, text: String) -> Self {
        Self { id, text }
    }
}
#[cfg(test)]
mod test {

    use super::*;

    use pretty_assertions::assert_eq;

    #[test]
    fn should_create_poll() {
        let key = Pubkey::new_unique();
        let poll = Poll::new(
            0,
            key,
            "Solana or Ethereum?".to_string(),
            vec!["Solana".to_string(), "Ethereum".to_string()],
        );
        assert_eq!(poll.id, 0);
        assert_eq!(poll.owner, key);
        assert_eq!(poll.title.as_str(), "Solana or Ethereum?");
        assert_eq!(
            poll.options,
            vec![
                Option::new(0, "Solana".to_string()),
                Option::new(1, "Ethereum".to_string())
            ]
        );
        assert_eq!(poll.closed, false);
    }

    #[test]
    fn should_close_poll() {
        let key = Pubkey::new_unique();
        let mut poll = Poll::new(
            0,
            key,
            "Solana or Ethereum?".to_string(),
            vec!["Solana".to_string(), "Ethereum".to_string()],
        );
        poll.close();
        assert_eq!(poll.closed, true);
    }
}
