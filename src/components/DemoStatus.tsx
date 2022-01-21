import { Center, HStack, Text, Button } from "@chakra-ui/react";

function DemoStatus() {
  return (
    <Center w="100vw" bg="orange.300" p={2}>
      <HStack>
        <Text fontSize="2rem">Demo Mode</Text>
        <Button as="a" href="/">
          Exit
        </Button>
      </HStack>
    </Center>
  );
}

export default DemoStatus;
