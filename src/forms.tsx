import { Formik, Form, useField, FormikValues } from "formik";
import * as Yup from "yup";
import {
  VStack,
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

type CollectionNameFormProps = {
  formId: string;
  initialName: string | undefined;
  onSubmit: (values: FormikValues) => void;
};
export function CollectionNameForm({
  formId,
  initialName,
  onSubmit,
}: CollectionNameFormProps) {
  return (
    <Formik
      initialValues={{
        collectionName: initialName,
      }}
      validationSchema={Yup.object({
        collectionName: Yup.string().required("Required"),
      })}
      onSubmit={onSubmit}
    >
      <Form id={formId}>
        <MyTextInput
          name="collectionName"
          type="text"
          placeholder="Unnamed Collection"
        />
      </Form>
    </Formik>
  );
}

type CreateSeriesFormProps = {
  formId: string;
  onSubmit: (values: FormikValues) => void;
  seriesExists: (title: string | undefined) => boolean;
};
export function CreateSeriesForm({
  formId,
  onSubmit,
  seriesExists,
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
      onSubmit={onSubmit}
    >
      {({ values: { format } }: { values: { format: Format } }) => (
        // provide `format` value so saga and act labels are dynamically rendered
        <Form id={formId}>
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
        </Form>
      )}
    </Formik>
  );
}

type CreateSessionFormProps = {
  formId: string;
  onSubmit: (values: FormikValues) => void;
  saga: number | undefined;
  act: number;
  viewUrl: string | undefined;
  format: Format;
};
export function CreateSessionForm({
  formId,
  onSubmit,
  saga,
  act,
  viewUrl,
  format,
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
      onSubmit={onSubmit}
    >
      <Form id={formId}>
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
      </Form>
    </Formik>
  );
}
