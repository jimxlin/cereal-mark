import { useState } from "react";
import { Format, SORT, SeriesItem } from "../types";
import SeriesView from "./SeriesView";
import AddSessionView from "./AddSessionView";
import { reverse } from "dns";
import { classicNameResolver } from "typescript";

type Props = {
  seriesItems: Array<SeriesItem>;
  addSession: (
    seriesTitle: string,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ) => void;
};

function SeriesList({ seriesItems, addSession }: Props) {
  const [filterMethod, setFilterMethod] = useState("ANY");
  const [sortMethod, setSortMethod] = useState(SORT.RECENCY);
  const [sortReverse, setSortReverse] = useState(false);
  const [seriesToUpdate, setSeriesToUpdate] = useState<SeriesItem | undefined>(
    undefined
  );

  const filterItems = (items: Array<SeriesItem>): Array<SeriesItem> => {
    if (filterMethod === "ANY") return items;
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

  const sortButtons = [
    { name: "Recency", value: SORT.RECENCY },
    { name: "Title", value: SORT.TITLE },
  ].map((method) => {
    const selected = sortMethod === method.value;
    return (
      <button
        key={method.value}
        name={method.value}
        onClick={sortBy}
        {...(selected && { className: "inverse-btn" })}
      >
        {method.name} {selected && (sortReverse ? "<" : ">")}
      </button>
    );
  });

  const filterButtons = [
    { name: "Any", value: "ANY" },
    { name: "Shows", value: "SHOW" },
    { name: "Comics", value: "COMIC" },
    { name: "Books", value: "BOOK" },
  ].map((format) => {
    if (format.value !== "ANY" && !formatPresence(format.value)) return null;
    const selected = filterMethod === format.value;
    return (
      <button
        key={format.value}
        name={format.value}
        onClick={filterBy}
        {...(selected && { className: "inverse-btn" })}
      >
        {format.name}
      </button>
    );
  });

  return (
    <div className="filters">
      {seriesToUpdate && (
        <AddSessionView
          seriesItem={seriesToUpdate}
          addSession={addSession}
          clearAddSessionForm={clearAddSessionForm}
        />
      )}
      <div>
        Sort:
        {sortButtons}
      </div>
      <div>
        Filter:
        {filterButtons}
      </div>
      <br />
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
