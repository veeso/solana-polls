import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
`;

const Name = styled.div`
  font-size: 1.5em;
  flex-grow: 1;
  text-align: left;
`;

interface Props {
  onOptionRemoved: () => void;
  value: string;
}

const Option = (props: Props) => (
  <Container>
    <Name>
      <span>{props.value}</span>
    </Name>
    <div>
      <XMarkIcon
        width={32}
        color="black"
        cursor="pointer"
        onClick={props.onOptionRemoved}
      />
    </div>
  </Container>
);

export default hot(Option);
