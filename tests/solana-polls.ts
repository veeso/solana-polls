import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaPolls } from "../target/types/solana_polls";

describe("solana-polls", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaPolls as Program<SolanaPolls>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
