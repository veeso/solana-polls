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

const Vote = (props: Props) => {
  const [option, setOption] = React.useState<number>();
  const handleSubmit = () => {
    if (option) {
      props.onSubmit(option);
    }
  };

  const handleRadioInput = (event: React.FormEvent<EventTarget>) => {
    const value = (event.target as HTMLInputElement).value;
    setOption(parseInt(value));
  };
  const options = props.poll.options.map((option) => (
    <Radio
      key={option.id}
      label={option.text}
      name="poll-vote"
      value={option.id.toString()}
      onChange={handleRadioInput}
    />
  ));

  return (
    <Container>
      <Title>{props.poll.title}</Title>
      <RadioContainer>{options}</RadioContainer>
      <Cta>
        <Submit
          onClick={handleSubmit}
          text="Vote poll"
          disabled={option === undefined}
        />
        <Submit
          onClick={props.onGoBack}
          text="Go back"
          icon={<ArrowLeftIcon width={20} />}
        />
      </Cta>
    </Container>
  );
};

export default hot(Vote);
