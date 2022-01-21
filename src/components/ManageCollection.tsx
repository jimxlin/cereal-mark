import {
  HStack,
  Heading,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Format } from "../types";
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
  seriesExists: (title: string | undefined) => boolean;
};

function ManageCollection({
  addSeries,
  collectionName,
  updateCollectionName,
  seriesExists,
}: Props) {
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
          aria-label="Rename collection"
          icon={<EditIcon />}
          onClick={onOpenCollectionNameForm}
        />
        <Button style={{ cursor: "pointer" }} onClick={onOpenCreateSeriesForm}>
          Add Series
        </Button>
      </HStack>
    </div>
  );
}

export default ManageCollection;
