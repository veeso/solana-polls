import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
`;

const Loading = () => (
  <Container>
    <Loader />
    <h2>Please, wait...</h2>
  </Container>
);

export default hot(Loading);
