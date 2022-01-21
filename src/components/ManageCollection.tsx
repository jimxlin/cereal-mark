import { useState } from "react";
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
};

function ManageCollection({
  addSeries,
  collectionName,
  updateCollectionName,
}: Props) {
  const [showAddSeries, setShowAddSeries] = useState(false);
  const {
    isOpen: isOpenNameForm,
    onOpen: onOpenNameForm,
    onClose: onCloseNameForm,
  } = useDisclosure();
  const {
    isOpen: isOpenSeriesForm,
    onOpen: onOpenSeriesForm,
    onClose: onCloseSeriesForm,
  } = useDisclosure();

  const clearAddSeriesForm = (): void => {
    setShowAddSeries(false);
  };

  return (
    <div>
      <RenameCollectionView
        isOpen={isOpenNameForm}
        onClose={onCloseNameForm}
        collectionName={collectionName}
        updateCollectionName={updateCollectionName}
      />
      {showAddSeries && (
        <AddSeriesView
          clearAddSeriesForm={clearAddSeriesForm}
          addSeries={addSeries}
        />
      )}
      <HStack>
        <Heading>{collectionName || "Unnamed Collection"}</Heading>
        <IconButton
          aria-label="Rename collection"
          icon={<EditIcon />}
          onClick={onOpenNameForm}
        />
        <Button
          style={{ cursor: "pointer" }}
          onClick={() => setShowAddSeries(true)}
        >
          Add Series
        </Button>
      </HStack>
    </div>
  );
}

export default ManageCollection;
