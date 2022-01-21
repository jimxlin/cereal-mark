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
  const FORM_ID = "collection-name-form";

  const onSubmit = (values: FormikValues): void => {
    if (values.collectionName === collectionName) return;
    try {
      updateCollectionName(values.collectionName);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : DEFAULT_ERROR);
    }
  };

  return (
    <ModalForm
      header="Rename Collection"
      isOpen={isOpen}
      onClose={onClose}
      formId={FORM_ID}
    >
      <CollectionNameForm
        formId={FORM_ID}
        initialName={collectionName}
        onSubmit={onSubmit}
      />
    </ModalForm>
  );
}

export default RenameCollectionView;
