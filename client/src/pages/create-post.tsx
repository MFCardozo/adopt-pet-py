import {
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
  Stack,
  Text,
  Image,
  PseudoBox,
  IconButton,
  Tag,
  NumberInputField,
} from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { register } from "timeago.js";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useAddAnimalPostMutation } from "../generated/graphql";
import { toErrorObj } from "../utils/toErrorObj";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  const [addAnimalPost] = useAddAnimalPostMutation();
  const [imagePreview, setImagePreview] = useState<[]>([]);

  //function to previsualized the image seleted
  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const imagesUploaded = Array.from(e.target.files!);

  //   if (imagesUploaded && imagePreview.length < 2) {
  //     imagesUploaded.forEach((image) => {
  //       let reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImagePreview(
  //           (imgPreview) => [...imgPreview, reader.result] as any
  //         );
  //       };
  //       reader.readAsDataURL(image);
  //     });
  //   }
  // };

  // TODOCHANGE THE PERFONRMACE OF FORM
  return (
    <Layout>
      <Formik
        initialValues={{
          name: "",
          description: "",
          type: "Cat",
          age: "",
          images: null,
          size: "Newborn",
          gender: "Female",
          phone: "",
          location: "",
          vaccionations: false,
          neutered: false,
        }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.images) {
            setErrors({ images: "An image must be selected" });
            return;
          }
          const response = await addAnimalPost({
            variables: values,
          });

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
            <FormControl as="fieldset" mb={4}>
              <FormLabel as="legend">Type</FormLabel>
              <RadioGroup
                defaultValue="Cat"
                onChange={(e) => setFieldValue("type", e.target.value)}
              >
                <Radio value="Cat" name="type">
                  Cat
                </Radio>

                <Radio value="Dog" name="type">
                  Dog
                </Radio>
                <Radio value="Other" name="type">
                  Other
                </Radio>
              </RadioGroup>
            </FormControl>
            <FormControl as="fieldset" mb={4}>
              <FormLabel as="legend">Gender</FormLabel>

              <RadioGroup
                defaultValue="Female"
                onChange={(e) => setFieldValue("gender", e.target.value)}
              >
                <Radio value="Female">Female</Radio>
                <Radio value="Male">Male</Radio>
              </RadioGroup>
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Size</FormLabel>

              <RadioGroup
                defaultValue="Newborn"
                onChange={(e) => setFieldValue("size", e.target.value)}
              >
                <Radio value="Newborn">Newborn</Radio>
                <Radio value="Little">Little</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="Big">Big</Radio>
              </RadioGroup>
            </FormControl>
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
            {/* TODO:Sho preview image */}
            <FormControl isRequired>
              <Button
                as={FormLabel}
                mt={2}
                mx="auto"
                variantColor="blue"
                htmlFor="images"
              >
                Choose Pet Images
              </Button>
              <Input
                id="images"
                type="file"
                name="images"
                accept="image/*"
                opacity={0}
                w={0}
                position="absolute"
                z-index={-1}
                // multiple
                onChange={(e) => {
                  setFieldValue("images", e.target.files[0]);
                }}
              />
            </FormControl>

            <Flex minH="220px" borderWidth="1px" rounded="lg" my={1}>
              {imagePreview?.length === 0 ? (
                <Text>No image selected</Text>
              ) : (
                <Flex>
                  {imagePreview?.map((img, i) => {
                    return (
                      <Image
                        key={`${img} ${i}`}
                        src={img}
                        h="200px"
                        m={2}
                      ></Image>
                    );
                  })}
                </Flex>
              )}
            </Flex>
            <InputGroup alignItems="center">
              <InputLeftAddon children="+595" mt="20px" />
              <InputField
                label="Phone contact"
                name="phone"
                placeholder="981000000"
                isRequired
                type="tel"
              />
            </InputGroup>
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

export default CreatePost;
