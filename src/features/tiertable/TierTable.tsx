import React from "react";
import Table from "rc-table";
import _ from "lodash";
import { createBookScoresHash, toCategoryScores } from "./tierTableUtils";
import { TierTableDataRow, FriendsDataType } from "./TierTableTypes";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const toTableData = (backendData: FriendsDataType[]) => {
  const hashedDataByBook = createBookScoresHash(backendData);
  const data: TierTableDataRow[] = _.map(hashedDataByBook, toCategoryScores);
  const sortedData = _.sortBy(data, "numericScore").reverse();
  return sortedData;
};

const createColumns = (backendData: FriendsDataType[]) => [
  {
    dataIndex: "name",
    key: "name",
    title: "Book",
    width: 300
  },
  ...backendData.map((friendData: FriendsDataType) => {
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

const TierTable = () => {
  // const sortedData = _.sortBy(data, "numericScore").reverse();
  return (
    <Query
      query={gql`
        {
          getTiersActivity {
            friend
            books {
              name
              score
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          data &&
          data.getTiersActivity && (
            <div>
              <h1>Tier Table</h1>
              <Table
                columns={createColumns(data.getTiersActivity)}
                data={toTableData(data.getTiersActivity)}
              />
            </div>
          )
        );
      }}
    </Query>
  );
};

export default TierTable;