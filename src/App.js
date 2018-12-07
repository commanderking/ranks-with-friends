import React, { Component } from "react";
import "./App.css";
import TierTableContainer from "./features/tiertable/TierTableContainer";
import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import RouteConfig from "./routes/routeConfig";

const client = new ApolloClient({
  uri:
    process.env.ENVIRONMENT === "development"
      ? "http://localhost:4000/graphql"
      : "https://ranks-with-friends-server.herokuapp.com/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <RouteConfig />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
