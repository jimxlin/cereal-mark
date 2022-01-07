import { useState } from "react";
import { Format, SORT, SeriesItem } from "../types";
import SeriesView from "./SeriesView";
import AddSessionView from "./AddSessionView";

type Props = {
  seriesItems: Array<SeriesItem>;
  addSession: (seriesTitle: string, act: number, saga?: number) => void;
};

function SeriesList({ seriesItems, addSession }: Props) {
  const [filterMethod, setFilterMethod] = useState("Any");
  const [sortMethod, setSortMethod] = useState(SORT.RECENCY);
  const [sortReverse, setSortReverse] = useState(false);
  const [seriesToUpdate, setSeriesToUpdate] = useState<SeriesItem | undefined>(
    undefined
  );

  const filterItems = (items: Array<SeriesItem>): Array<SeriesItem> => {
    if (filterMethod === "Any") return items;
    return items.filter((item) => item.format === filterMethod);
  };

  const filterBy = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const method = (e.target as HTMLButtonElement).name;
    setFilterMethod(method);
  };

  const sortItems = (items: Array<SeriesItem>): Array<SeriesItem> => {
    const sorted = items.sort((itemA, itemB) => {
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

  const displayItems = (): Array<SeriesItem> => {
    // filterItems() does not mutate input
    return sortItems(filterItems(seriesItems));
  };

  const clearAddSessionForm = (): void => {
    setSeriesToUpdate(undefined);
  };

  const formatPresence = (format: string) => {
    return seriesItems.some((item) => item.format === format);
  };

  const filterButtons = ["Any", "SHOW", "COMIC", "BOOK"].map((format) => {
    if (format !== "Any" && !formatPresence(format)) return null;
    return (
      <button
        key={format}
        name={format}
        onClick={filterBy}
        style={{ fontSize: filterMethod === format ? "2rem" : "1rem" }}
      >
        {format}
      </button>
    );
  });

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
        <button
          name={SORT.RECENCY}
          onClick={sortBy}
          style={{ fontSize: sortMethod === SORT.RECENCY ? "2rem" : "1rem" }}
        >
          Recency
        </button>
        <button
          name={SORT.TITLE}
          onClick={sortBy}
          style={{ fontSize: sortMethod === SORT.TITLE ? "2rem" : "1rem" }}
        >
          Title
        </button>
        {"\u00A0"}
        {"\u00A0"}
        Filter:
        {filterButtons}
      </div>
      {displayItems().map((item) => (
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
