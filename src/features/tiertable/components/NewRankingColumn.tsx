import React from "react";
import Select from "react-select";
import { FriendRating } from "../../../serverTypes/graphql";
import { tierOptions } from "../tierTableUtils";
import { Activity } from "../../../serverTypes/graphql";

export const createNewRankingColumn = (
  setRating: (friendRating: FriendRating) => void,
  activity: Activity,
  friendId: string
) => {
  const activityIds = activity.activityRatings.map(
    activity => activity.friendId
  );
  const shouldShowNewRankingColumn = !activityIds.includes(friendId);
  console.log("shouldShowNewRankingColumn", shouldShowNewRankingColumn);
  return shouldShowNewRankingColumn
    ? {
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
    : {};
};
