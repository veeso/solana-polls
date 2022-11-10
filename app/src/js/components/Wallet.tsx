import * as React from "react";
import { hot } from "react-hot-loader/root";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const config = {
  solana_polls_account: "",
  network: "devnet",
  endpoint: "https://api.devnet.solana.com",
};

require("@solana/wallet-adapter-react-ui/styles.css");

interface Props {
  children?: JSX.Element;
}

class Wallet extends React.Component<Props> {
  render() {
    const network = WalletAdapterNetwork.Devnet;
    const wallets = [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ];

    return (
      <ConnectionProvider endpoint={config.endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          {this.props.children}
        </WalletProvider>
      </ConnectionProvider>
    );
  }
}

export default hot(Wallet);
