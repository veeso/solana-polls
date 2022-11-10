import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const RadioContainer = styled.div`
  display: block;
  padding: 8px 0;
`;
const InputRadio = styled.input``;

const RadioLabel = styled.label`
  font-size: 1.2em;
`;

interface Props {
  label: string;
  value: string;
  name?: string;
  onChange?: (event: React.FormEvent<EventTarget>) => void;
}

const Radio = (props: Props) => (
  <RadioContainer>
    <InputRadio
      type="radio"
      name={props.name}
      value={props.value}
      onClick={props.onChange}
    />
    <RadioLabel htmlFor={props.name}>{props.label}</RadioLabel>
  </RadioContainer>
);

export default hot(Radio);
