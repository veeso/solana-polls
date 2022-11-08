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

class Input extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <InputText
          onChange={this.props.onChange}
          name={this.props.name}
          value={this.props.value}
          style={{ width: this.props.width }}
        />
      </div>
    );
  }
}

export default hot(Input);
