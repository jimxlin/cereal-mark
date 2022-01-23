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
  openSessionForm: (seriesItem: SeriesItem) => void;
};

function SeriesView({ seriesItem, openSessionForm }: Props) {
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act, viewUrl } = lastSession;

  return (
    <Box
      w="512px"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.500"
      boxShadow="md"
    >
      <VStack>
        <Box pt={4} pb={2} px={6} w="100%">
          <Flex>
            <Text fontSize="xl" isTruncated>
              {title}
            </Text>
            <Spacer />
            {viewUrl && (
              <Link
                pl={2}
                href={viewUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
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
            borderColor="gray.500"
            borderTopWidth="1px"
            borderRightWidth="1px"
          >
            <EditIcon />
          </Button>
          <Button
            flex="1"
            p={2}
            variant="ghost"
            borderRadius="0"
            borderBottomRightRadius="lg"
            borderColor="gray.500"
            borderTopWidth="1px"
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
