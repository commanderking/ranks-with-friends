import React from "react";
import Table from "rc-table";
import { toTableData, getNumericScoreforRating } from "./tierTableUtils";
import { createNewRankingColumn } from "./components/NewRankingColumn";
import {
  Activity,
  RatingWithFriendInfo,
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
    width: 300
  },
  {
    dataIndex: "overallScore",
    key: "overallScore",
    title: "Overall Score",
    width: 100
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
      onCell: (record: any) => {
        const numericScoreForFriend = getNumericScoreforRating(
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
  }),
  createNewRankingColumn(setRating, activity, userId)
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
