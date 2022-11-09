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

class Radio extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <RadioContainer>
        <InputRadio
          type="radio"
          name={this.props.name}
          value={this.props.value}
          onClick={this.props.onChange}
        />
        <RadioLabel htmlFor={this.props.name}>{this.props.label}</RadioLabel>
      </RadioContainer>
    );
  }
}

export default hot(Radio);
