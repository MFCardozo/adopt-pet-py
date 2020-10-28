import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/core";
import { Field, useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  textarea?: boolean;
  helperText?: string;
  isRequired?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  helperText,
  isRequired,

  ...props
}) => {
  let InputTypes = Input;
  if (textarea) {
    InputTypes = Textarea as any;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label ? <FormLabel htmlFor={field.name}>{label}</FormLabel> : null}
      <InputTypes {...field} {...props} id={field.name} />
      <FormHelperText {...props}>{helperText}</FormHelperText>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
