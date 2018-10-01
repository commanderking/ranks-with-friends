// Users can only select tiers from the dropdown
export const tiers: Tiers[] = ["F", "E", "D", "C", "B", "A", "S"];

export type Tiers = "F" | "E" | "D" | "C" | "B" | "A" | "S";

// When tiers of different friends are averaged for overall score though,
//we want to give more granular ratings
export const overallTiers: OverallTiers[] = [
  "F",
  "F+",
  "E-",
  "E",
  "E+",
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
  | "F"
  | "F+"
  | "E-"
  | "E"
  | "E+"
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
