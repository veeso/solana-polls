import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const Container = styled.div`
  display: inline-block;
  padding: 0 24px;
`;

const Url = styled(RouterLink)`
  color: #202020;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;
  :hover {
    color: black;
  }
`;

interface Props {
  route: string;
  text: string;
}

const Link = (props: Props) => {
  const href = `/${props.route}`;
  return (
    <Container>
      <Url to={href}>
        <span>{props.text}</span>
      </Url>
    </Container>
  );
};

export default hot(Link);
