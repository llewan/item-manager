import { Item } from "./interfaces";
import { SORT_ID, SortingOptions } from "./constants";

export default class ItemRepository {
  readonly items: Item[];
  displayItems: Item[];

  constructor(items: Item[]) {
    this.items = items;
    this.displayItems = items;
  }

  search(q: string) {
    this.displayItems = this.items.filter((item) => {
      const { title, email, description, price } = item;
      return (title + email + description + price)
        .toUpperCase()
        .includes(q.toUpperCase());
    });
    return this;
  }

  sortBy(sortBy: SORT_ID) {
    this.displayItems = [...this.displayItems].sort(
      SortingOptions[sortBy].compareFn
    );
    return this;
  }

  build() {
    return this.displayItems;
  }

  then(aCallback: (items: Item[]) => void) {
    aCallback(this.displayItems);
  }
}
