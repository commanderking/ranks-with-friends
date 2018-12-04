export interface Item {
  name: string;
  itemId: string;
  link: string;
}

export interface ActivityType {
  title: string;
  ratingType: string;
  description: string;
  itemInputFieldsCount: number;
  items: {
    [key: string]: Item;
  };
}

export interface Event {
  target: {
    value: string;
  };
}
