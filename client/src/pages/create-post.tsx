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
} from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import React from "react";
import { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [imagePreview, setImagePreview] = useState<[]>([]);

  //function to previsualized the image seleted
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagesUploaded = Array.from(e.target.files!);
    if (imagesUploaded && imagePreview.length < 2) {
      imagesUploaded.forEach((image) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(
            (imgPreview) => [...imgPreview, reader.result] as any
          );
        };
        reader.readAsDataURL(image);
      });
    }
  };
  return (
    <Layout>
      <Formik
        initialValues={{
          name: "",
          description: "",
          type: "",
          age: "",
          images: [],
          size: "",
          gender: "",
          phone: "",
          location: "",
          vaccionations: false,
          neutered: false,
        }}
        onSubmit={async (values, { setErrors }) => {
          await console.log(values);
        }}
      >
        {({ isSubmitting }) => (
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

            <Flex py={4} flexDirection="column" justify="space-between">
              {/* TODO: fix the radio inputs */}
              <div id="my-radio-group">Type</div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="type" value="Cat" checked />
                  Cat
                </label>
                <label>
                  <Field type="radio" name="type" value="Dog" />
                  Dog
                </label>
                <label>
                  <Field type="radio" name="type" value="Other" />
                  Other
                </label>
              </div>

              {/* <FormLabel id="radio-group-type">Type</FormLabel> */}
              {/* <Flex
                justify="space-evenly"
                role="group"
                aria-labelledby="radio-group-type"
              > */}

              {/* <Radio id="type" value="Dog" name="type">
                    Dog
                  </Radio>
                  <Radio id="type" value="Other" name="type">
                    Other
                  </Radio> */}
              {/* </Flex> */}

              <FormControl as="fieldset" mb={4}>
                <FormLabel as="legend">Gender</FormLabel>

                <RadioGroup defaultValue="Female" name="gender">
                  <Radio value="Female">Female</Radio>
                  <Radio value="Male">Male</Radio>
                </RadioGroup>
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">Size</FormLabel>

                <RadioGroup defaultValue="Little">
                  <Radio value="Newborn">Newborn</Radio>
                  <Radio value="Little">Little</Radio>
                  <Radio value="Medium">Medium</Radio>
                  <Radio value="Big">Big</Radio>
                </RadioGroup>
              </FormControl>
            </Flex>

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

            {/* TODO:fix IMG UPLOADER */}

            <PseudoBox
              as="button"
              fontWeight="semibold"
              py={2}
              px={4}
              rounded="md"
              color="white"
              bg="blue.500"
              _active={{ bg: "blue.700" }}
              _focus={{ boxShadow: "outline" }}
            >
              <InputField
                type="file"
                name="images"
                label="Choose Pet Images"
                accept="image/*"
                opacity={0}
                w={0}
                position="absolute"
                z-index={-1}
                multiple
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />
            </PseudoBox>
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
