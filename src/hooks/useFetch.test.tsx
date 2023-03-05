import useFetch from "./useFetch";
import React, { useEffect, useState } from "react";
import { act, render, screen } from "@testing-library/react";
import { Item, ItemResponse } from "../business/interfaces";

const MOCK_ITEMS = {
  items: [
    {
      title: "Reloj de Daniel Wellington",
    },
    {
      title: "Coche antiguo americano",
    },
  ],
};

global.fetch = jest.fn().mockImplementation();

const fakeUrl = "https://api.fake-rest.refine.dev";

const TestHook = () => {
  const { data, loading, error } = useFetch<ItemResponse>(fakeUrl);
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    setItems(data?.items ?? []);
  }, [data]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>There was an error</span>;

  return (
    <div>
      {items?.map((item) => (
        <span data-testid="Item" key={item.title}>
          {item.title}
        </span>
      ))}
    </div>
  );
};

describe("<useFetch />", () => {
  const mockedFetch = window.fetch as jest.Mock<any>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("It should test when request success", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_ITEMS,
    });

    await act(async () => render(<TestHook />));
    expect(screen.getAllByTestId("Item").length).toBe(2);
  });

  it("It should test when request fails", async () => {
    mockedFetch.mockRejectedValueOnce({
      ok: false,
    });

    await act(async () => render(<TestHook />));
    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });
});
