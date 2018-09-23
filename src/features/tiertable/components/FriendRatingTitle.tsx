import React from "react";
import { ACTIVITY_QUERY, DELETE_ACTIVITY_RATING } from "../TierTableQueries";
import { RatingWithFriendInfo } from "../../../serverTypes/graphql";
import { Mutation } from "react-apollo";

const FriendRatingTitle = ({
  activityRating,
  userId
}: {
  activityRating: RatingWithFriendInfo;
  userId: string;
}) => {
  const { friendId, activityId, friendInfo } = activityRating;
  const title = (friendInfo && friendInfo.firstName) || "";
  // TODO: Check the logged in user id and see if it matches friend
  const showActivityRating = friendId === userId;
  return (
    <Mutation
      mutation={DELETE_ACTIVITY_RATING}
      key={"AddActivityRating"}
      refetchQueries={() => [
        {
          query: ACTIVITY_QUERY
        }
      ]}
      awaitRefetchQueries
    >
      {deleteActivityRatings => (
        <div>
          <span>{title}</span>
          {showActivityRating && (
            <button
              onClick={e => {
                deleteActivityRatings({
                  variables: {
                    activityId: activityId,
                    friendId: friendId
                  }
                });
              }}
            >
              X
            </button>
          )}
        </div>
      )}
    </Mutation>
  );
};

export default FriendRatingTitle;
