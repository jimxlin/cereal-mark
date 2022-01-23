import { Formik, Form, useField, FormikValues } from "formik";
import * as Yup from "yup";
import {
  HStack,
  VStack,
  Button,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FORMAT } from "./constants";
import { Format } from "./types";

// https://formik.org/docs/tutorial

const MyTextInput = (props: any): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
      <FormLabel>
        {props.label}
        <Input {...field} {...props} />
      </FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const MyNumberInput = (props: any): JSX.Element => {
  const [field, meta, helpers] = useField(props);
  return (
    <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
      <FormLabel>
        {props.label}
        <NumberInput
          {...field}
          {...props}
          // workaround for Formik and NumberInput integration
          // https://github.com/chakra-ui/chakra-ui/issues/617
          // https://stackoverflow.com/a/68085645
          /* eslint-disable no-unused-vars */
          onChange={(valueAsString, valueAsNumber) =>
            helpers.setValue(valueAsString)
          }
          /* eslint-enable no-unused-vars */
        >
          <NumberInputField />
          <NumberInputStepper w="50%" flexDirection="row">
            <NumberDecrementStepper>
              <MinusIcon />
            </NumberDecrementStepper>
            <NumberIncrementStepper>
              <AddIcon />
            </NumberIncrementStepper>
          </NumberInputStepper>
        </NumberInput>
      </FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const MySelectInput = (props: any): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
      <FormLabel>
        {props.label}
        <Select {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormLabel>
    </FormControl>
  );
};

type SubmitButtonsProps = {
  modalFooter: boolean;
  disableSave: boolean;
  handleCancel: () => void;
};
const SubmitButtons = ({
  modalFooter,
  disableSave,
  handleCancel,
}: SubmitButtonsProps) => {
  return modalFooter ? (
    <ModalFooter>
      <Button mr={2} onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={disableSave}>
        Save
      </Button>
    </ModalFooter>
  ) : (
    <HStack>
      <Button mr={2} onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={disableSave}>
        Save
      </Button>
    </HStack>
  );
};

type CollectionNameFormProps = {
  initialName: string | undefined;
  handleSubmit: (values: FormikValues) => void;
  modalFooter: boolean;
  handleCancel: () => void;
};
export function CollectionNameForm({
  initialName,
  handleSubmit,
  modalFooter,
  handleCancel,
}: CollectionNameFormProps) {
  return (
    <Formik
      initialValues={{
        collectionName: initialName,
      }}
      validationSchema={Yup.object({
        collectionName: Yup.string().required("Required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ dirty }: { dirty: boolean }) => (
        <Form>
          <MyTextInput
            name="collectionName"
            type="text"
            placeholder="Unnamed Collection"
            autoComplete="off"
          />
          <SubmitButtons
            modalFooter={modalFooter}
            disableSave={!dirty}
            handleCancel={handleCancel}
          />
        </Form>
      )}
    </Formik>
  );
}

type CreateSeriesFormProps = {
  handleSubmit: (values: FormikValues) => void;
  seriesExists: (title: string | undefined) => boolean;
  modalFooter: boolean;
  handleCancel: () => void;
};
export function CreateSeriesForm({
  handleSubmit,
  seriesExists,
  modalFooter,
  handleCancel,
}: CreateSeriesFormProps) {
  return (
    <Formik
      initialValues={{
        title: "",
        format: "SHOW",
        saga: "",
        act: 1,
        viewUrl: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("Required")
          .test(
            "title-exists",
            "Title already exists",
            (value) => !seriesExists(value)
          ),
        format: Yup.string()
          .required("Required")
          .matches(/^SHOW|COMIC|BOOK$/, "Not a valid format"),
        saga: Yup.number().min(1).integer("Must be an integer"),
        act: Yup.number()
          .required("Required")
          .min(1)
          .integer("Must be an integer"),
        viewUrl: Yup.string().url("Not a valid URL"),
      })}
      onSubmit={handleSubmit}
    >
      {({
        values: { format },
        dirty,
      }: {
        values: { format: Format };
        dirty: boolean;
      }) => (
        <Form>
          <VStack space={4}>
            <MyTextInput
              label="Title"
              name="title"
              type="text"
              autoComplete="off"
            />
            <MySelectInput label="Format" name="format">
              <option value="SHOW">{FORMAT.SHOW.NAME}</option>
              <option value="COMIC">{FORMAT.COMIC.NAME}</option>
              <option value="BOOK">{FORMAT.BOOK.NAME}</option>
            </MySelectInput>
            <MyNumberInput label={FORMAT[format].SAGA} name="saga" min="1" />
            <MyNumberInput label={FORMAT[format].ACT} name="act" min="1" />
            <MyTextInput
              label="Link"
              name="viewUrl"
              type="url"
              placeholder="https://example.com"
              autoComplete="off"
            />
          </VStack>
          <SubmitButtons
            modalFooter={modalFooter}
            disableSave={!dirty}
            handleCancel={handleCancel}
          />
        </Form>
      )}
    </Formik>
  );
}

type CreateSessionFormProps = {
  handleSubmit: (values: FormikValues) => void;
  saga: number | undefined;
  act: number;
  viewUrl: string | undefined;
  format: Format;
  modalFooter: boolean;
  handleCancel: () => void;
};
export function CreateSessionForm({
  handleSubmit,
  saga,
  act,
  viewUrl,
  format,
  modalFooter,
  handleCancel,
}: CreateSessionFormProps) {
  return (
    <Formik
      initialValues={{
        saga: saga,
        act: act,
        viewUrl: viewUrl,
      }}
      validationSchema={Yup.object({
        saga: Yup.number().min(1).integer("Must be an integer"),
        act: Yup.number()
          .required("Required")
          .min(1)
          .integer("Must be an integer"),
        viewUrl: Yup.string().url("Not a valid URL"),
      })}
      onSubmit={handleSubmit}
    >
      {({ dirty }: { dirty: boolean }) => (
        <Form>
          <VStack space={4}>
            <MyNumberInput label={FORMAT[format].SAGA} name="saga" min="1" />
            <MyNumberInput label={FORMAT[format].ACT} name="act" min="1" />
            <MyTextInput
              // TODO: move this input to a new EditSeries form
              label="Link"
              name="viewUrl"
              type="url"
              placeholder="https://example.com"
            />
          </VStack>
          <SubmitButtons
            modalFooter={modalFooter}
            disableSave={!dirty}
            handleCancel={handleCancel}
          />
        </Form>
      )}
    </Formik>
  );
}
