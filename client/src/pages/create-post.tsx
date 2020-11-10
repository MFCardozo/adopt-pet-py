import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Stack,
  Tag,
} from "@chakra-ui/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ImageField } from "../components/formComponents/ImageField";
import { InputField } from "../components/formComponents/InputField";
import { PhoneField } from "../components/formComponents/PhoneField";
import { Layout } from "../components/Layout";
import { useAddAnimalPostMutation } from "../generated/graphql";
import { currentUserIsAuth } from "../utils/currentUserIsAuth";
import { toErrorObj } from "../utils/toErrorObj";
import { withApollo } from "../utils/withApollo";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  currentUserIsAuth();
  const [addAnimalPost] = useAddAnimalPostMutation();

  return (
    <Layout>
      <Formik
        initialValues={{
          name: "",
          description: "",
          type: "Cat",
          age: "",
          images: null,
          size: "NewBorn",
          gender: "Female",
          phone: "",
          location: "",
          vaccionations: false,
          neutered: false,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          if (!values.images) {
            setErrors({ images: "An image must be selected" });
            return;
          }
          const response = await addAnimalPost({
            variables: values,
            update: (cache) => {
              cache.evict({ fieldName: "animalPosts:{}" });
            },
          });
          // animalPosts

          if (response.data?.addAnimal.errors) {
            setErrors(toErrorObj(response.data.addAnimal.errors));
          } else if (response.data?.addAnimal.animal) {
            //successfully animal added
            router.push("/");
          }

          return response;
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField
              name="name"
              label="Pet Name"
              placeholder="pet name"
              isRequired
            />
            <InputField
              textarea
              name="description"
              label="Description"
              placeholder="Ej:A good dog..."
            />
            <InputField name="age" label="Age" placeholder="Ej:2" />

            <Box my={2}>
              <Box as="label" id="my-radio-type">
                Type
              </Box>
              <Box role="group" aria-labelledby="my-radio-type " mb={4}>
                <Field id="cat" name="type" type="radio" value="Cat" />
                <FormLabel htmlFor="cat" mx={2}>
                  Cat
                </FormLabel>
                <Field id="dog" name="type" type="radio" value="Dog" />
                <FormLabel htmlFor="dog" mx={2}>
                  Dog
                </FormLabel>
                <Field id="other" name="type" type="radio" value="Other" />
                <FormLabel htmlFor="other" mx={2}>
                  Other
                </FormLabel>
              </Box>

              <Box as="label" id="my-radio-gender">
                Gender
              </Box>
              <Box role="group" aria-labelledby="my-radio-gender" mb={4}>
                <Field id="female" name="gender" type="radio" value="Female" />
                <FormLabel htmlFor="female" mx={2}>
                  Female
                </FormLabel>
                <Field id="male" name="gender" type="radio" value="Male" />
                <FormLabel htmlFor="male" mx={2}>
                  Male
                </FormLabel>
              </Box>
              <Box as="label" id="my-radio-size">
                Size
              </Box>
              <Box role="group" aria-labelledby="my-radio-size" mb={4}>
                <Field id="newborn" name="size" type="radio" value="NewBorn" />
                <FormLabel htmlFor="newborn" mx={2}>
                  NewBorn
                </FormLabel>
                <Field id="little" name="size" type="radio" value="Little" />
                <FormLabel htmlFor="little" mx={2}>
                  Little
                </FormLabel>
                <Field id="medium" name="size" type="radio" value="Medium" />
                <FormLabel htmlFor="medium" mx={2}>
                  Medium
                </FormLabel>
                <Field id="big" name="size" type="radio" value="Big" />
                <FormLabel htmlFor="big" mx={2}>
                  Big
                </FormLabel>
              </Box>
            </Box>

            <Stack spacing={10} isInline my={4}>
              <Tag variant="outline" color="black">
                <Field
                  as={Checkbox}
                  mx={1}
                  type="checkbox"
                  name="vaccionations"
                />
                Vaccionations
              </Tag>

              <Tag variant="outline" color="black">
                <Field as={Checkbox} mx={1} type="checkbox" name="neutered" />
                Neutered
              </Tag>
            </Stack>

            <ImageField name="images" setImages={setFieldValue} />

            <PhoneField />
            <InputField
              isRequired
              name="location"
              label="Location"
              placeholder="Asuncion"
            />
            <Flex alignItems="center">
              <Button
                mt={2}
                mx="auto"
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Create
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: true })(CreatePost);
