import { flattenRatedItemsIntoArray } from "./tierTableUtils";
import { ratedItemsByRating } from "./TierTableTestData";
describe("tierTableUtils", () => {
  it("flattenRatedItemsIntoArray", () => {
    console.log("testData", ratedItemsByRating);
    const expectedRatings = [
      {
        itemId: "1",
        name: "The Once and Future King",
        rating: "A"
      },
      {
        itemId: "9",
        name: "The Catcher in the Rye",
        rating: "A"
      },
      {
        itemId: "3",
        name: "Rebecca",
        rating: "B"
      },
      {
        itemId: "16",
        name: "The House on Mango Street",
        rating: "D"
      }
    ];
    expect(flattenRatedItemsIntoArray(ratedItemsByRating)).toEqual(
      expectedRatings
    );
  });
});
