import React from "react";
import Table from "rc-table";
import { toTableData, getNumericOverallScoreRating } from "./tierTableUtils";
import {
  Activity,
  RatingWithFriendInfoQuery,
  FriendRating
} from "../../serverTypes/graphql";
import FriendRatingTitle from "./components/FriendRatingTitle";

const createColumns = (
  activity: Activity,
  setRating: (friendRating: FriendRating) => void,
  userId: string
) => [
  {
    dataIndex: "name",
    key: "name",
    title: "",
    render: (value: string) => {
      return <div style={{ textAlign: "right", padding: "10px" }}>{value}</div>;
    }
  },
  {
    dataIndex: "overallScore",
    key: "overallScore",
    title: "Overall Score",
    width: 100,
    render: (value: string) => {
      return (
        <div
          style={{
            color: "black",
            fontSize: "20px",
            padding: "10px"
          }}
        >
          {value}
        </div>
      );
    },
    onCell: (record: any) => {
      return {
        style: {
          border: "2px solid black",
          backgroundColor: `rgba(255, 0, 0, ${record.numericScore}`
        }
      };
    }
  },
  ...activity.activityRatings.map(
    (activityRating: RatingWithFriendInfoQuery) => {
      return {
        dataIndex: `friendRatings[${activityRating.friendId}]`,
        key: activityRating.friendId,
        render: (value: string) => {
          return (
            <div
              style={{
                color: "black",
                fontSize: "20px",
                padding: "10px"
              }}
            >
              {value}
            </div>
          );
        },
        onCell: (record: any) => {
          const numericScoreForFriend = getNumericOverallScoreRating(
            record.friendRatings[activityRating.friendId]
          );
          return {
            style: {
              backgroundColor: `rgba(255, 0, 0, ${numericScoreForFriend}`
            }
          };
        },
        title: (
          <FriendRatingTitle activityRating={activityRating} userId={userId} />
        ),
        width: 100
      };
    }
  )
];

// TODO: Create new type for data with Activity as property value
const TierTable = ({ data, setRating, userId }: any) => {
  return (
    <div>
      <Table
        columns={createColumns(data.activity, setRating, userId)}
        data={toTableData(data.activity)}
      />
    </div>
  );
};

export default TierTable;
