import React from "react";
import _ from "lodash";
import { RouteProps } from "../../routes/routeTypes";
import { Mutation } from "react-apollo";
import { CREATE_ACTIVITY } from "../../requests/activity";
import { UserInfo } from "../../serverTypes/graphql";

interface ItemObject {
  [key: string]: {
    name: string;
    link: string;
  };
}

interface ActivityType {
  title: string;
  ratingType: string;
  description: string;
  itemInputFieldsCount: number;
  items: ItemObject;
}

interface Event {
  target: {
    value: string;
  };
}

// const renderItemsInput = () => {};

class CreateActivity extends React.Component<RouteProps, ActivityType> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      title: "",
      ratingType: "Tiers",
      description: "",
      itemInputFieldsCount: 10,
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
      friendId: userInfo.id,
      title,
      ratingType,
      description,
      items: JSON.stringify(itemsForSubmission)
    };
    console.log("requestParameters", requestParameters);
    createActivity({
      variables: requestParameters
    });
  };

  render() {
    const { userInfo } = this.props;
    console.log("userInfo", userInfo);
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
            console.log("loading", loading);
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
                {_.times(itemInputFieldsCount, index => {
                  return (
                    <div>
                      <div>Item {index}</div>
                      <label>Item Name</label>
                      <input
                        type="text"
                        value={(items[index] && items[index].name) || ""}
                        onChange={event => {
                          this.handleItemNameChange(event, index);
                        }}
                      />
                      <label>Item Link</label>
                      <input
                        type="text"
                        value={(items[index] && items[index].link) || ""}
                        onChange={event => {
                          this.handleItemLinkChange(event, index);
                        }}
                      />
                    </div>
                  );
                })}
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
