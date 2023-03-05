import SearchBar from "./searchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

type Props = {
  onSearch: (q: string) => void;
  search: string;
};

const setup = (props: Props) => {
  const utils = render(<SearchBar {...props} />);
  const input = screen.getByPlaceholderText("Buscar");
  return {
    input: input as HTMLInputElement | null,
    ...utils,
  };
};

describe("<SearchBar />", () => {
  it("It should render a search value", () => {
    const { input } = setup({ search: "tv", onSearch: () => {} });
    expect(input?.value).toBe("tv");
  });

  it("It should fire onSearch callback", () => {
    let expected = "";
    const { input } = setup({
      search: "tv",
      onSearch: (val) => {
        expected = val;
      },
    });

    fireEvent.change(input!, { target: { value: "mobile" } });
    expect(expected).toBe("mobile");
  });
});
