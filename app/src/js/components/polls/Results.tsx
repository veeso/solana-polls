import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
const randomColor = require("randomcolor"); // import the script
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import PollEntity from "../../lib/poll";
import Vote from "../../lib/vote";
import Submit from "../form/Submit";

const Container = styled.div`
  margin: 5vh 25%;
  width: 50%;
`;

const Title = styled.div`
  color: #404040;
  font-size: 1.5em;
  margin-left: 24px;
  text-align: center;
`;

const ChartContainer = styled.div`
  height: 50vh;
  padding: 5%;
`;

const Cta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
`;

const defaultLabelStyle = {
  color: "white",
  fontSize: "4px",
  fontFamily: "sans-serif",
};

interface Props {
  poll: PollEntity;
  onVotePoll: () => void;
  onGoBack: () => void;
  votes: Array<Vote>;
}

const Results = (props: Props) => {
  const [data, setData] = React.useState<any[]>([]);

  const chartData = (): any[] => {
    let data: any[] = [];
    props.poll.options.map((option) => {
      const votes = props.votes.filter(
        (vote) => vote.option === option.id
      ).length;
      data.push({
        title: option.text,
        value: votes,
        color: randomColor({ luminosity: "light" }),
      });
    });
    return data;
  };

  React.useEffect(() => {
    setData(chartData());
  }, []);

  return (
    <Container>
      <Title>{props.poll.title}</Title>
      <ChartContainer>
        <PieChart
          data={data}
          animate={true}
          label={({ dataEntry }) => `${dataEntry.title}  (${dataEntry.value})`}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </ChartContainer>
      <Cta>
        <Submit
          onClick={props.onVotePoll}
          text="Vote poll"
          disabled={props.poll.closed}
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

export default hot(Results);
