import React from "react";
import { SORT_ID, SortingOptions } from "../../business/constants";

type Props = {
  sortBy: SORT_ID;
  onSort: (sorting: SORT_ID) => void;
};

const SortingFacet = (props: Props) => {
  return (
    <div>
      {Object.entries(SortingOptions).map(([key, value]) => {
        return (
          <div key={key}>
            <input
              type="radio"
              id={key}
              value={key}
              name="sorting"
              onChange={(e) => props.onSort(e.target.value as SORT_ID)}
              checked={key === props.sortBy}
            />
            <label htmlFor={key}>{value.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default SortingFacet;
