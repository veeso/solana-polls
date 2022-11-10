import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const Button = styled.button`
  background-color: #512da8;
  border: 0px solid #aaa;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 1em;
  height: 3rem;
  padding: 0 3.5rem;
  text-align: center;
  text-transform: capitalize;

  :hover {
    background-color: #222;
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

const Submit = (props: Props) => (
  <div>
    <Button disabled={props.disabled} onClick={() => props.onClick()}>
      {props.icon} <span>{props.text}</span>
    </Button>
  </div>
);

export default hot(Submit);
