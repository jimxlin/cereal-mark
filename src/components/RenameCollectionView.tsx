import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useInput } from "../hooks";
import { DEFAULT_ERROR } from "../constants";

type Props = {
  collectionName: string | undefined;
  updateCollectionName: (name: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

function RenameCollectionView({
  isOpen,
  onClose,
  collectionName,
  updateCollectionName,
}: Props) {
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [newName, newNameBind] = useInput(collectionName || "");

  const disallowedName: boolean =
    newName.length === 0 || newName === collectionName;

  const saveName = (): void => {
    if (disallowedName) return;
    try {
      updateCollectionName(newName);
      onClose();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : DEFAULT_ERROR);
    }
  };

  const Form = () => (
    <FormControl isInvalid={!!errorMsg}>
      <Input autoFocus type="text" {...newNameBind} />
      {errorMsg && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
    </FormControl>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rename Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form />
        </ModalBody>
        <ModalFooter>
          <Button mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={disallowedName} onClick={saveName}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RenameCollectionView;
