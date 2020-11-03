import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { InputField } from "../components/formComponents/InputField";
import { Box, Button, Image, Flex } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";

import {
  CurrentUserLoginDocument,
  CurrentUserLoginQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorObj } from "../utils/toErrorObj";
import { checkPasswordFields } from "../utils/checkPasswordFields";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Box w="50%" mx="auto">
        <Image src="\logo.png" alt="ayudamepy logo" />
      </Box>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordCopy: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          //check if it equal the two password field
          if (values.password !== values.passwordCopy) {
            setErrors(
              checkPasswordFields(values.password, values.passwordCopy)
            );

            return;
          }

          const response = await register({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserLoginQuery>({
                query: CurrentUserLoginDocument,
                data: {
                  __typename: "Query",
                  currentUserLogin: data?.register.user,
                },
              });
            },
          });

          if (response.data?.register.errors) {
            setErrors(toErrorObj(response.data.register.errors));
          } else if (response.data?.register.user) {
            //successfully register
            router.push("/");
          }
          return response;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              label="Email"
              placeholder="email"
              type="email"
            />

            <InputField name="username" label="Name" placeholder="name" />

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
            <Flex alignItems="center">
              <Button
                mt={2}
                mx="auto"
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(Register);
