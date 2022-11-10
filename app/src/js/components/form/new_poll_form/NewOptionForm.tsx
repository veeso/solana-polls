import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import Submit from "../Submit";
import Input from "./Input";
import Label from "./Label";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

interface Props {
  onNewOption: (text: string) => void;
}

interface States {
  option: string;
}

const NewOptionForm = (props: Props) => {
  const [option, setOption] = React.useState<string>("");

  const handleNewOptionChange = (event: React.FormEvent<EventTarget>) => {
    setOption((event.target as HTMLInputElement).value);
  };

  const onSubmit = () => {
    setOption("");
    props.onNewOption(option);
  };

  return (
    <Container>
      <div>
        <Label for="new-option" text="New option name" />
        <Input
          name="new-option"
          value={option}
          onChange={handleNewOptionChange}
        />
      </div>
      <Submit text="Add" onClick={onSubmit} />
    </Container>
  );
};

export default hot(NewOptionForm);
