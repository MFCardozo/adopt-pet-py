import { InputGroup, InputLeftAddon } from "@chakra-ui/core";
import React from "react";
import { InputField } from "./InputField";

interface PhoneFieldProps {}

export const PhoneField: React.FC<PhoneFieldProps> = ({}) => {
  return (
    <>
      <InputGroup mt={2}>
        <InputLeftAddon children="+595" mt="29px" />
        <InputField
          label="Phone Contact"
          name="phone"
          placeholder="981000000"
          isRequired
          type="tel"
        />
      </InputGroup>
    </>
  );
};
