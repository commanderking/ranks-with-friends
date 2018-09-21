import React from "react";
import Table from "rc-table";
import { toTableData, tierOptions } from "./tierTableUtils";

import {
  Activity,
  RatingWithFriendInfo,
  FriendRating
} from "../../serverTypes/graphql";
import Select from "react-select";

const createColumns = (
  activity: Activity,
  setRating: (friendRating: FriendRating) => void
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
      title:
        (activityRating &&
          activityRating.friendInfo &&
          activityRating.friendInfo.firstName) ||
        "",
      width: 100
    };
  }),
  {
    dataIndex: "test",
    key: "test",
    title: "Your Ranking",
    width: 100,
    render: (value: string, record: any) => {
      return (
        <Select
          options={tierOptions}
          onChange={(option: any) => {
            setRating({
              rating: option.value,
              itemId: record.id
            });
          }}
        />
      );
    }
  }
];

// TODO: Create new type for data with Activity as property value
const TierTable = ({ data, setRating }: any) => {
  return (
    <div>
      <Table
        columns={createColumns(data.activity, setRating)}
        data={toTableData(data.activity)}
      />
    </div>
  );
};

export default TierTable;
