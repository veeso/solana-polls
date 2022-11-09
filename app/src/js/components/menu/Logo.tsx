import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  padding: 24px 0;
`;

const Img = styled.img`
  height: 1em;
  width: auto;
`;

class Logo extends React.Component {
  render(): React.ReactNode {
    return (
      <Container>
        <Img
          src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=023"
          alt="solana-logo"
        />
      </Container>
    );
  }
}

export default hot(Logo);
