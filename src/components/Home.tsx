import { useContext } from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
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
    <VStack spacing={4} mt={4}>
      <Heading>CerealMark</Heading>
      <Text>
        Keep track of series that you are following. Once you've created your
        page, bookmark it to access it anytime.
      </Text>
      <Button onClick={initializeCollection}>Get Started</Button>
      <Button as="a" href="/demo">
        Try the Demo
      </Button>
    </VStack>
  );
}

export default Home;
