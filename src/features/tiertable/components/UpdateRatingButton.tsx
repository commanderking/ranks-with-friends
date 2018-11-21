import React from "react";
import { Mutation } from "react-apollo";
import { UPDATE_ACTIVITY_RATING } from "../TierTableQueries";

interface UpdateRatingButtonProps {
  activityId: string;
  userId: string;
  itemRatings: string;
  openModal: (data: any) => void;
}

export const UpdateRatingButton = ({
  activityId,
  userId,
  itemRatings,
  openModal
}: UpdateRatingButtonProps) => {
  return (
    <Mutation
      mutation={UPDATE_ACTIVITY_RATING}
      key={"updateActivityRating"}
      onCompleted={openModal}
    >
      {(updateActivityRating, { loading: mutationLoading }) => {
        if (mutationLoading) return <p>Loading...</p>;

        return (
          <button
            onClick={e => {
              updateActivityRating({
                variables: {
                  activityId,
                  friendId: userId,
                  itemRatings
                }
              });
            }}
          >
            Confirm Ratings
          </button>
        );
      }}
    </Mutation>
  );
};
