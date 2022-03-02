import { useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { SeriesItem } from "../types";

type Props = {
  series: SeriesItem | undefined;
  deleteSeries: (seriesTitle: string) => void;
  isOpen: boolean;
  onClose: () => void;
};
function ConfirmDeleteSeries({ series, deleteSeries, isOpen, onClose }: Props) {
  const cancelRef = useRef(null);
  const handleDelete = () => {
    if (series) deleteSeries(series.title);
    onClose();
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Series
          </AlertDialogHeader>
          <AlertDialogBody>
            {series
              ? `Are you sure you want to delete '${series.title}'? `
              : "Are you sure? "}
            You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmDeleteSeries;
