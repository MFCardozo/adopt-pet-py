import { Flex, Button, Box, Link as StyleLink, Text } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import {
  CurrentUserLoginDocument,
  CurrentUserLoginQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { checkPasswordFields } from "../../utils/checkPasswordFields";
import { toErrorObj } from "../../utils/toErrorObj";

interface changePasswordProps {}

const ChangePassword: React.FC<changePasswordProps> = ({}) => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const routeQuery =
    typeof router.query.token === "string" ? router.query.token : "";

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ password: "", passwordCopy: "" }}
        onSubmit={async (values, { setErrors }) => {
          //check if it equal the two password field
          if (values.password !== values.passwordCopy) {
            setErrors(
              checkPasswordFields(values.password, values.passwordCopy)
            );
            return;
          }
          const response = await changePassword({
            variables: {
              newPassword: values.password,
              token: routeQuery,
            },
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserLoginQuery>({
                query: CurrentUserLoginDocument,
                data: {
                  __typename: "Query",
                  currentUserLogin: data?.changePassword.user,
                },
              });
            },
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorObj(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <InputField
              name="passwordCopy"
              label="Rewrite Password"
              placeholder="password"
              type="password"
              helperText="password require at least 6 letters."
            />
            {tokenError ? (
              <Flex justify="space-between">
                <Text mr={2} color="tomato">
                  {tokenError}
                </Text>
                <Link href="/forgot-password">
                  <StyleLink color="grayText">get a new one</StyleLink>
                </Link>
              </Flex>
            ) : null}
            <Flex alignItems="center">
              <Button
                mt={3}
                mx="auto"
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
                size="sm"
              >
                Change Password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;
