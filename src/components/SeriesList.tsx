import { useState } from "react";
import { VStack, useDisclosure } from "@chakra-ui/react";
import { SeriesItem, Format } from "../types";
import { SORT } from "../constants";
import SeriesFilter from "./SeriesFilter";
import SeriesView from "./SeriesView";
import EditSeriesView from "./EditSeriesView";
import AddSessionView from "./AddSessionView";

type Props = {
  seriesItems: Array<SeriesItem>;
  seriesExists: (title: string | undefined, ownTitle?: string) => boolean;
  editSeries: (
    oldTitle: string,
    title: string,
    format: Format,
    viewUrl: string | undefined
  ) => void;
  addSession: (
    seriesTitle: string,
    act: number,
    saga: number | undefined
  ) => void;
};

function SeriesList({
  seriesItems,
  seriesExists,
  editSeries,
  addSession,
}: Props) {
  const [filterMethod, setFilterMethod] = useState("ANY");
  const [sortMethod, setSortMethod] = useState(SORT.RECENCY);
  const [sortReverse, setSortReverse] = useState(false);
  const [seriesToUpdate, setSeriesToUpdate] = useState<SeriesItem | undefined>(
    undefined
  );
  const [seriesToEdit, setSeriesToEdit] = useState<SeriesItem | undefined>(
    undefined
  );

  const {
    isOpen: isOpenEditSeriesForm,
    onOpen: onOpenEditSeriesFormm,
    onClose: onCloseEditSeriesForm,
  } = useDisclosure();
  const openSeriesFormModal = (seriesItem: SeriesItem): void => {
    setSeriesToEdit(seriesItem);
    onOpenEditSeriesFormm();
  };
  const closeSeriesFormModal = (): void => {
    setSeriesToEdit(undefined);
    onCloseEditSeriesForm();
  };

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

  const filterBy = (method: string): void => {
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

  const sortBy = (method: string): void => {
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
    <VStack spacing={6}>
      {seriesToUpdate && (
        <AddSessionView
          seriesItem={seriesToUpdate}
          addSession={addSession}
          isOpen={isOpenCreateSessionForm}
          onClose={closeSessionFormModal}
        />
      )}
      {seriesToEdit && (
        <EditSeriesView
          seriesItem={seriesToEdit}
          editSeries={editSeries}
          seriesExists={seriesExists}
          isOpen={isOpenEditSeriesForm}
          onClose={closeSeriesFormModal}
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
      <VStack spacing={4}>
        {displayItems().map((item) => (
          <SeriesView
            key={item.title}
            seriesItem={item}
            openSeriesForm={openSeriesFormModal}
            openSessionForm={openSessionFormModal}
          />
        ))}
      </VStack>
    </VStack>
  );
}

export default SeriesList;
