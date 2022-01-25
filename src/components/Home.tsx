import { useContext } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { generateId } from "../helpers";
import { createCollection } from "../api";
import { Collection } from "../types";
import { DEFAULT_ERROR } from "../constants";
import { SetErrorContext } from "../App";

type Props = {
  setIsLoading: (loading: boolean) => void;
};

function Home({ setIsLoading }: Props) {
  const setError = useContext(SetErrorContext);
  const initializeCollection = async (): Promise<void> => {
    setIsLoading(false);
    setError(undefined);
    const collectionId = await generateId();
    const collection: Collection = {
      id: collectionId,
      name: "",
      seriesItems: [],
      compactView: false,
      updatedAtMs: Date.now(),
    };
    try {
      setIsLoading(true);
      await createCollection(collection);
      window.location.pathname = collectionId;
    } catch (err) {
      // very small chance of hash collision
      if (
        err instanceof Error &&
        err.name === "ConditionalCheckFailedException"
      ) {
        setError("Please try again.");
      } else {
        setError(err instanceof Error ? err.message : DEFAULT_ERROR);
      }
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} px={4}>
      <Text fontSize="md">
        CerealMark is a tool to keep track of series that you are following.
        Once you've created your page, bookmark it to access it anytime.
      </Text>
      <Button w="sm" colorScheme="blue" onClick={initializeCollection}>
        Get Started
      </Button>
      <Button w="sm" colorScheme="blue" as="a" href="/demo">
        Try the Demo
      </Button>
    </VStack>
  );
}

export default Home;
