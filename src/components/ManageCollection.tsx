import {
  Flex,
  HStack,
  Spacer,
  IconButton,
  useDisclosure,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, LinkIcon } from "@chakra-ui/icons";
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
    isOpen: isOpenCollectionNameForm,
    onOpen: onOpenCollectionNameForm,
    onClose: onCloseCollectionNameForm,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateSeriesForm,
    onOpen: onOpenCreateSeriesForm,
    onClose: onCloseCreateSeriesForm,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const copiedToast = useToast();

  const copyUrl = (): void => {
    navigator.clipboard.writeText(window.location.href);
    copiedToast({
      position: "top",
      description: "Copied URL to Clipboard",
      status: "success",
      duration: 2000,
    });
  };

  return (
    <Flex w="lg" mt={4}>
      <CollectionMenu
        menuName={collectionName || "Unnamed Collection"}
        handleOpenCollectionNameForm={onOpenCollectionNameForm}
        handleOpenCreateSeriesForm={onOpenCreateSeriesForm}
      />
      <Spacer />
      <HStack>
        <IconButton
          onClick={copyUrl}
          aria-label="Copy URL"
          colorScheme="blue"
          icon={<LinkIcon />}
        />
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          colorScheme="blue"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </HStack>
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
    </Flex>
  );
}

export default ManageCollection;
