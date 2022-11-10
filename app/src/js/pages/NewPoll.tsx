import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import NewPollForm from "../components/form/NewPollForm";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

const NewPoll = () => {
  const handleOnSubmit = (title: string, options: Array<string>) => {
    console.log(`form submit ${title}; ${options}`);
    // TODO: clear form
  };

  return (
    <Container>
      <NewPollForm onSubmit={handleOnSubmit} />
    </Container>
  );
};

export default hot(NewPoll);
