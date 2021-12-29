import { useState } from "react";
import { SORT, SeriesItem } from "../types";
import SeriesView from "./SeriesView";

type Props = {
  seriesItems: Array<SeriesItem>;
};

function SeriesList({ seriesItems }: Props) {
  const [sortMethod, setSortMethod] = useState(SORT.RECENCY);
  const [sortReverse, setSortReverse] = useState(false);

  const sortedItems = (): Array<SeriesItem> => {
    const sorted = [...seriesItems].sort((itemA, itemB) => {
      switch (sortMethod) {
        case SORT.RECENCY:
          return itemB.updatedAtMs - itemA.updatedAtMs;
        case SORT.TITLE:
          return itemA.title.localeCompare(itemB.title);
        default:
          return itemB.updatedAtMs - itemA.updatedAtMs;
      }
    });
    return sortReverse ? sorted.reverse() : sorted;
  };

  return (
    <div>
      <h1>Series List Component</h1>
      {sortedItems().map((item) => (
        <SeriesView key={item.title} seriesItem={item} />
      ))}
    </div>
  );
}

export default SeriesList;
