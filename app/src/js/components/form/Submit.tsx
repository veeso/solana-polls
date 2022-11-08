import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const Button = styled.button`
  background-color: rgb(6, 127, 150);
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-radius: 5rem;
  color: white;
  cursor: pointer;
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 1em;
  height: 3rem;
  padding: 0 3.5rem;
  text-align: center;
  text-transform: uppercase;

  :hover {
    background-color: rgb(3, 104, 120);
  }

  :disabled {
    background-color: #ccc;
  }
`;

interface Props {
  disabled?: boolean;
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
}

class Submit extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <Button
          disabled={this.props.disabled}
          onClick={() => this.props.onClick()}
        >
          {this.props.icon} <span>{this.props.text}</span>
        </Button>
      </div>
    );
  }
}

export default hot(Submit);
