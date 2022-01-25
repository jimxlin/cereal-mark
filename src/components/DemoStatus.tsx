import {
  Center,
  HStack,
  Text,
  Button,
  LightMode,
  Link,
} from "@chakra-ui/react";

function DemoStatus() {
  return (
    <LightMode>
      <Center w="100vw" bg="orange.300" p={2}>
        <HStack>
          <Text as="b" fontSize="2rem">
            Demo Mode
          </Text>
          <Button as={Link} href="/" colorScheme="blue">
            Exit
          </Button>
        </HStack>
      </Center>
    </LightMode>
  );
}

export default DemoStatus;
