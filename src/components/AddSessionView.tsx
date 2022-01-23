import { useContext } from "react";
import { FormikValues } from "formik";
import { Session, SeriesItem } from "../types";
import { DEFAULT_ERROR } from "../constants";
import { toUndefined } from "../helpers";
import { SetErrorContext } from "../App";
import ModalForm from "./ModalForm";
import { CreateSessionForm } from "../forms";

type Props = {
  seriesItem: SeriesItem;
  isOpen: boolean;
  onClose: () => void;
  addSession: (
    seriesTitle: string,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ) => void;
};

function AddSessionView({ seriesItem, isOpen, onClose, addSession }: Props) {
  const setError = useContext(SetErrorContext);
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act, viewUrl } = lastSession;

  const onSubmit = (values: FormikValues): void => {
    try {
      addSession(
        title,
        values.act,
        toUndefined(values.saga),
        toUndefined(values.viewUrl)
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : DEFAULT_ERROR);
    }
  };

  return (
    <ModalForm
      header="Update Series Progress"
      isOpen={isOpen}
      handleClose={onClose}
    >
      <CreateSessionForm
        handleSubmit={onSubmit}
        saga={saga}
        act={act}
        viewUrl={viewUrl}
        format={format}
        handleCancel={onClose}
        modalFooter={true}
      />
    </ModalForm>
  );
}

export default AddSessionView;
