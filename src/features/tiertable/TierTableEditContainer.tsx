import React from "react";
import TierTableEdit from "./components/TierTableEdit";
import { Query } from "react-apollo";
import { ACTIVITY_QUERY } from "./TierTableQueries";

interface TierTableEditProps {
  match: {
    params: {
      activityId: string;
    };
  };
  location: {
    search: string;
  };
  userId: string;
}

class TierTableEditContainer extends React.Component<TierTableEditProps, null> {
  render() {
    const { match, userId } = this.props;
    const activityId = match.params.activityId;
    console.log("userId", userId);

    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <TierTableEdit
              data={data}
              userId={userId}
              activityId={activityId}
            />
          );
        }}
      </Query>
    );
  }
}

export default TierTableEditContainer;
