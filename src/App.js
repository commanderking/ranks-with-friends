import React, { Component } from "react";
import "./App.css";
import TierTable from "./features/tiertable/TierTable";
import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

// TODO: Update client based on graphql url
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <TierTable />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
