export interface Item {
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}

export type FavoriteItem = Pick<Item, "title" | "image">;

export type Favorites = Map<string, FavoriteItem>;

export type ItemResponse = { items: Item[] };
