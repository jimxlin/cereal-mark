import { useState } from "react";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import ModalForm from "./ModalForm";
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
  const [newName, resetNewName, newNameBind] = useInput(collectionName || "");

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

  const cancelSaveName = (): void => {
    resetNewName();
    onClose();
  };

  return (
    <ModalForm
      header="Rename Collection"
      isOpen={isOpen}
      onClose={cancelSaveName}
      onSave={saveName}
      saveDisabled={disallowedName}
    >
      <FormControl isInvalid={!!errorMsg}>
        <Input autoFocus type="text" {...newNameBind} />
        {errorMsg && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
      </FormControl>
    </ModalForm>
  );
}

export default RenameCollectionView;
