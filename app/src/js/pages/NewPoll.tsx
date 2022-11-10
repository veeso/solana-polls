import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import { IDL } from "../../solana_polls";
import idl from "../../solana_polls.json";
import config from "../../config";

const programID = new PublicKey(idl.metadata.address);

import NewPollForm from "../components/form/NewPollForm";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

const NewPoll = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const handleOnSubmit = async (title: string, options: Array<string>) => {
    if (wallet) {
      console.log(`form submit ${title}; ${options}`);
      const provider = new AnchorProvider(
        connection,
        wallet as anchor.Wallet,
        {}
      );
      const program = new Program(IDL, programID, provider);
      await program.methods
        .createPoll(title, options)
        .accounts({
          data: config.solana_polls_account,
          author: wallet.publicKey,
        })
        .rpc()
        .then(() => {
          console.log("poll submitted");
        })
        .catch(console.error);
    }
  };

  return (
    <Container>
      <NewPollForm onSubmit={handleOnSubmit} />
    </Container>
  );
};

export default hot(NewPoll);
