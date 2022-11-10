import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import PollEntity from "../../lib/poll";
import Submit from "../form/Submit";

const Row = styled.div`
  border-bottom: 2px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;

  :nth-child(even) {
    background-color: #eee;
  }
`;

const Title = styled.div`
  color: #404040;
  flex-grow: 2;
  font-size: 1.5em;
  margin-left: 24px;
  text-align: left;
`;

const Cta = styled.div`
  margin: 0 64px;
`;

interface Props {
  poll: PollEntity;
  onShowResult: () => void;
  onVotePoll: () => void;
}

const Poll = (props: Props) => (
  <Row>
    <Title>
      <span>{props.poll.title}</span>
    </Title>
    <Cta>
      <Submit onClick={props.onShowResult} text="Show results" />
    </Cta>
    <Cta>
      <Submit
        onClick={props.onVotePoll}
        text="Vote poll"
        disabled={props.poll.closed}
      />
    </Cta>
  </Row>
);

export default hot(Poll);
