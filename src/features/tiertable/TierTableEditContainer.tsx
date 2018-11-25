import React from "react";
import TierTableEdit from "./components/TierTableEdit";
import { Query } from "react-apollo";
import { ACTIVITY_QUERY } from "./TierTableQueries";
import { UserInfo } from "../../serverTypes/graphql";

interface TierTableEditProps {
  match: {
    params: {
      activityId: string;
    };
  };
  location: {
    search: string;
  };
  userInfo: UserInfo;
}

class TierTableEditContainer extends React.Component<TierTableEditProps, null> {
  render() {
    const { match, userInfo } = this.props;
    const userId = userInfo ? userInfo.id : null;
    const activityId = match.params.activityId;

    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          if (!userId) return <p>Cannot edit without userId</p>;
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
