import { useContext } from "react";
import { FormikValues } from "formik";
import { DEFAULT_ERROR } from "../constants";
import { SetErrorContext } from "../App";
import ModalForm from "./ModalForm";
import { CollectionNameForm } from "../forms";

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
  const setError = useContext(SetErrorContext);

  const onSubmit = (values: FormikValues): void => {
    try {
      updateCollectionName(values.collectionName.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : DEFAULT_ERROR);
    }
  };

  return (
    <ModalForm header="Rename Collection" isOpen={isOpen} handleClose={onClose}>
      <CollectionNameForm
        initialName={collectionName}
        handleSubmit={onSubmit}
        handleCancel={onClose}
        modalFooter={true}
      />
    </ModalForm>
  );
}

export default RenameCollectionView;
