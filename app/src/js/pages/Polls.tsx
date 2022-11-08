import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

class Polls extends React.Component {
  render(): React.ReactNode {
    return (
      <Container>
        <h1>this is polls</h1>
      </Container>
    );
  }
}

export default hot(Polls);
