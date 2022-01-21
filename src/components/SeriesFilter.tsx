import { HStack } from "@chakra-ui/react";
import { SORT } from "../constants";

type Props = {
  filterMethod: string;
  filterBy: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sortMethod: string;
  sortReverse: boolean;
  sortBy: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formatPresence: (format: string) => boolean;
};

function SeriesFilter({
  formatPresence,
  filterMethod,
  filterBy,
  sortMethod,
  sortReverse,
  sortBy,
}: Props) {
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
    <HStack>
      <div>
        Sort:
        {sortButtons}
      </div>
      <div>
        Filter:
        {filterButtons}
      </div>
    </HStack>
  );
}

export default SeriesFilter;
