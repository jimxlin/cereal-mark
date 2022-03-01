import { IconButton, Portal } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

type Props = {
  scrolltoTop: () => void;
};
function ScrollToTopView({ scrolltoTop }: Props) {
  return (
    <Portal>
      <IconButton
        position="fixed"
        bottom={8}
        right={8}
        colorScheme="green"
        isRound
        aria-label="Scroll to top"
        icon={<ArrowUpIcon />}
        onClick={scrolltoTop}
      />
    </Portal>
  );
}

export default ScrollToTopView;
