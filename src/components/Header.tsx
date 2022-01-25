import {
  Center,
  Flex,
  VStack,
  HStack,
  Text,
  Spacer,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsBookmarksFill } from "react-icons/bs";
import DemoStatus from "./DemoStatus";

type Props = {
  demoMode: boolean;
};
function Header({ demoMode }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack spacing={0}>
      <Center
        w="100vw"
        p={2}
        bg={colorMode === "light" ? "yellow.200" : "purple.900"}
      >
        <Flex w="6xl">
          <HStack as="a" href="/" spacing={1}>
            <Icon as={BsBookmarksFill} w={5} h={5} />
            <Text as="b" fontSize="2xl">
              CerealMark
            </Text>
          </HStack>
          <Spacer />
          <IconButton
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
            colorScheme="yellow"
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          />
        </Flex>
      </Center>
      {demoMode && <DemoStatus />}
    </VStack>
  );
}

export default Header;
