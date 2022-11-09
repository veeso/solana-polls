import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import PollEntity from "../../lib/poll";
import Submit from "../form/Submit";
import Radio from "../form/Radio";

const Container = styled.div`
  margin: 5vh 25%;
  width: 50%;
`;

const RadioContainer = styled.div`
  padding: 2em 0;
  text-align: center;
`;

const Title = styled.div`
  color: #404040;
  font-size: 1.5em;
  margin-left: 24px;
  text-align: center;
`;

const Cta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
`;

interface Props {
  poll: PollEntity;
  onSubmit: (option: number) => void;
  onGoBack: () => void;
}

interface States {
  option?: number;
}

class Vote extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
  }

  handleSubmit() {
    if (this.state.option) {
      this.props.onSubmit(this.state.option);
    }
  }

  handleRadioInput(event: React.FormEvent<EventTarget>) {
    const value = (event.target as HTMLInputElement).value;
    this.setState({ option: parseInt(value) });
  }

  render(): React.ReactNode {
    const options = this.props.poll.options.map((option) => (
      <Radio
        key={option.id}
        label={option.text}
        name="poll-vote"
        value={option.id.toString()}
        onChange={this.handleRadioInput}
      />
    ));

    return (
      <Container>
        <Title>{this.props.poll.title}</Title>
        <RadioContainer>{options}</RadioContainer>
        <Cta>
          <Submit
            onClick={this.handleSubmit}
            text="Vote poll"
            disabled={this.state.option === undefined}
          />
          <Submit
            onClick={this.props.onGoBack}
            text="Go back"
            icon={<ArrowLeftIcon width={20} />}
          />
        </Cta>
      </Container>
    );
  }
}

export default hot(Vote);
