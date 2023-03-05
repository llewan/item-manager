import { FavoriteItem, Favorites } from "./interfaces";

export default class FavoritesRepository {
  items: Favorites;

  constructor(items?: Favorites) {
    this.items = new Map(items) || new Map();
  }
  addFavorite(key: string, aFavoriteItem: FavoriteItem) {
    const itemsCopy = new Map(this.items);
    itemsCopy.set(key, aFavoriteItem);
    this.items = itemsCopy;
    return this;
  }
  removeFavorite(key: string) {
    const itemsCopy = new Map(this.items);
    itemsCopy.delete(key);
    this.items = itemsCopy;
    return this;
  }
  handleOnFavoriteItem(favoriteItem: FavoriteItem) {
    const key = favoriteItem.title;
    this.items.has(key)
      ? this.removeFavorite(key)
      : this.addFavorite(key, favoriteItem);
    return this;
  }
  search(q: string) {
    const items = Array.from(this.items.values());
    const filtered = items.filter((item) => {
      return item.title.toUpperCase().includes(q.toUpperCase());
    });
    this.items = new Map(filtered.map((obj) => [obj.title, { ...obj }]));
    return this;
  }

  then(aCallback: (items: Map<string, FavoriteItem>) => void) {
    aCallback(this.items);
  }
  build() {
    return this.items;
  }
}
