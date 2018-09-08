import React, { Component } from "react";
import "./App.css";
import TierTable from "./features/tiertable/TierTable.tsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TierTable />
      </div>
    );
  }
}

export default App;
