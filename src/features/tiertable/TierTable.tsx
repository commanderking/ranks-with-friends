import React from "react";
import Table from "rc-table";
import TestData from "./TierTableTestData";
import _ from "lodash";
import { createBookScoresHash, toCategoryScores } from "./tierTableUtils";
import { TierTableDataRow, FriendsDataType } from "./TierTableTypes";

// MOCK Test Data for Now
// TODO: Make API call to get actual data
const hashedDataByBook = createBookScoresHash(TestData);
const data: TierTableDataRow[] = _.map(hashedDataByBook, toCategoryScores);

const TierTable = () => {
  const sortedData = _.sortBy(data, "numericScore").reverse();

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      title: "Book",
      width: 300
    },
    ...TestData.map((friendData: FriendsDataType) => {
      return {
        dataIndex: friendData.friend,
        key: friendData.friend,
        render: (value: string) => {
          return (
            <div
              style={{
                color: "black",
                fontSize: "20px",
                padding: "20px"
              }}
            >
              {value}
            </div>
          );
        },
        title: friendData.friend,
        width: 100
      };
    }),
    {
      dataIndex: "overallScore",
      key: "overallScore",
      title: "Numeric Score",
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
