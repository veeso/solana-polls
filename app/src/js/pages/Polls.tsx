import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import Poll from "../components/polls/Poll";
import PollEntity from "../lib/poll";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

interface Props {}

interface States {
  polls: Array<PollEntity>;
}

class Polls extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.loadPolls();
    this.handleShowResult = this.handleShowResult.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  loadPolls() {
    this.state = {
      polls: [
        {
          id: 0,
          title: "If you had 1000$ to invest, what crypto would you invest in?",
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
      ],
    };
    //TODO: load from blockchain
  }

  handleShowResult(id: number) {
    console.log(`show results for ${id}`);
  }

  handleVote(id: number) {
    console.log(`show vote for ${id}`);
  }

  render(): React.ReactNode {
    const polls = this.state.polls.map((poll) => (
      <Poll
        key={poll.id}
        poll={poll}
        onShowResult={() => this.handleShowResult(poll.id)}
        onVotePoll={() => this.handleVote(poll.id)}
      />
    ));
    return <Container>{polls}</Container>;
  }
}

export default hot(Polls);
