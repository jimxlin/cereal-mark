import {
  Box,
  Center,
  Flex,
  Spacer,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { EditIcon, AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Session, SeriesItem } from "../types";
import { FORMAT } from "../constants";

type Props = {
  seriesItem: SeriesItem;
  openSeriesForm: (seriesItem: SeriesItem) => void;
  openSessionForm: (seriesItem: SeriesItem) => void;
};

function SeriesView({ seriesItem, openSeriesForm, openSessionForm }: Props) {
  const { title, format, viewUrl } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act } = lastSession;

  return (
    <Flex w="100%" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Center minW="0">
        <Text fontSize="sm" pl={3} isTruncated>
          {title}
        </Text>
      </Center>
      <Spacer />
      <Center>
        <Text fontSize="sm" px={1}>
          {saga && `${FORMAT[format].SAGA[0].toLowerCase()}${saga}`}
          {FORMAT[format].ACT[0].toLowerCase()}
          {act}
        </Text>
      </Center>
      <Box display={["none", "none", "inline-flex"]}>
        {viewUrl ? (
          <Button
            p={0}
            as={Link}
            variant="ghost"
            borderRadius="0"
            href={viewUrl}
            isExternal
          >
            <ExternalLinkIcon />
          </Button>
        ) : (
          <Box w={10} />
        )}
      </Box>
      <Button
        p={0}
        variant="ghost"
        borderRadius="0"
        onClick={() => openSeriesForm(seriesItem)}
      >
        <EditIcon />
      </Button>
      <Button
        p={0}
        variant="ghost"
        borderRadius="0"
        onClick={() => openSessionForm(seriesItem)}
      >
        <AddIcon />
      </Button>
    </Flex>
  );
}

export default SeriesView;
