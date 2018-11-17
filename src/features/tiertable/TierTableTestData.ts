import { FriendsDataType } from "./TierTableTypes";
import { ItemWithUserRatingByRating } from "./TierTableTypes";

const Tiers: FriendsDataType[] = [
  {
    friend: "Allison",
    ratings: [
      {
        name: "The Once and Future King",
        score: "S"
      },
      {
        name: "Billy Budd",
        score: "C"
      },
      {
        name: "Rebecca",
        score: "A"
      }
    ]
  },
  {
    friend: "Jeffrey",
    ratings: [
      {
        name: "The Once and Future King",
        score: "A"
      },
      {
        name: "Billy Budd",
        score: "C"
      },
      {
        name: "Rebecca",
        score: "B"
      }
    ]
  },
  {
    friend: "Lin",
    ratings: [
      {
        name: "The Once and Future King",
        score: "B"
      },
      {
        name: "Billy Budd",
        score: "D"
      },
      {
        name: "Rebecca",
        score: "D"
      }
    ]
  }
];

export const ratedItemsByRating: ItemWithUserRatingByRating = {
  S: [],
  A: [
    {
      itemId: "1",
      name: "The Once and Future King",
      rating: "A"
    },
    {
      itemId: "9",
      name: "The Catcher in the Rye",
      rating: "A"
    }
  ],
  B: [
    {
      itemId: "3",
      name: "Rebecca",
      rating: "B"
    }
  ],
  C: [],
  D: [
    {
      itemId: "16",
      name: "The House on Mango Street",
      rating: "D"
    }
  ]
};

export default Tiers;
