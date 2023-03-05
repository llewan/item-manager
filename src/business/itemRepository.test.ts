import ItemRepository from "./itemRepository";
import data from "../../data/items.json";
import { SORT_ID } from "./constants";

describe("ItemRepository", () => {
  it("It should search by title", () => {
    const ItemRepo = new ItemRepository(data.items);
    const results = ItemRepo.search("iPhone").build();
    expect(results.length).toBe(1);
    expect(results[0].title).toEqual("iPhone 6S Oro");
  });
  it("It should sort by price asc", () => {
    const ItemRepo = new ItemRepository(data.items);
    const results = ItemRepo.sortBy(SORT_ID.PRICE_ASC).build();
    expect(results[0].price).toEqual("5");
    expect(results[results.length - 1].price).toEqual("288000");
  });
  it("It should sort by price desc", () => {
    const ItemRepo = new ItemRepository(data.items);
    const results = ItemRepo.sortBy(SORT_ID.PRICE_DESC).build();
    expect(results[0].price).toEqual("288000");
    expect(results[results.length - 1].price).toEqual("5");
  });
  it("It should search and sort", () => {
    const ItemRepo = new ItemRepository(data.items);
    const results = ItemRepo.search("piel").sortBy(SORT_ID.EMAIL_ASC).build();
    expect(results[0].email).toEqual("bagmail@wallapop.com");
    expect(results[results.length - 1].email).toEqual("watchmail@wallapop.com");
  });
  it("It should execute callback", () => {
    let actual;
    const ItemRepo = new ItemRepository(data.items);
    ItemRepo.search("piel")
      .sortBy(SORT_ID.EMAIL_ASC)
      .then((res) => {
        actual = res[0].title;
      });
    expect(actual).toEqual("Bolso piel marca Hoss");
  });
});
