import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

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
interface States {
  polls: Array<PollEntity>;
  votes: Map<number, Array<VoteEntity>>;
  selectedPoll: number | null;
  pageState: PageState;
}

const Polls = () => {
  const [polls, setPolls] = React.useState<Array<PollEntity>>([]);
  const [votes, setVotes] = React.useState<Map<number, Array<VoteEntity>>>(
    new Map()
  );
  const [selectedPoll, setSelectedPoll] = React.useState<number | null>(null);
  const [pageState, setPageState] = React.useState<PageState>(PageState.Polls);

  const loadPolls = () => {
    setPolls([
      {
        id: 0,
        title: "If you had 10,000$, what crypto would you invest in?",
        closed: false,
        options: [
          { id: 0, text: "BTC" },
          { id: 1, text: "ETH" },
          { id: 2, text: "SOL" },
          { id: 3, text: "DOGE" },
          { id: 4, text: "MATIC" },
        ],
      },
      {
        id: 1,
        title: "What is the best programming language to learn in 2023?",
        closed: true,
        options: [
          { id: 0, text: "Rust" },
          { id: 1, text: "Go" },
          { id: 2, text: "Solidity" },
          { id: 3, text: "Elm" },
          { id: 4, text: "Typescript" },
        ],
      },
    ]);
    //TODO: load from blockchain
  };

  const loadVotes = (pollId: number) => {
    let newVotes = votes;
    let availableOptions = polls
      .find((poll) => poll.id === pollId)
      ?.options.reduce((prev, current) => {
        if (prev.id < current.id) {
          return current;
        }
        return prev;
      }).id;
    availableOptions = availableOptions ? availableOptions + 1 : 0;
    let votedOptions = [];
    for (let i = 0; i < 50; i++) {
      votedOptions.push({
        option: Math.floor(Math.random() * availableOptions),
      });
    }
    newVotes.set(pollId, votedOptions);
    // TODO: load from blockchain
    setVotes(newVotes);
  };

  const handleShowResult = (pollId: number) => {
    console.log(`show results for ${pollId}`);
    // load votes if unloaded
    if (!votes.has(pollId)) {
      loadVotes(pollId);
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

  const handleVoteSubmit = (option: number) => {
    console.log(`voted for option ${option}`);
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
    loadPolls();
  });

  return <Container>{componentToRender()}</Container>;
};

export default hot(Polls);
