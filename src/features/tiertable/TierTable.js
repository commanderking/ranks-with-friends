import React from "react";
import Table from "rc-table";
import TestData from "./TierTableTestData";
import _ from "lodash";
import ScoreEnum from "../../enums/Score";
import { createBookScoresHash, toCategoryScores } from "./tierTableUtils";

const hashedDataByBook = createBookScoresHash(TestData);
const data = _.map(hashedDataByBook, toCategoryScores);

const TierTable = () => {
  const sortedData = _.sortBy(data, "numericScore").reverse();

  const columns = [
    {
      title: "Book",
      dataIndex: "name",
      key: "name",
      width: 300
    },
    ...TestData.map(friendData => {
      return {
        title: friendData.friend,
        dataIndex: friendData.friend,
        key: friendData.friend,
        width: 100,
        render: (value, row) => {
          return (
            <div
              style={{
                backgroundColor: ScoreEnum[row[friendData.friend]].color,
                padding: "20px",
                fontSize: "20px",
                color: "white"
              }}
            >
              {value}
            </div>
          );
        }
      };
    }),
    {
      title: "Numeric Score",
      dataIndex: "numericScore",
      key: "numericScore",
      width: 100
    }
  ];

  return (
    <div>
      <h1>Tier Table</h1>
      <Table columns={columns} data={sortedData} />
    </div>
  );
};

export default TierTable;
