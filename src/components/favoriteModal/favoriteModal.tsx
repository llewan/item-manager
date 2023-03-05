import React, { useMemo, useState } from "react";
import { FavoriteItem } from "../../business/interfaces";
import Item from "../item/item";
import SearchBar from "../searchBar/searchBar";
import FavoritesRepository from "../../business/favoritesRepository";

type Props = {
  show: boolean;
  onClose: () => void;
  favorites: Map<string, FavoriteItem>;
  onRemoveFavorite: (key: string) => void;
};

const FavoriteModal = (props: Props) => {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const FavRepo = new FavoritesRepository(props.favorites);
    const favs = FavRepo.search(search.toUpperCase()).build();
    return Array.from(favs.values());
  }, [search, props.favorites]);

  if (!props.show) return null;

  return (
    <div className="FavoriteModal" onClick={props.onClose}>
      <div
        className="FavoriteModal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="FavoriteModal-header">
          <h3>Favorites</h3>
          <SearchBar search={search} onSearch={setSearch} />
        </div>
        <div className="FavoriteModal-body">
          {filtered.length ? (
            filtered.map((item) => (
              <Item
                item={item}
                key={item.title}
                onPress={({ title }) => props.onRemoveFavorite(title)}
                isFavorite
                thumbnailVariant
              />
            ))
          ) : (
            <span>No hay resultados</span>
          )}
        </div>
        <div className="FavoriteModal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
