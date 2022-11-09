import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import Link from "./menu/Link";
import Logo from "./menu/Logo";

const Header = styled.header`
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #ccc;
  color: #202020;
  display: flex;
  font-size: 1.5em;
  justify-content: space-between;
  width: 100%;
`;

const LogoSection = styled.div`
  padding: 0 24px;
  text-align: left;
`;

const Title = styled.h1`
  display: inline-block;
  color: #444;
  font-size: 1.2em;
  font-weight: 100;
  margin-left: 24px;
`;

const LinkSection = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const WalletSection = styled.div`
  padding: 0 24px;
  text-align: right;
`;

class Menu extends React.Component {
  render(): React.ReactNode {
    return (
      <Header>
        <LogoSection>
          <Logo />
          <Title>Solana Polls</Title>
        </LogoSection>
        <LinkSection>
          <Link route="" text="Polls"></Link>
          <Link route="new" text="New poll"></Link>
        </LinkSection>
        <WalletSection>
          <WalletMultiButton />
        </WalletSection>
      </Header>
    );
  }
}

export default hot(Menu);
