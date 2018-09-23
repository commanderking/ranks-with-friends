import React from "react";
import Select from "react-select";
import { FriendRating } from "../../../serverTypes/graphql";
import { tierOptions } from "../tierTableUtils";
import { Activity } from "../../../serverTypes/graphql";
import { hasFriendCompletedActivityRating } from "../tierTableUtils";

export const createNewRankingColumn = (
  setRating: (friendRating: FriendRating) => void,
  activity: Activity,
  friendId: string
) => {
  return hasFriendCompletedActivityRating(activity, friendId)
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
