import FavoritesRepository from "./favoritesRepository";

describe("FavoritesRepository", () => {
  const FavRepo = new FavoritesRepository();

  it("It should add a Favorite", () => {
    let actual;
    FavRepo.handleOnFavoriteItem({
      title: "Washer",
      image: "https://washer.png",
    }).then((res) => {
      actual = res.get("Washer")?.title;
    });
    expect(actual).toEqual("Washer");
  });
  it("It should remove a Favorite", () => {
    let actual;
    FavRepo.handleOnFavoriteItem({
      title: "Washer",
      image: "https://washer.png",
    }).then((res) => {
      actual = res.get("Washer")?.title;
    });
    expect(actual).toBeUndefined();
  });
  it("It should search by title", () => {
    let actual;
    FavRepo.handleOnFavoriteItem({
      title: "Washer",
      image: "https://washer.png",
    })
      .handleOnFavoriteItem({
        title: "Televisor",
        image: "https://tv.png",
      })
      .search("tele")
      .then((res) => {
        actual = res.get("Televisor")?.title;
      });
    expect(actual).toBe("Televisor");
  });
});
