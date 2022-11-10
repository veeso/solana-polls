import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import NewOptionForm from "./NewOptionForm";
import Option from "./Option";

const Container = styled.div`
  padding: 2em 0;
`;

interface Props {
  onNewOption: (text: string) => void;
  onOptionRemoved: (index: number) => void;
  options: Array<string>;
}

const Options = (props: Props) => {
  const options = props.options.map((option, index) => (
    <Option
      key={index}
      onOptionRemoved={() => props.onOptionRemoved(index)}
      value={option}
    />
  ));
  return (
    <Container>
      {options}
      <hr />
      <NewOptionForm onNewOption={props.onNewOption} />
    </Container>
  );
};

export default hot(Options);
