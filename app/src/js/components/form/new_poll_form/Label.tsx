import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const LabelText = styled.label`
  color: #404040;
  font-size: 1.1em;
  text-align: center;
`;

interface Props {
  for: string;
  text: string;
}

class Label extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <LabelText htmlFor={this.props.for}>{this.props.text}</LabelText>
      </div>
    );
  }
}

export default hot(Label);
