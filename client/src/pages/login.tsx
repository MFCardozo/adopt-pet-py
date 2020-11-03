import { Box, Flex, Button, Image, Link as StyleLink } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { InputField } from "../components/formComponents/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  CurrentUserLoginDocument,
  CurrentUserLoginQuery,
  useLoginMutation,
} from "../generated/graphql";
import { toErrorObj } from "../utils/toErrorObj";
import Link from "next/link";
import { withApollo } from "../utils/withApollo";

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
            //from create post
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              // worked
              router.push("/");
            }
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
            <Flex justify="space-between">
              <Link href="/forgot-password">
                <StyleLink color="grayText">Forgot password?</StyleLink>
              </Link>

              <Link href="/register">
                <StyleLink color="grayText">Register now</StyleLink>
              </Link>
            </Flex>
            <Flex alignItems="center">
              <Button
                mt={3}
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

export default withApollo({ ssr: false })(Login);
