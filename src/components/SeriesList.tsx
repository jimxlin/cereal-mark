import { useState } from "react";
import { VStack, useDisclosure } from "@chakra-ui/react";
import { SeriesItem, Format } from "../types";
import { SORT } from "../constants";
import SeriesFilter from "./SeriesFilter";
import SeriesView from "./SeriesView";
import SeriesViewCompact from "./SeriesViewCompact";
import EditSeriesView from "./EditSeriesView";
import AddSessionView from "./AddSessionView";

type Props = {
  compactView: boolean;
  seriesItems: Array<SeriesItem>;
  seriesExists: (title: string | undefined, ownTitle?: string) => boolean;
  restoreSeries: (title: string) => void;
  editSeries: (
    oldTitle: string,
    title: string,
    format: Format,
    viewUrl: string | undefined,
    archived: boolean,
    complete: boolean,
    favorite: boolean
  ) => void;
  addSession: (
    seriesTitle: string,
    act: number,
    saga: number | undefined
  ) => void;
};

function SeriesList({
  compactView,
  seriesItems,
  restoreSeries,
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
    if (filterMethod === "ANY") return items.filter((item) => !item.archived);
    if (filterMethod === "favorite")
      return items.filter((item) => item.favorite);
    if (filterMethod === "archived")
      return items.filter((item) => item.archived);
    return items.filter(
      (item) => item.format === filterMethod && !item.archived
    );
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

  const propertyPresence = (key: string): boolean => {
    return seriesItems.some((item) => Boolean((item as any)[key]));
  };

  const singleFormat = seriesItems.every(
    (item) => item.format === seriesItems[0].format
  );

  return (
    <VStack spacing={6} w="100%" alignItems="left">
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
        propertyPresence={propertyPresence}
        singleFormat={singleFormat}
        filterMethod={filterMethod}
        filterBy={filterBy}
        sortMethod={sortMethod}
        sortReverse={sortReverse}
        sortBy={sortBy}
      />
      <VStack spacing={4}>
        {compactView
          ? displayItems().map((item) => (
              <SeriesViewCompact
                key={item.title}
                seriesItem={item}
                restoreSeries={restoreSeries}
                openSeriesForm={openSeriesFormModal}
                openSessionForm={openSessionFormModal}
              />
            ))
          : displayItems().map((item) => (
              <SeriesView
                key={item.title}
                seriesItem={item}
                restoreSeries={restoreSeries}
                openSeriesForm={openSeriesFormModal}
                openSessionForm={openSessionFormModal}
              />
            ))}
      </VStack>
    </VStack>
  );
}

export default SeriesList;
