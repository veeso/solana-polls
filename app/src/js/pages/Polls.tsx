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
import Poll from "../components/polls/Poll";
import Vote from "../components/polls/Vote";
import PollEntity from "../lib/poll";
import VoteEntity from "../lib/vote";
import Results from "../components/polls/Results";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

enum PageState {
  Polls,
  Results,
  Vote,
}

const programID = new PublicKey(idl.metadata.address);

interface OpenType {
  [key: string]: any;
}

const Polls = () => {
  const [polls, setPolls] = React.useState<Array<PollEntity>>([]);
  const [votes, setVotes] = React.useState<Map<number, Array<VoteEntity>>>(
    new Map()
  );
  const [selectedPoll, setSelectedPoll] = React.useState<number | null>(null);
  const [pageState, setPageState] = React.useState<PageState>(PageState.Polls);

  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const loadPolls = async () => {
    const provider = new AnchorProvider(
      connection,
      wallet as anchor.Wallet,
      {}
    );
    const program = new Program(IDL, programID, provider);
    const data = await program.account.data.fetch(config.solana_polls_account);
    setPolls(
      (data.polls as Array<OpenType>).map((poll) => ({
        id: poll.id,
        title: poll.title,
        options: poll.option.map((option: OpenType) => ({
          id: option.id,
          text: option.text,
        })),
        closed: poll.closed,
      }))
    );
  };

  const loadVotes = async (pollId: number) => {
    const provider = new AnchorProvider(
      connection,
      wallet as anchor.Wallet,
      {}
    );
    const program = new Program(IDL, programID, provider);
    const data = await program.account.data.fetch(config.solana_polls_account);
    const pollVotes: Array<VoteEntity> = (data.votes as Array<OpenType>)
      .filter((vote) => vote.poll_id === pollId)
      .map((vote) => ({
        option: vote.option,
      }));
    const newVotes = new Map(votes);
    newVotes.set(pollId, pollVotes);
    setVotes(newVotes);
  };

  const handleShowResult = (pollId: number) => {
    console.log(`show results for ${pollId}`);
    // load votes if unloaded
    if (!votes.has(pollId)) {
      loadVotes(pollId).catch(console.error);
    }
    setSelectedPoll(pollId);
    setPageState(PageState.Results);
  };

  const handleVote = (id: number) => {
    console.log(`load votes for ${id}`);
    setSelectedPoll(id);
    setPageState(PageState.Vote);
  };

  const handleGoback = () => {
    setSelectedPoll(null);
    setPageState(PageState.Polls);
  };

  const handleVoteSubmit = async (option: number) => {
    console.log(`voted for option ${option}`);
    if (wallet && selectedPoll) {
      const provider = new AnchorProvider(
        connection,
        wallet as anchor.Wallet,
        {}
      );
      const program = new Program(IDL, programID, provider);
      await program.methods
        .vote(selectedPoll, option)
        .accounts({
          data: config.solana_polls_account,
          voter: wallet.publicKey,
        })
        .rpc()
        .then(() => {
          console.log("vote submitted");
        })
        .catch(console.error);
    }
  };

  const loadResultVotes = (): Array<VoteEntity> => {
    if (selectedPoll === null) {
      return [];
    }
    const pollVotes = votes.get(selectedPoll);
    if (pollVotes === undefined) {
      return [];
    }
    return pollVotes;
  };

  const loadSelectedPoll = (): PollEntity | undefined => {
    if (selectedPoll === null) {
      return undefined;
    }
    return polls.find((poll) => poll.id === selectedPoll);
  };

  const renderPolls = (): JSX.Element[] => {
    const pollsElement = polls.map((poll) => (
      <Poll
        key={poll.id}
        poll={poll}
        onShowResult={() => handleShowResult(poll.id)}
        onVotePoll={() => handleVote(poll.id)}
      />
    ));
    return pollsElement;
  };

  const renderResults = (): JSX.Element => {
    const votes = loadResultVotes();
    const selectedPoll = loadSelectedPoll();
    const poll = selectedPoll;
    if (!selectedPoll || poll === undefined) {
      console.error(`no such poll ${selectedPoll}`);
      return <></>;
    }
    return (
      <Results
        poll={selectedPoll}
        onVotePoll={() => handleVote(poll.id)}
        onGoBack={handleGoback}
        votes={votes}
      />
    );
  };

  const renderVoteForm = () => {
    const selectedPoll = loadSelectedPoll();
    const pollId = selectedPoll;
    if (!selectedPoll || pollId === null) {
      console.error(`no such poll ${selectedPoll}`);
      return <></>;
    }
    if (selectedPoll.closed) {
      console.error(`poll ${pollId} is closed`);
      return <></>;
    }
    return (
      <Vote
        poll={selectedPoll}
        onSubmit={handleVoteSubmit}
        onGoBack={handleGoback}
      />
    );
  };

  const componentToRender = (): JSX.Element => {
    if (pageState === PageState.Polls) {
      return <>{renderPolls()}</>;
    } else if (pageState === PageState.Results) {
      return renderResults();
    } else {
      return renderVoteForm();
    }
  };

  React.useEffect(() => {
    if (wallet) {
      loadPolls();
    }
  }, [wallet]);

  return <Container>{componentToRender()}</Container>;
};

export default hot(Polls);
