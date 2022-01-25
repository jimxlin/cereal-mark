import {
  Box,
  HStack,
  VStack,
  Flex,
  Spacer,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { EditIcon, AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Session, SeriesItem } from "../types";
import { FORMAT } from "../constants";
import { humanDate } from "../helpers";

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
    <Box w="100%" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <VStack>
        <Box pt={4} pb={2} px={6} w="100%">
          <Flex>
            <Text fontSize="xl" isTruncated>
              {title}
            </Text>
            <Spacer />
            {viewUrl && (
              <Link pl={2} href={viewUrl} isExternal>
                <ExternalLinkIcon />
              </Link>
            )}
          </Flex>
          <HStack>
            {saga && (
              <Text>
                {FORMAT[format].SAGA} {saga}
              </Text>
            )}
            <Text>
              {FORMAT[format].ACT} {act}
            </Text>
          </HStack>
          <Text as="i" fontSize="xs">
            {humanDate(lastSession.createdAtMs)}
          </Text>
        </Box>
        <Flex w="100%">
          <Button
            flex="1"
            p={2}
            variant="ghost"
            borderRadius="0"
            borderBottomLeftRadius="lg"
            borderTopWidth="1px"
            borderRightWidth="1px"
            onClick={() => openSeriesForm(seriesItem)}
          >
            <EditIcon />
          </Button>
          <Button
            flex="1"
            p={2}
            variant="ghost"
            borderRadius="0"
            borderBottomRightRadius="lg"
            borderTopWidth="1px"
            disabled={seriesItem.archived || seriesItem.complete}
            onClick={() => openSessionForm(seriesItem)}
          >
            <AddIcon />
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

export default SeriesView;
