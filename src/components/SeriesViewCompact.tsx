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
  restoreSeries: (title: string) => void;
  openSeriesForm: (seriesItem: SeriesItem) => void;
  openSessionForm: (seriesItem: SeriesItem) => void;
};

function SeriesView({
  seriesItem,
  restoreSeries,
  openSeriesForm,
  openSessionForm,
}: Props) {
  const { title, format, viewUrl } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act } = lastSession;

  const progress = seriesItem.complete ? (
    <Text>Complete</Text>
  ) : (
    <Text fontSize="sm" px={1}>
      {saga && `${FORMAT[format].SAGA[0].toLowerCase()}${saga}`}
      {FORMAT[format].ACT[0].toLowerCase()}
      {act}
    </Text>
  );

  return (
    <Flex w="100%" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Center minW="0">
        <Text fontSize="sm" pl={3} isTruncated>
          {title}
        </Text>
      </Center>
      <Spacer />
      <Center>{progress}</Center>
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
      {seriesItem.archived ? (
        <Button
          p={2}
          fontSize="sm"
          variant="ghost"
          borderRadius="lg"
          onClick={() => restoreSeries(seriesItem.title)}
        >
          Restore
        </Button>
      ) : (
        <>
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
            disabled={seriesItem.archived || seriesItem.complete}
            onClick={() => openSessionForm(seriesItem)}
          >
            <AddIcon />
          </Button>
        </>
      )}
    </Flex>
  );
}

export default SeriesView;
