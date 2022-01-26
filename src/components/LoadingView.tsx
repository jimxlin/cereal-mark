import { Center, Spinner, Portal } from "@chakra-ui/react";

function LoadingView() {
  return (
    <Portal>
      <Center w="100%" h={["60vh", "60vh", "30vh"]} position="fixed" top={0}>
        <Spinner size="xl" />
      </Center>
    </Portal>
  );
}

export default LoadingView;
