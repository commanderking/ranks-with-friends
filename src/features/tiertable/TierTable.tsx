import React from "react";
import Table from "rc-table";
import _ from "lodash";
import { createBookScoresHash, toCategoryScores } from "./tierTableUtils";
import { TierTableDataRow, FriendsDataType } from "./TierTableTypes";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const toTableData = (tiersActivityData: FriendsDataType[]) => {
  const hashedDataByBook = createBookScoresHash(tiersActivityData);
  const data: TierTableDataRow[] = _.map(hashedDataByBook, toCategoryScores);
  return _.sortBy(data, "numericScore").reverse();
};

const createColumns = (tiersActivityData: FriendsDataType[]) => [
  {
    dataIndex: "name",
    key: "name",
    title: "Book",
    width: 300
  },
  ...tiersActivityData.map((activityData: FriendsDataType) => {
    return {
      dataIndex: activityData.friend,
      key: activityData.friend,
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
      title: activityData.friend,
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
  return (
    <Query
      query={gql`
        {
          getTiersActivity {
            friend
            title
            ratings {
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
        console.log("data", data);
        console.log(toTableData(data.getTiersActivity));
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
