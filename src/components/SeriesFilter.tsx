import { VStack, Button, ButtonGroup, Wrap, WrapItem } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { SORT } from "../constants";

type Props = {
  filterMethod: string;
  singleFormat: boolean;
  filterBy: (method: string) => void;
  sortMethod: string;
  sortReverse: boolean;
  sortBy: (method: string) => void;
  formatPresence: (format: string) => boolean;
  propertyPresence: (key: string) => boolean;
};

function SeriesFilter({
  formatPresence,
  propertyPresence,
  singleFormat,
  filterMethod,
  filterBy,
  sortMethod,
  sortReverse,
  sortBy,
}: Props) {
  const sortButtons = [
    { name: "Recency", value: SORT.RECENCY },
    { name: "Title", value: SORT.TITLE },
  ].map((method) => {
    const selected = sortMethod === method.value;
    return (
      <Button
        key={method.value}
        onClick={() => sortBy(method.value)}
        variant={selected ? "solid" : "outline"}
        rightIcon={sortReverse ? <TriangleUpIcon /> : <TriangleDownIcon />}
      >
        {method.name}
      </Button>
    );
  });

  const formatFilterButtons = [
    { name: "Any", value: "ANY" },
    { name: "Shows", value: "SHOW" },
    { name: "Comics", value: "COMIC" },
    { name: "Books", value: "BOOK" },
  ].map((format) => {
    if (format.value !== "ANY" && !formatPresence(format.value)) return null;
    const selected = filterMethod === format.value;
    return (
      <WrapItem key={format.value}>
        <Button
          onClick={() => filterBy(format.value)}
          variant={selected ? "solid" : "outline"}
        >
          {format.name}
        </Button>
      </WrapItem>
    );
  });

  const propertyFilterButtons = [
    { name: "Favorites", value: "favorite" },
    { name: "Archived", value: "archived" },
  ].map((property) => {
    if (!propertyPresence(property.value)) return null;
    const selected = filterMethod === property.value;
    return (
      <WrapItem key={property.value}>
        <Button
          onClick={() => filterBy(property.value)}
          variant={selected ? "solid" : "outline"}
        >
          {property.name}
        </Button>
      </WrapItem>
    );
  });

  return (
    <VStack alignItems="left">
      <ButtonGroup colorScheme="orange">{sortButtons}</ButtonGroup>
      {!singleFormat && (
        <ButtonGroup colorScheme="orange">
          <Wrap>
            {formatFilterButtons}
            {propertyFilterButtons}
          </Wrap>
        </ButtonGroup>
      )}
    </VStack>
  );
}

export default SeriesFilter;
