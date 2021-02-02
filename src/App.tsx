import * as React from "react";

import { TweetContext } from "./providers/tweets";
import { GlobalStyles } from "./global-styles";

import Feed from "./containers/feed/Feed";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Twitter</h1>
        <TweetContext>
          <Feed />
        </TweetContext>
      </header>
      <GlobalStyles />
    </div>
  );
}

export default App;
