import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { SolanaPolls } from "../target/types/solana_polls";

describe("solana-polls", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaPolls as Program<SolanaPolls>;

  it("Is initialized!", async () => {
    const deployerKeypair = anchor.web3.Keypair.generate();
    const payer = (program.provider as anchor.AnchorProvider).wallet;
    const tx = await program.methods
      .initialize()
      .accounts({
        data: deployerKeypair.publicKey,
        owner: payer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([deployerKeypair])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
