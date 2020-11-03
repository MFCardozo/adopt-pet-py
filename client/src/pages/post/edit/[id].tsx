import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  FormLabel,
  Stack,
  Tag,
} from "@chakra-ui/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ImageField } from "../../../components/formComponents/ImageField";
import { InputField } from "../../../components/formComponents/InputField";
import { PhoneField } from "../../../components/formComponents/PhoneField";
import { Layout } from "../../../components/Layout";
import {
  useAnimalPostQuery,
  useUpdateAnimalPostMutation,
} from "../../../generated/graphql";
import { useGetNumberId } from "../../../utils/useGetNumberId";
import { withApollo } from "../../../utils/withApollo";

interface PostEditProps {}

const EditPost: React.FC<PostEditProps> = ({}) => {
  const router = useRouter();
  const intId = useGetNumberId();
  const { data, loading } = useAnimalPostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updateAnimalPost] = useUpdateAnimalPostMutation();

  if (loading) {
    return (
      <Layout>
        <Box w="100%">
          <CircularProgress
            my="40vh"
            w="100%"
            isIndeterminate
            color="blue"
          ></CircularProgress>
        </Box>
      </Layout>
    );
  }
  if (!data?.animal) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          name: data.animal.name,
          description: data.animal.description,
          type: data.animal.type,
          age: data.animal.age,
          images: data.animal.images[0],
          size: data.animal.size,
          gender: data.animal.gender,
          phone: data.animal.phone,
          location: data.animal.location,
          vaccionations: data.animal.vaccionations,
          neutered: data.animal.neutered,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors }) => {
          if (!values.images) {
            setErrors({ images: "An image must be selected" });
            return;
          }
          await updateAnimalPost({
            variables: { id: intId, ...values },
            update: (cache) => {
              cache.evict({ fieldName: "animalPosts:{}" });
            },
          });

          router.back();
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
                <Field id="newborn" name="size" type="radio" value="Female" />
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
                Update
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
