import { useState } from "react";
import { SORT, SeriesItem } from "../types";
import SeriesView from "./SeriesView";
import AddSessionView from "./AddSessionView";

type Props = {
  seriesItems: Array<SeriesItem>;
  addSession: (seriesTitle: string, act: number, saga?: number) => void;
};

function SeriesList({ seriesItems, addSession }: Props) {
  const [sortMethod, setSortMethod] = useState(SORT.RECENCY);
  const [sortReverse, setSortReverse] = useState(false);
  const [seriesToUpdate, setSeriesToUpdate] = useState<SeriesItem | undefined>(
    undefined
  );

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

  const sortBy = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const method = (e.target as HTMLButtonElement).name;
    if (method === sortMethod) setSortReverse(!sortReverse);
    setSortMethod(method);
  };

  const clearAddSessionForm = (): void => {
    setSeriesToUpdate(undefined);
  };

  return (
    <div>
      <h1>Series List Component</h1>
      {seriesToUpdate && (
        <AddSessionView
          seriesItem={seriesToUpdate}
          addSession={addSession}
          clearAddSessionForm={clearAddSessionForm}
        />
      )}
      <div>
        Sort:
        <button name={SORT.RECENCY} onClick={sortBy}>
          Recency
        </button>
        <button name={SORT.TITLE} onClick={sortBy}>
          Title
        </button>
      </div>
      {sortedItems().map((item) => (
        <SeriesView
          key={item.title}
          seriesItem={item}
          setSeriesToUpdate={setSeriesToUpdate}
        />
      ))}
    </div>
  );
}

export default SeriesList;
