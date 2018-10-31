// Users can only select tiers from the dropdown
export const tiers: Tiers[] = ["S", "A", "B", "C", "D"];

export type Tiers = "D" | "C" | "B" | "A" | "S";

// When tiers of different friends are averaged for overall score though,
//we want to give more granular ratings
export const overallTiers: OverallTiers[] = [
  "D-",
  "D",
  "D+",
  "C-",
  "C",
  "C+",
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S"
];

export type OverallTiers =
  | "D-"
  | "D"
  | "D+"
  | "C-"
  | "C"
  | "C+"
  | "B-"
  | "B"
  | "B+"
  | "A-"
  | "A"
  | "A+"
  | "S-"
  | "S";
