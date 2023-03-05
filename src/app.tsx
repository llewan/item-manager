import React, { useEffect, useMemo, useState } from "react";
import "./style.scss";
import Header from "./components/header/header";
import Items from "./components/items/items";
import useQueryString from "./hooks/useQueryString";
import SortingFacet from "./components/sortingFacet/sortingFacet";
import { AccordionItem, Accordion } from "./components/accordion/accordion";
import { Favorites, Item, ItemResponse } from "./business/interfaces";
import FavoriteModal from "./components/favoriteModal/favoriteModal";
import { SORT_ID } from "./business/constants";
import ItemRepository from "./business/itemRepository";
import FavoritesRepository from "./business/favoritesRepository";
import useFetch from "./hooks/useFetch";
const FavRepo = new FavoritesRepository();

const App = () => {
  const [search, onSetSearchValue] = useQueryString("q");
  const [sortBy, onSetSortBy] = useQueryString("sort", SORT_ID.TITLE_ASC);
  const [items, setItems] = useState<Item[]>([]);
  const [favorites, setFavorites] = useState<Favorites>(new Map());
  const [show, setShow] = useState(false);
  const { loading, data } = useFetch<ItemResponse>(
    "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json"
  );
  const ItemRepo = useMemo(() => {
    const cachedItems = data?.items ?? [];
    return new ItemRepository(cachedItems);
  }, [data]);

  useEffect(() => {
    ItemRepo.search(search).sortBy(sortBy).then(setItems);
  }, [data, search, sortBy]);

  return (
    <main className="App">
      <Header
        onSearch={onSetSearchValue}
        search={search}
        onFavoritesClick={() => setShow(true)}
      />

      <section className="App-body">
        <aside className="App-sidebar">
          <h3>Ordenar y filtrar</h3>
          <Accordion>
            <AccordionItem title="Ordenar por">
              <SortingFacet sortBy={sortBy} onSort={onSetSortBy} />
            </AccordionItem>
          </Accordion>
        </aside>

        <Items
          isLoading={loading}
          items={items}
          favorites={favorites}
          onFavorite={(favoriteItem) => {
            FavRepo.handleOnFavoriteItem(favoriteItem).then(setFavorites);
          }}
        />
      </section>

      <FavoriteModal
        show={show}
        onClose={() => setShow(false)}
        favorites={favorites}
        onRemoveFavorite={(key: string) => {
          FavRepo.removeFavorite(key).then(setFavorites);
        }}
      />
    </main>
  );
};

export default App;
