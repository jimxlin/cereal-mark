import {
  Center,
  HStack,
  Text,
  IconButton,
  LightMode,
  Link,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function DemoStatus() {
  return (
    <LightMode>
      <Center w="100%" bg="orange.300" p={2}>
        <HStack>
          <Text as="b" fontSize="2xl">
            Demo Mode
          </Text>
          <IconButton
            size="sm"
            aria-label="Exit demo mode"
            icon={<CloseIcon />}
            as={Link}
            href="/"
            colorScheme="orange"
          />
        </HStack>
      </Center>
    </LightMode>
  );
}

export default DemoStatus;
