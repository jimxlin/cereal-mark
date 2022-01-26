import { VStack, Text, Kbd, Link } from "@chakra-ui/react";

function EmptySeriesPrompt() {
  return (
    <VStack mt={10}>
      <Text color="gray.500">Looks empty here...</Text>
      <Text color="gray.500">
        Click the <Kbd>Collection</Kbd> button to add a series
      </Text>
      <Text color="gray.500">
        Or try the demo{" "}
        <Link isExternal href="/demo">
          here
        </Link>
      </Text>
    </VStack>
  );
}

export default EmptySeriesPrompt;
