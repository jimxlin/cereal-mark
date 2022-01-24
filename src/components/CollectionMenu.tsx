import {
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleOpenCollectionNameForm: () => void;
  handleOpenCreateSeriesForm: () => void;
};

function CollectionMenu({
  isOpen,
  onClose,
  handleOpenCollectionNameForm,
  handleOpenCreateSeriesForm,
}: Props) {
  const handleClickRenameCollection = () => {
    onClose();
    handleOpenCollectionNameForm();
  };

  const handleClickAddSeries = () => {
    onClose();
    handleOpenCreateSeriesForm();
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          <VStack>
            <Button
              aria-label="Rename collection"
              onClick={handleClickRenameCollection}
            >
              Rename Collection
            </Button>
            <Button onClick={handleClickAddSeries}>Add Series</Button>
            {/* TODO WIP: number of series, last updated, etc. */}
          </VStack>
        </DrawerBody>
        <DrawerFooter>Copyright Etc.</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CollectionMenu;
