import Items, { Props } from "./items";
import { render, screen } from "@testing-library/react";
import React from "react";

const setup = (props: Props) => {
  const utils = render(<Items {...props} />);
  return {
    ...utils,
  };
};

describe("<Items />", () => {
  it("It should render an empty list", () => {
    setup({ favorites: new Map(), onFavorite: () => {}, items: [] });
    expect(screen.getByText(/No hay resultados/)).toBeInTheDocument();
  });
  it("It should render an Item", () => {
    const item = {
      title: "",
      description: "",
      price: "",
      email: "",
      image: "",
    };
    setup({ favorites: new Map(), onFavorite: () => {}, items: [item] });
    expect(screen.getByTestId("Item")).toBeInTheDocument();
  });
});
