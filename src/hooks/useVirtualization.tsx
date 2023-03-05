import { useEffect, useState } from "react";

export const NUMBER_PER_PAGE = 5;

function useVirtualization<T>(items: T[]) {
  const [itemsToShow, setItemsToShow] = useState<T[]>([]);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const block = items?.slice(0, NUMBER_PER_PAGE);
    setCurrPage(2);
    setItemsToShow([...block]);
  }, [items]);

  const more = () => {
    const trimStart = (currPage - 1) * NUMBER_PER_PAGE;
    const trimEnd = trimStart + NUMBER_PER_PAGE;
    const block = items?.slice(trimStart, trimEnd);

    setCurrPage((prevState) => prevState + 1);
    setItemsToShow((prevState) => [...prevState, ...block]);
  };

  return { itemsToShow, more };
}

export default useVirtualization;
