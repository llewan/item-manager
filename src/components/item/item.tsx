import React from "react";
import { FavoriteItem, Item } from "../../business/interfaces";

type Props = {
  item: Partial<Item> & Pick<Item, "title" | "image">;
  isFavorite: boolean;
  onPress: (favoriteItem: FavoriteItem) => void;
  thumbnailVariant?: boolean;
};

const Item = (props: Props) => {
  const { thumbnailVariant = false, isFavorite, item } = props;
  const { title, image, price, email, description } = item;
  return (
    <article
      className={`${thumbnailVariant ? "Item Item--small" : "Item"}`}
      key={title}
      data-testid="Item"
    >
      <div className="Item-image">
        <img src={image} alt={title} loading="lazy" />

        <button
          onClick={() => props.onPress({ title, image })}
          className={`${
            isFavorite
              ? "Item-image-favoriteButton Item-image-favoriteButton--selected"
              : "Item-image-favoriteButton"
          }`}
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            display="flex"
          >
            <path d="M13.527 0C17.094 0 19.995 2.959 20 6.597c.007 5.099-3.913 8.764-8.87 11.119l-.196.091c-.31.134-.59.194-.916.194-.29 0-.573-.053-.893-.178C4.025 15.497.006 11.825 0 6.624-.003 2.978 2.895.011 6.47.01c1.25 0 2.472.37 3.518 1.065A6.323 6.323 0 0 1 13.526 0Z" />
          </svg>
        </button>
      </div>

      <hgroup className="Item-info">
        <div className="Item-info-title">
          <h3>{title}</h3>
          {price && <strong>{price} EUR</strong>}
        </div>
        <span>{email}</span>
        <p className="Item-info-description">{description}</p>
      </hgroup>
    </article>
  );
};

export default Item;
