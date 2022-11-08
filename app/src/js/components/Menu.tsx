import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import Link from "./menu/Link";
import Logo from "./menu/Logo";

const Header = styled.header`
  align-items: center;
  background-color: white;
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
