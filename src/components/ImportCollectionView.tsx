import { useCallback, useState, CSSProperties } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { readTextFileAsync, validateCollection, toUndefined } from "../helpers";
import { Collection } from "../types";
import { importCollection } from "../api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string | undefined;
};

const style: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

function ModalForm({ isOpen, onClose, collectionId }: Props) {
  const [importError, setImportError] = useState<string | undefined>(undefined);
  const [uploadedCollection, setUploadedCollection] = useState<
    Collection | undefined
  >(undefined);

  const onDrop = useCallback(async (acceptedFiles) => {
    setImportError(undefined);
    const jsonString = await readTextFileAsync(acceptedFiles[0]);
    try {
      const collection = JSON.parse(jsonString as string, (key, value) =>
        toUndefined(value)
      );
      validateCollection(collection);
      setUploadedCollection(collection);
    } catch (err) {
      setUploadedCollection(undefined);
      setImportError("Invalid file.");
    }
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/json",
    maxFiles: 1,
  });
  const uploadedFile: FileWithPath = acceptedFiles[0];

  const importFile = () => {
    if (!collectionId && !uploadedCollection) return;
    setUploadedCollection(undefined);
    importCollection(collectionId, uploadedCollection);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop the JSON file here, or click to select file</p>
          </div>
          {uploadedFile && (
            <Text>
              {uploadedFile.path} - {uploadedFile.size} bytes
            </Text>
          )}
          {importError && <Text>{importError}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={2}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={importFile}
            disabled={!uploadedCollection}
          >
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;
