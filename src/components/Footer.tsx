import {
  VStack,
  HStack,
  Link,
  Text,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  const { colorMode } = useColorMode();

  return (
    <VStack
      w="100%"
      h="20vh"
      py={12}
      px={4}
      bg={colorMode === "light" ? "yellow.200" : "purple.900"}
    >
      <VStack
        w={["100%", "100%", "lg", "xl", "6xl"]}
        alignItems="start"
        spacing={6}
      >
        <Link isExternal href="https://github.com/miljinx/cereal-mark">
          <HStack>
            <Icon as={FaGithub} />
            <Text>Source</Text>
          </HStack>
        </Link>
        <Text fontSize="sm">&copy; 2022 Jim Lin</Text>
      </VStack>
    </VStack>
  );
}

export default Footer;
