import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { SolanaPolls } from "../target/types/solana_polls";

const initialize = async (
  program: Program<SolanaPolls>,
  deployerKeypair: anchor.web3.Keypair,
  payer: anchor.Wallet
): Promise<string> =>
  await program.methods
    .initialize()
    .accounts({
      data: deployerKeypair.publicKey,
      owner: payer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([deployerKeypair])
    .rpc();

describe("solana-polls", () => {
  const program = anchor.workspace.SolanaPolls as Program<SolanaPolls>;
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  it("is initialized!", async () => {
    const deployerKeypair = anchor.web3.Keypair.generate();
    const payer: anchor.Wallet = (program.provider as anchor.AnchorProvider)
      .wallet;
    const tx = await initialize(program, deployerKeypair, payer);
    console.log("Your transaction signature", tx);
  });

  it("should create poll", async () => {
    const deployerKeypair = anchor.web3.Keypair.generate();
    const payer: anchor.Wallet = (program.provider as anchor.AnchorProvider)
      .wallet;
    await initialize(program, deployerKeypair, payer);
    console.log("polls initialized");
    // create poll
    const author = anchor.web3.Keypair.generate();
    await program.methods
      .createPoll("Do you think Doge will reach 1$ by the end of 2022?", [
        "Yes",
        "No",
      ])
      .accounts({
        data: deployerKeypair.publicKey,
        author: author.publicKey,
      })
      .signers([author])
      .rpc();
    console.log("poll created");
    // read data
    const data = await program.account.data.fetch(deployerKeypair.publicKey);
    console.log(`data: ${JSON.stringify(data)}`);
    expect(data.polls.length).to.be.equal(1);
    const poll = data.polls[0];
    expect(poll.id).to.be.equal(0);
    expect(poll.closed).to.be.equal(false);
    expect(poll.title).to.be.equal(
      "Do you think Doge will reach 1$ by the end of 2022?"
    );
    expect(poll.options.length).to.be.equal(2);
  });

  it("should close poll", async () => {
    const deployerKeypair = anchor.web3.Keypair.generate();
    const payer: anchor.Wallet = (program.provider as anchor.AnchorProvider)
      .wallet;
    await initialize(program, deployerKeypair, payer);
    console.log("polls initialized");
    // create poll
    const author = anchor.web3.Keypair.generate();
    await program.methods
      .createPoll("Do you think Doge will reach 1$ by the end of 2022?", [
        "Yes",
        "No",
      ])
      .accounts({
        data: deployerKeypair.publicKey,
        author: author.publicKey,
      })
      .signers([author])
      .rpc();
    console.log("poll created");
    // close poll
    await program.methods
      .closePoll(0)
      .accounts({
        data: deployerKeypair.publicKey,
        author: author.publicKey,
      })
      .signers([author])
      .rpc();
    const data = await program.account.data.fetch(deployerKeypair.publicKey);
    console.log(`data: ${JSON.stringify(data)}`);
    const poll = data.polls[0];
    expect(poll.closed).to.be.equal(true);
  });

  it("should be able to vote", async () => {
    const deployerKeypair = anchor.web3.Keypair.generate();
    const payer: anchor.Wallet = (program.provider as anchor.AnchorProvider)
      .wallet;
    await initialize(program, deployerKeypair, payer);
    console.log("polls initialized");
    // create poll
    const author = anchor.web3.Keypair.generate();
    await program.methods
      .createPoll("Do you think Doge will reach 1$ by the end of 2022?", [
        "Yes",
        "No",
      ])
      .accounts({
        data: deployerKeypair.publicKey,
        author: author.publicKey,
      })
      .signers([author])
      .rpc();
    console.log("poll created");
    await program.methods
      .vote(0, 0)
      .accounts({
        data: deployerKeypair.publicKey,
        voter: author.publicKey,
      })
      .signers([author])
      .rpc();
    console.log("poll voted");
    const otherVoter = anchor.web3.Keypair.generate();
    await program.methods
      .vote(0, 1)
      .accounts({
        data: deployerKeypair.publicKey,
        voter: otherVoter.publicKey,
      })
      .signers([otherVoter])
      .rpc();
    const data = await program.account.data.fetch(deployerKeypair.publicKey);
    console.log(`data: ${JSON.stringify(data)}`);
    expect(data.votes.length).to.be.equal(2);
  });
});
