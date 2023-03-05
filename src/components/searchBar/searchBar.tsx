import React from "react";

type Props = {
  onSearch: (q: string) => void;
  search: string;
};

const SearchBar = (props: Props) => {
  return (
    <div className="SearchBar">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z" />
      </svg>
      <input
        className="SearchBar-input"
        type="search"
        id="search"
        name="search"
        placeholder="Buscar"
        onChange={(event) => props.onSearch(event.target.value)}
        value={props.search}
      />
    </div>
  );
};

export default SearchBar;
