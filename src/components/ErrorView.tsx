import {
  Portal,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

type Props = {
  error: string;
  setError: (error: string | undefined) => void;
};

function ErrorView({ error, setError }: Props) {
  return (
    <Portal>
      <Center
        top="5vh"
        left="50vw"
        position="fixed"
        transform="translateX(-50%)"
      >
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
          <CloseButton onClick={() => setError(undefined)} />
        </Alert>
      </Center>
    </Portal>
  );
}

export default ErrorView;
