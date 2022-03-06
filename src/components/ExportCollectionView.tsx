import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { exportCollection } from "../api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string | undefined;
};

function ModalForm({ isOpen, onClose, collectionId }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {collectionId ? (
            <Button
              colorScheme="blue"
              onClick={() => exportCollection(collectionId)}
            >
              Download JSON
            </Button>
          ) : (
            <Button colorScheme="blue" disabled>
              Download JSON
            </Button>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;
