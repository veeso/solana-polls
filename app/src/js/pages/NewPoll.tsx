import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import NewPollForm from "../components/form/NewPollForm";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

class NewPoll extends React.Component {
  constructor(props: {}) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(title: string, options: Array<string>) {
    console.log(`form submit ${title}; ${options}`);
    // TODO: clear form
  }

  render(): React.ReactNode {
    return (
      <Container>
        <NewPollForm onSubmit={this.handleOnSubmit} />
      </Container>
    );
  }
}

export default hot(NewPoll);
