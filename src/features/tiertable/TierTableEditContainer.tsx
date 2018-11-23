import React from "react";
import TierTableEdit from "./components/TierTableEdit";
import { Query } from "react-apollo";
import { ACTIVITY_QUERY } from "./TierTableQueries";
import queryString from "query-string";

interface TierTableEditProps {
  match: {
    params: {
      activityId: string;
    };
  };
  location: {
    search: string;
  };
}

class TierTableEditContainer extends React.Component<TierTableEditProps, null> {
  render() {
    const { match, location } = this.props;
    const userId = queryString.parse(location.search).user;
    const activityId = match.params.activityId;
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
