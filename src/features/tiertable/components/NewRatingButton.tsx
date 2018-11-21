import React from "react";
import { Mutation } from "react-apollo";
import { ACTIVITY_QUERY, ADD_ACTIVITY_RATING } from "../TierTableQueries";

interface NewRatingButtonProps {
  activityId: string;
  userId: string;
  itemRatings: string;
  openModal: (data: any) => void;
}

export const NewRatingButton = ({
  activityId,
  userId,
  itemRatings,
  openModal
}: NewRatingButtonProps) => {
  return (
    <Mutation
      mutation={ADD_ACTIVITY_RATING}
      key={"addActivityRating"}
      onCompleted={openModal}
      refetchQueries={() => [
        {
          query: ACTIVITY_QUERY,
          variables: {
            activityId
          }
        }
      ]}
    >
      {(addActivityRating, { loading: mutationLoading }) => {
        if (mutationLoading) return <p>Loading...</p>;

        return (
          <button
            onClick={e => {
              addActivityRating({
                variables: {
                  activityId,
                  friendId: userId,
                  itemRatings
                }
              });
            }}
          >
            Submit Ratings
          </button>
        );
      }}
    </Mutation>
  );
};
