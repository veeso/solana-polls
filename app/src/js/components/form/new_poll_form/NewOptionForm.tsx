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

class NewOptionForm extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { option: "" };
    this.handleNewOptionChange = this.handleNewOptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleNewOptionChange(event: React.FormEvent<EventTarget>) {
    this.setState({ option: (event.target as HTMLInputElement).value });
  }

  onSubmit() {
    this.setState({ option: "" });
    this.props.onNewOption(this.state.option);
  }

  render(): React.ReactNode {
    return (
      <Container>
        <div>
          <Label for="new-option" text="New option name" />
          <Input
            name="new-option"
            value={this.state.option}
            onChange={this.handleNewOptionChange}
          />
        </div>
        <Submit text="Add" onClick={this.onSubmit} />
      </Container>
    );
  }
}

export default hot(NewOptionForm);
