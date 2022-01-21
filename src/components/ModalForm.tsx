import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

type Props = {
  header: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  saveDisabled: boolean;
  children: JSX.Element;
};

function ModalForm({
  header,
  isOpen,
  onClose,
  onSave,
  saveDisabled,
  children,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={saveDisabled} onClick={onSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;
