import {
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
  menuName: string;
  handleOpenCollectionNameForm: () => void;
  handleOpenCreateSeriesForm: () => void;
  handleOpenExportCollection: () => void;
  handleOpenImportCollection: () => void;
};

function CollectionMenu({
  menuName,
  handleOpenCollectionNameForm,
  handleOpenCreateSeriesForm,
  handleOpenExportCollection,
  handleOpenImportCollection,
}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="blue"
        rightIcon={<ChevronDownIcon />}
        mr={2}
      >
        <Text
          isTruncated
          color={colorMode === "light" ? "whiteAlpha.900" : "purple.900"}
        >
          {menuName}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleOpenCreateSeriesForm}>Add Series</MenuItem>
        <MenuItem onClick={handleOpenCollectionNameForm}>
          Rename Collection
        </MenuItem>
        <MenuItem onClick={handleOpenExportCollection}>
          Export Collection
        </MenuItem>
        <MenuItem onClick={handleOpenImportCollection}>
          Import Collection
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default CollectionMenu;
