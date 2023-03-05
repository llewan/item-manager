import React from "react";

import useVirtualization from "../../hooks/useVirtualization";
import { FavoriteItem, Item as ItemInterface } from "../../business/interfaces";
import Item from "../item/item";

export type Props = {
  items: ItemInterface[];
  favorites: Map<string, FavoriteItem>;
  onFavorite: (favoriteItem: FavoriteItem) => void;
  isLoading?: boolean;
};

const Items = ({ items, favorites, onFavorite, isLoading = false }: Props) => {
  const { itemsToShow, more } = useVirtualization<ItemInterface>(items);
  const count = items?.length;
  const hasItems = Boolean(count);
  const showMoreBtn = hasItems && itemsToShow.length < count;

  if (isLoading) return <span>LOADING...</span>;
  return (
    <section className="Items">
      {hasItems ? (
        itemsToShow?.map((item) => (
          <Item
            item={item}
            key={item.title}
            isFavorite={Boolean(favorites.has(item.title))}
            onPress={onFavorite}
          />
        ))
      ) : (
        <span>No hay resultados</span>
      )}
      {showMoreBtn && <button onClick={more}>more items</button>}
    </section>
  );
};

export default Items;
