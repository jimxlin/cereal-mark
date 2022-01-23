import { VStack, HStack, Button, ButtonGroup } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { SORT } from "../constants";

type Props = {
  filterMethod: string;
  singleFormat: boolean;
  filterBy: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sortMethod: string;
  sortReverse: boolean;
  sortBy: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formatPresence: (format: string) => boolean;
};

function SeriesFilter({
  formatPresence,
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
        name={method.value}
        onClick={sortBy}
        variant={selected ? "solid" : "outline"}
        rightIcon={sortReverse ? <TriangleUpIcon /> : <TriangleDownIcon />}
      >
        {method.name}
      </Button>
    );
  });

  const filterButtons = [
    { name: "Any", value: "ANY" },
    { name: "Shows", value: "SHOW" },
    { name: "Comics", value: "COMIC" },
    { name: "Books", value: "BOOK" },
  ].map((format) => {
    if (format.value !== "ANY" && !formatPresence(format.value)) return null;
    const selected = filterMethod === format.value;
    return (
      <Button
        key={format.value}
        name={format.value}
        onClick={filterBy}
        variant={selected ? "solid" : "outline"}
      >
        {format.name}
      </Button>
    );
  });

  return (
    <VStack>
      <ButtonGroup colorScheme="orange">{sortButtons}</ButtonGroup>
      {!singleFormat && (
        <ButtonGroup colorScheme="orange">{filterButtons}</ButtonGroup>
      )}
    </VStack>
  );
}

export default SeriesFilter;
