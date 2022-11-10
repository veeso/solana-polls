# Solana polls

- [Solana polls](#solana-polls)
  - [Introduction](#introduction)
  - [Approaching Solana development](#approaching-solana-development)
    - [Dependencies](#dependencies)
    - [Environment](#environment)
    - [Testing](#testing)

---

## Introduction

Solana-polls is my first solana DApp which I developed to approach and learn about this blockchain.

The solana-polls application provides the following use cases:

- users can view existing polls
- users can view a poll results
- users can create new polls providing title and options
- users can vote to an existing poll
- the user who created the poll can close the poll

## Approaching Solana development

### Dependencies

These are the steps required to get started with Solana:

1. Install Solana

    ```sh -c "$(curl -sSfL https://release.solana.com/v1.14.7/install)"```

2. Add Solana to your PATH

    ```export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"```

3. Install NodeJS and Yarn
4. Install Anchor CLI
  
    ```cargo install --git https://github.com/coral-xyz/anchor avm --locked --force```

5. Configure AVM package manager

    ```sh
    avm install latest
    avm use latest
    ```

### Environment

1. Setup Solana devnet or localhost

    ```sh
    solana config set --url devnet
    solana config set --url localhost
    ```

2. Create test wallet

    ```solana-keygen new --force```

3. Give yourself some coins

    ```solana airdrop 2```

4. Deploy

    ```anchor deploy```

### Testing

1. Setup localhost network

    ```solana config set --url localhost```

2. Run test validator

    ```solana-test-validator```
