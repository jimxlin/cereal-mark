import { useContext } from "react";
import { FormikValues } from "formik";
import { Format } from "../types";
import { DEFAULT_ERROR } from "../constants";
import { toUndefined } from "../helpers";
import { SetErrorContext } from "../App";
import ModalForm from "./ModalForm";
import { CreateSeriesForm } from "../forms";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addSeries: (
    title: string,
    format: Format,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ) => void;
  seriesExists: (title: string | undefined) => boolean;
};

function AddSeriesView({ isOpen, onClose, addSeries, seriesExists }: Props) {
  const setError = useContext(SetErrorContext);

  const onSubmit = (values: FormikValues): void => {
    setError(undefined);
    try {
      addSeries(
        values.title,
        values.format,
        toUndefined(values.act),
        values.saga,
        toUndefined(values.viewUrl)
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : DEFAULT_ERROR);
    }
  };

  return (
    <ModalForm header="Add a Series" isOpen={isOpen} handleClose={onClose}>
      <CreateSeriesForm
        handleSubmit={onSubmit}
        seriesExists={seriesExists}
        handleCancel={onClose}
        modalFooter={true}
      />
    </ModalForm>
  );
}

export default AddSeriesView;
