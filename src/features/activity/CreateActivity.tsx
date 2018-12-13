import React from "react";
import _ from "lodash";
import { RouteProps } from "../../routes/routeTypes";
import { Mutation } from "react-apollo";
import { CREATE_ACTIVITY } from "../../requests/activity";
import { UserInfo } from "../../serverTypes/graphql";
import { ActivityType, Event } from "./CreateActivityTypes";
import CreateActivityItemInput from "./components/CreateActivityItemInput";

class CreateActivity extends React.Component<RouteProps, ActivityType> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      title: "",
      ratingType: "Tiers",
      description: "",
      itemInputFieldsCount: 30,
      items: {}
    };
  }

  handleTitleChange = (event: Event) => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = (event: Event) => {
    this.setState({ description: event.target.value });
  };

  handleLabelChange = (event: Event) => {
    this.setState({ description: event.target.value });
  };

  handleItemNameChange = (event: Event, index: number) => {
    this.setState({
      items: {
        ...this.state.items,
        [index]: {
          ...this.state.items[index],
          name: event.target.value,
          itemId: index + 1
        }
      }
    });
  };

  handleItemLinkChange = (event: Event, index: number) => {
    this.setState({
      items: {
        ...this.state.items,
        [index]: {
          ...this.state.items[index],
          link: event.target.value
        }
      }
    });
  };

  handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    createActivity: any,
    userInfo: UserInfo
  ): void => {
    event.preventDefault();
    const { items, title, ratingType, description } = this.state;
    const itemsForSubmission = _.reduce(
      items,
      (accumulatedItems, value) => {
        return [...accumulatedItems, value];
      },
      []
    );
    const requestParameters = {
      title,
      ratingType,
      description,
      items: JSON.stringify(itemsForSubmission)
    };
    createActivity({
      variables: requestParameters
    });
  };

  render() {
    const { userInfo } = this.props;
    const userId = userInfo ? userInfo.id : null;
    const { title, description, itemInputFieldsCount, items } = this.state;
    if (!userId) {
      return <p>Sorry, only users can creative activities</p>;
    }
    return (
      <div>
        <h3>Create Activity</h3>
        <Mutation
          mutation={CREATE_ACTIVITY}
          key={"addActivityRating"}
          // Will probably need to refetch all activities once that's built
          /*
          refetchQueries={() => [
            {
              query: ACTIVITY_QUERY,
              variables: {
                activityId
              }
            }
          ]}
          */
        >
          {(createActivity, { loading, data }) => {
            if (loading) return <p>Loading...</p>;
            return (
              <form
                onSubmit={event => {
                  this.handleSubmit(event, createActivity, userInfo);
                }}
              >
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={this.handleTitleChange}
                />

                <label>Description</label>
                <textarea
                  value={description}
                  onChange={this.handleDescriptionChange}
                />
                {_.times(itemInputFieldsCount, index => (
                  <CreateActivityItemInput
                    items={items}
                    index={index}
                    handleItemNameChange={this.handleItemNameChange}
                    handleItemLinkChange={this.handleItemLinkChange}
                  />
                ))}
                <label>Items</label>
                <button type="submit" value="Submit">
                  Add Activity
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CreateActivity;
