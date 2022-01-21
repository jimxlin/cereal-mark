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
  children: JSX.Element;
  formId: string;
};

function ModalForm({ header, isOpen, onClose, children, formId }: Props) {
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
          <Button type="submit" form={formId}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;
