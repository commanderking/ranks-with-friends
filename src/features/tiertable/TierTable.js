import React from "react";
import Table from "rc-table";
import TestData from "./TierTableTestData";

const columns = TestData.map(friendData => ({
  title: friendData.friend
}));

const TierTable = () => {
  return (
    <div>
      <h1>Tier Table</h1>
    </div>
  );
};

export default TierTable;
