import * as React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Menu from "./js/components/Menu";
import Wallet from "./js/components/Wallet";
import Loading from "./js/pages/Loading";
import NewPoll from "./js/pages/NewPoll";
import Polls from "./js/pages/Polls";

interface Props {}

class App extends React.Component<Props> {
  render() {
    return (
      <>
        <Wallet>
          <BrowserRouter>
            <Menu />
            <main>
              <React.Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/new" element={<NewPoll />} />
                  <Route index path="/" element={<Polls />} />
                </Routes>
              </React.Suspense>
            </main>
          </BrowserRouter>
        </Wallet>
      </>
    );
  }
}

export default hot(App);
