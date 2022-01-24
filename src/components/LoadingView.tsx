import { Center, Image } from "@chakra-ui/react";

function LoadingView() {
  return (
    <Center mt={20} w="100vw">
      <Image src="/spinner.gif" alt="Loading spinner" />
    </Center>
  );
}

export default LoadingView;
