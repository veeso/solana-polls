import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const InputText = styled.input`
  border-radius: 1.2em;
  color: #404040;
  font-size: 1.5em;
  margin: 0.5em 0;
  text-align: center;
`;

interface Props {
  name?: string;
  onChange?: (event: React.FormEvent<EventTarget>) => void;
  value?: string;
  width?: string;
}

const Input = (props: Props) => (
  <div>
    <InputText
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      style={{ width: props.width }}
    />
  </div>
);

export default hot(Input);
