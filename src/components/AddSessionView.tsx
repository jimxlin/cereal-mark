import { useContext } from "react";
import { FormikValues } from "formik";
import { VStack, Text } from "@chakra-ui/react";
import { Session, SeriesItem } from "../types";
import { DEFAULT_ERROR } from "../constants";
import { toUndefined, humanDate } from "../helpers";
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
    saga: number | undefined
  ) => void;
};

function AddSessionView({ seriesItem, isOpen, onClose, addSession }: Props) {
  const setError = useContext(SetErrorContext);
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act, createdAtMs } = lastSession;

  const onSubmit = (values: FormikValues): void => {
    try {
      addSession(title, values.act, toUndefined(values.saga));
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
      <VStack alignItems="left">
        <Text fontSize="lg">{title}</Text>
        <Text as="i" fontSize="xs" mb={4}>
          Last viewed on {humanDate(createdAtMs)}
        </Text>
        <CreateSessionForm
          handleSubmit={onSubmit}
          saga={saga}
          act={act}
          format={format}
          handleCancel={onClose}
          modalFooter={true}
        />
      </VStack>
    </ModalForm>
  );
}

export default AddSessionView;
