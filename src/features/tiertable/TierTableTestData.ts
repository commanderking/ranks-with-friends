import { FriendsDataType } from "./TierTableTypes";

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

/* Table data format (working)
[
  {
  "name": "The Once and Future King",
  "itemId": "1",
  "friendRatings" : {
    "JeffreyId": "A+",
    "AllisonId": "S",
    "Lin": "S-"
  },
  overallScore: "A+",
  numericScore: 0.7424
}
]

[
  {
    "name": "The Once and Future King",
    "Allison": "S",
    "Jeffrey": "A+",
    "Lin": "B+",
    "overallScore": "A+",
    "numericScore": 0.7619047619047619
  },
  {
    "name": "Rebecca",
    "Allison": "A",
    "Jeffrey": "B+",
    "Lin": "D-",
    "overallScore": "B-",
    "numericScore": 0.42857142857142855
  },
  {
    "name": "Billy Budd",
    "Allison": "C",
    "Jeffrey": "C+",
    "Lin": "D-",
    "overallScore": "C-",
    "numericScore": 0.21428571428571427
  }
]
*/

/* Table Column example
  [
    {
      dataIndex: friendId,
      key: friendId,
      title: friendName
    }
  ]
*/

export default Tiers;
