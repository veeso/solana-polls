use anchor_lang::prelude::*;

mod state;
use state::Data;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
#[allow(clippy::result_large_err)]
pub mod solana_polls {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.data;
        account.polls = Vec::new();
        account.votes = Vec::new();

        Ok(())
    }

    /// Create a new poll in the application
    pub fn create_poll(
        ctx: Context<CreatePoll>,
        title: String,
        options: Vec<String>,
    ) -> Result<()> {
        let data = &mut ctx.accounts.data;
        data.create_poll(ctx.accounts.author.key(), title, options);

        Ok(())
    }

    /// Close poll
    pub fn close_poll(ctx: Context<ClosePoll>, poll_id: u64) -> Result<()> {
        let data = &mut ctx.accounts.data;
        data.close_poll(ctx.accounts.author.key(), poll_id)?;

        Ok(())
    }

    /// Vote poll
    pub fn vote(ctx: Context<Vote>, poll_id: u64, option: u64) -> Result<()> {
        let data = &mut ctx.accounts.data;
        data.vote(ctx.accounts.voter.key(), poll_id, option)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 // account discriminator
        + 32 // pubkey
        + (1024 * 8) // 8KB
    )]
    pub data: Account<'info, Data>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

/// Poll error
#[derive(PartialEq, Eq)]
#[error_code]
pub enum PollError {
    /// The account already voted
    AlreadyVoted,
    /// There's nos such poll option
    NoSuchOption,
    /// There's no such poll
    NoSuchPoll,
    /// This operation is not allowed
    OperationNotAllowed,
    /// Poll is already closed
    PollAlreadyClosed,
    /// The poll is closed. You can't vote to closed polls
    PollClosed,
}

/// Create poll action
#[derive(Accounts)]
pub struct CreatePoll<'info> {
    #[account(mut)]
    pub data: Account<'info, Data>,
    pub author: Signer<'info>,
}

/// Close poll action
#[derive(Accounts)]
pub struct ClosePoll<'info> {
    #[account(mut)]
    pub data: Account<'info, Data>,
    pub author: Signer<'info>,
}

/// Vote a poll
#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub data: Account<'info, Data>,
    pub voter: Signer<'info>,
}
