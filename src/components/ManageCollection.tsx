import { HStack, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { Format } from "../types";
import CollectionMenu from "./CollectionMenu";
import AddSeriesView from "./AddSeriesView";
import RenameCollectionView from "./RenameCollectionView";

type Props = {
  collectionName: string | undefined;
  updateCollectionName: (name: string) => void;
  addSeries: (
    title: string,
    format: Format,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ) => void;
  seriesExists: (title: string | undefined, ownTitle?: string) => boolean;
};

function ManageCollection({
  addSeries,
  collectionName,
  updateCollectionName,
  seriesExists,
}: Props) {
  const {
    isOpen: isOpenCollectionMenu,
    onOpen: onOpenCollectionMenu,
    onClose: onCloseCollectionMenu,
  } = useDisclosure();
  const {
    isOpen: isOpenCollectionNameForm,
    onOpen: onOpenCollectionNameForm,
    onClose: onCloseCollectionNameForm,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateSeriesForm,
    onOpen: onOpenCreateSeriesForm,
    onClose: onCloseCreateSeriesForm,
  } = useDisclosure();

  return (
    <div>
      <CollectionMenu
        isOpen={isOpenCollectionMenu}
        onClose={onCloseCollectionMenu}
        handleOpenCollectionNameForm={onOpenCollectionNameForm}
        handleOpenCreateSeriesForm={onOpenCreateSeriesForm}
      />
      <RenameCollectionView
        isOpen={isOpenCollectionNameForm}
        onClose={onCloseCollectionNameForm}
        collectionName={collectionName}
        updateCollectionName={updateCollectionName}
      />
      <AddSeriesView
        isOpen={isOpenCreateSeriesForm}
        onClose={onCloseCreateSeriesForm}
        addSeries={addSeries}
        seriesExists={seriesExists}
      />
      <HStack>
        <Heading>{collectionName || "Unnamed Collection"}</Heading>
        <IconButton
          aria-label="Collection settings"
          icon={<SettingsIcon />}
          onClick={onOpenCollectionMenu}
        />
      </HStack>
    </div>
  );
}

export default ManageCollection;
