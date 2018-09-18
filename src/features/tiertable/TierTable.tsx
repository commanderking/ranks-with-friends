import React from "react";
import Table from "rc-table";
import { toTableData } from "./tierTableUtils";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Activity, RatingWithFriendInfo } from "../../serverTypes/graphql";

const createColumns = (activity: Activity) => [
  {
    dataIndex: "name",
    key: "name",
    title: "",
    width: 300
  },
  ...activity.activityRatings.map((activityRating: RatingWithFriendInfo) => {
    return {
      dataIndex: `friendRatings[${activityRating.friendId}]`,
      key: activityRating.friendId,
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
      title:
        (activityRating &&
          activityRating.friendInfo &&
          activityRating.friendInfo.firstName) ||
        "",
      width: 100
    };
  }),
  {
    dataIndex: "overallScore",
    key: "overallScore",
    title: "Overall Score",
    width: 100
  }
];

const TierTable = () => {
  return (
    <Query
      query={gql`
        {
          activity(activityId: "5b9d837ee7179a7a9fc653fc") {
            id
            title
            ratingType
            items {
              itemId
              name
            }
            activityRatings {
              activityId
              friendId
              friendInfo {
                firstName
                lastName
              }
              itemRatings {
                itemId
                rating
              }
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
          data.activity && (
            <div>
              <h1>{data.activity.title}</h1>
              <Table
                columns={createColumns(data.activity)}
                data={toTableData(data.activity)}
              />
            </div>
          )
        );
      }}
    </Query>
  );
};

export default TierTable;
