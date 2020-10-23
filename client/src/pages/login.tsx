import { Box, Flex, Button, Image } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  CurrentUserLoginDocument,
  CurrentUserLoginQuery,
  useLoginMutation,
} from "../generated/graphql";
import { toErrorObj } from "../utils/toErrorObj";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();

  const [login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Box w="50%" mx="auto">
        <Image src="\logo.png" alt="ayudamepy logo" />
      </Box>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserLoginQuery>({
                query: CurrentUserLoginDocument,
                data: {
                  __typename: "Query",
                  currentUserLogin: data?.login.user,
                },
              });
            },
          });

          if (response.data?.login.errors) {
            setErrors(toErrorObj(response.data?.login.errors));
          } else if (response.data?.login.user) {
            //successfully login
            router.push("/");
          }
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

            <InputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <Flex alignItems="center">
              <Button
                mt={2}
                mx="auto"
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
