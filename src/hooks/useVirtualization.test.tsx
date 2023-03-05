import useVirtualization from "./useVirtualization";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

type Props = {
  items: string[];
};

const TestHook = (props: Props) => {
  const { itemsToShow, more } = useVirtualization(props.items);
  return (
    <div>
      {itemsToShow.map((item) => (
        <span data-testid="Item" key={item}>
          {item}
        </span>
      ))}
      <button onClick={more}>More items</button>
    </div>
  );
};

const setup = (props: Props) => {
  const utils = render(<TestHook {...props} />);
  const moreButton = screen.getByRole("button");
  return {
    moreButton,
    ...utils,
  };
};

const items = ["item1", "item2", "item3", "item4", "item5", "item6", "item7"];

describe("<useVirtualization />", () => {
  it("It should properly test virtualization", () => {
    const { moreButton } = setup({ items });
    expect(screen.getAllByTestId("Item").length).toBe(5);
    fireEvent.click(moreButton);
    expect(screen.getAllByTestId("Item").length).toBe(7);
  });

  it("It should render first page", () => {
    setup({ items: [] });
    expect(() => screen.getByTestId("Item")).toThrow();
  });
});
