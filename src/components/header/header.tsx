import React from "react";
import SearchBar from "../searchBar/searchBar";

type Props = {
  onSearch: (q: string) => void;
  search: string;
  onFavoritesClick: () => void;
};

const Header = (props: Props) => {
  return (
    <header className="Header">
      <img
        src="https://es.wallapop.com/images/logos/logo-wallapop-home-v2.svg"
        alt="Wallapop"
      />

      <SearchBar search={props.search} onSearch={props.onSearch} />

      <button
        className="Header-favoriteButton"
        onClick={props.onFavoritesClick}
      >
        <img
          src="https://es.wallapop.com/images/icons/heart-hover.svg"
          alt=""
        />
        Favoritos
      </button>
    </header>
  );
};

export default Header;
