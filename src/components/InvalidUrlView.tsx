import { VStack, Text, Button } from "@chakra-ui/react";

function InvalidUrlView() {
  return (
    <VStack spacing={4} px={4}>
      <VStack spacing={1}>
        <Text fontSize="md">Sorry, we couldn't find that page.</Text>
        <Text fontSize="md">
          The URL may be invalid, or we may be having connection issues.
        </Text>
      </VStack>
      <Button w={["100%", "sm"]} as="a" href="/">
        Go Back
      </Button>
    </VStack>
  );
}

export default InvalidUrlView;
