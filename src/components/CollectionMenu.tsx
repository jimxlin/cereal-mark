import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
  menuName: string;
  handleOpenCollectionNameForm: () => void;
  handleOpenCreateSeriesForm: () => void;
};

function CollectionMenu({
  menuName,
  handleOpenCollectionNameForm,
  handleOpenCreateSeriesForm,
}: Props) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="blue"
        rightIcon={<ChevronDownIcon />}
      >
        {menuName}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleOpenCollectionNameForm}>
          Rename Collection
        </MenuItem>
        <MenuItem onClick={handleOpenCreateSeriesForm}>Add Series</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default CollectionMenu;
