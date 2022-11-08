import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import Options from "./new_poll_form/Options";
import Title from "./new_poll_form/Title";
import Submit from "./Submit";

const Form = styled.div`
  margin-left: 25%;
  width: 50%;
`;

const FormTitle = styled.h2`
  color: #404040;
  text-align: center;
  font-size: 1.8em;
  font-weight: 200;
`;

interface Props {
  onSubmit: (title: string, options: Array<string>) => void;
}

interface States {
  title: string;
  options: Array<string>;
}

class NewPollForm extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      options: new Array(),
    };
    this.handleOnTitleChange = this.handleOnTitleChange.bind(this);
    this.handleOnNewOption = this.handleOnNewOption.bind(this);
    this.handleOnOptionRemoved = this.handleOnOptionRemoved.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOnTitleChange(event: React.FormEvent<EventTarget>) {
    this.setState({ title: (event.target as HTMLInputElement).value });
  }

  handleOnNewOption(text: string) {
    let options = this.state.options;
    options.push(text);
    this.setState({ options });
  }

  handleOnOptionRemoved(index: number) {
    let options = this.state.options;
    options.splice(index, 1);
    this.setState({ options });
  }

  handleFormSubmit() {
    this.props.onSubmit(this.state.title, this.state.options);
  }

  render(): React.ReactNode {
    return (
      <Form>
        <FormTitle>Create new poll</FormTitle>
        <Title onChange={this.handleOnTitleChange} value={this.state.title} />
        <Options
          onNewOption={this.handleOnNewOption}
          onOptionRemoved={this.handleOnOptionRemoved}
          options={this.state.options}
        />
        <hr />
        <Submit onClick={this.handleFormSubmit} text="Submit" />
      </Form>
    );
  }
}

export default hot(NewPollForm);
