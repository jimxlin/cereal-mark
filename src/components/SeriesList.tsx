import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { SeriesItem } from "../types";
import { SORT } from "../constants";
import SeriesFilter from "./SeriesFilter";
import SeriesView from "./SeriesView";
import AddSessionView from "./AddSessionView";
import {
  HStack,
  Heading,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

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

  const {
    isOpen: isOpenCreateSessionForm,
    onOpen: onOpenCreateSessionForm,
    onClose: onCloseCreateSessionForm,
  } = useDisclosure();

  const openSessionFormModal = (seriesItem: SeriesItem): void => {
    setSeriesToUpdate(seriesItem);
    onOpenCreateSessionForm();
  };
  const closeSessionFormModal = (): void => {
    setSeriesToUpdate(undefined);
    onCloseCreateSessionForm();
  };

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
    if (method === sortMethod) {
      setSortReverse(!sortReverse);
    } else {
      setSortReverse(false);
    }
    setSortMethod(method);
  };

  const displayItems = (): Array<SeriesItem> => {
    // filterItems() does not mutate input
    return sortItems(filterItems(seriesItems));
  };

  const formatPresence = (format: string): boolean => {
    return seriesItems.some((item) => item.format === format);
  };

  const singleFormat = seriesItems.every(
    (item) => item.format === seriesItems[0].format
  );

  return (
    <VStack spacing={4}>
      {seriesToUpdate && (
        <AddSessionView
          seriesItem={seriesToUpdate}
          addSession={addSession}
          isOpen={isOpenCreateSessionForm}
          onClose={closeSessionFormModal}
        />
      )}
      <SeriesFilter
        formatPresence={formatPresence}
        singleFormat={singleFormat}
        filterMethod={filterMethod}
        filterBy={filterBy}
        sortMethod={sortMethod}
        sortReverse={sortReverse}
        sortBy={sortBy}
      />
      {displayItems().map((item) => (
        <SeriesView
          key={item.title}
          seriesItem={item}
          openSessionForm={openSessionFormModal}
        />
      ))}
    </VStack>
  );
}

export default SeriesList;
