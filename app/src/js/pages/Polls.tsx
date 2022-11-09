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

interface Props {}

interface States {
  polls: Array<PollEntity>;
  votes: Map<number, Array<VoteEntity>>;
  selectedPoll: number | null;
  pageState: PageState;
}

class Polls extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      polls: [],
      votes: new Map(),
      selectedPoll: null,
      pageState: PageState.Polls,
    };
    this.loadVotes = this.loadVotes.bind(this);
    this.handleShowResult = this.handleShowResult.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleGoback = this.handleGoback.bind(this);
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
  }

  componentDidMount(): void {
    this.loadPolls();
  }

  /**
   * @description load polls from blockchain
   */
  loadPolls() {
    this.setState({
      polls: [
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
      ],
    });
    //TODO: load from blockchain
  }

  /**
   * @description load votes for provided poll
   * @param pollId
   */
  loadVotes(pollId: number) {
    let votes = this.state.votes;
    let availableOptions = this.state.polls
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
    votes.set(pollId, votedOptions);
    // TODO: load from blockchain
    this.setState({ votes });
  }

  handleShowResult(pollId: number) {
    console.log(`show results for ${pollId}`);
    // load votes if unloaded
    if (!this.state.votes.has(pollId)) {
      this.loadVotes(pollId);
    }
    this.setState({ selectedPoll: pollId, pageState: PageState.Results });
  }

  handleVote(id: number) {
    console.log(`load votes for ${id}`);
    this.setState({ selectedPoll: id, pageState: PageState.Vote });
  }

  handleGoback() {
    this.setState({ selectedPoll: null, pageState: PageState.Polls });
  }

  handleVoteSubmit(option: number) {
    console.log(`voted for option ${option}`);
  }

  loadResultVotes(): Array<VoteEntity> {
    if (this.state.selectedPoll === null) {
      return [];
    }
    const votes = this.state.votes.get(this.state.selectedPoll);
    if (votes === undefined) {
      return [];
    }
    return votes;
  }

  loadSelectedPoll(): PollEntity | undefined {
    if (this.state.selectedPoll === null) {
      return undefined;
    }
    return this.state.polls.find((poll) => poll.id === this.state.selectedPoll);
  }

  renderPolls(): JSX.Element[] {
    const polls = this.state.polls.map((poll) => (
      <Poll
        key={poll.id}
        poll={poll}
        onShowResult={() => this.handleShowResult(poll.id)}
        onVotePoll={() => this.handleVote(poll.id)}
      />
    ));
    return polls;
  }

  renderResults(): JSX.Element {
    const votes = this.loadResultVotes();
    const selectedPoll = this.loadSelectedPoll();
    const pollId = this.state.selectedPoll;
    if (!selectedPoll || pollId === null) {
      console.error(`no such poll ${this.state.selectedPoll}`);
      return <></>;
    }
    return (
      <Results
        poll={selectedPoll}
        onVotePoll={() => this.handleVote(pollId)}
        onGoBack={this.handleGoback}
        votes={votes}
      />
    );
  }

  renderVoteForm() {
    const selectedPoll = this.loadSelectedPoll();
    const pollId = this.state.selectedPoll;
    if (!selectedPoll || pollId === null) {
      console.error(`no such poll ${this.state.selectedPoll}`);
      return <></>;
    }
    if (selectedPoll.closed) {
      console.error(`poll ${pollId} is closed`);
      return <></>;
    }
    return (
      <Vote
        poll={selectedPoll}
        onSubmit={this.handleVoteSubmit}
        onGoBack={this.handleGoback}
      />
    );
  }

  componentToRender(): JSX.Element {
    if (this.state.pageState === PageState.Polls) {
      return <>{this.renderPolls()}</>;
    } else if (this.state.pageState === PageState.Results) {
      return this.renderResults();
    } else {
      return this.renderVoteForm();
    }
  }

  render(): React.ReactNode {
    return <Container>{this.componentToRender()}</Container>;
  }
}

export default hot(Polls);
