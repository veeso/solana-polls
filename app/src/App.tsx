import * as React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

import { SolanaPolls, IDL } from "./solana_polls";
import idl from "./solana_polls.json";
import config from "./config";
import Menu from "./js/components/Menu";
import Wallet from "./js/components/Wallet";
import Loading from "./js/pages/Loading";
import NewPoll from "./js/pages/NewPoll";
import Polls from "./js/pages/Polls";

const programID = new PublicKey(idl.metadata.address);
const { SystemProgram, Keypair } = web3;
//const solanaAccount = new PublicKey(config.solana_polls_account);

const App = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const initialize = async () => {
    const provider = new AnchorProvider(
      connection,
      wallet as anchor.Wallet,
      {}
    );
    const program = new Program(IDL, programID, provider);
    const keypairOne = Keypair.generate();
    try {
      await program.methods
        .initialize()
        .accounts({
          data: keypairOne.publicKey,
          owner: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([keypairOne])
        .rpc();
      console.log("done", keypairOne.publicKey.toString());
    } catch (e) {
      console.log("#1", e);
      return alert(e);
    }
  };

  return (
    <>
      <Wallet>
        <BrowserRouter>
          <Menu />
          <main>
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/new" element={<NewPoll />} />
                <Route index path="/" element={<Polls />} />
              </Routes>
            </React.Suspense>
          </main>
        </BrowserRouter>
      </Wallet>
    </>
  );
};

export default hot(App);
