import {
  FormControl,
  Button,
  FormLabel,
  Input,
  Flex,
  Image,
  Text,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { useState } from "react";

interface ImageFieldProps {
  setImages: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  name: string;
}

export const ImageField: React.FC<ImageFieldProps> = ({ setImages, name }) => {
  const [field, { error }] = useField(name);
  const [imagePreview, setImagePreview] = useState<[]>([]);
  //   function to previsualized the image seleted
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    } else {
      setImages("images", e.target.files[0]);
      const imagesUploaded = Array.from(e.target.files!);

      if (imagesUploaded && imagePreview.length < 1) {
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
    }
  };

  return (
    <>
      <FormControl
        isInvalid={!!error && imagePreview.length === 0}
        isRequired
        position="relative"
      >
        <Button as={FormLabel} mt={2} mx="auto" variantColor="blue">
          Choose Pet Images
        </Button>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}

        {/* TODO:when press the remove icon clear the input file */}
        <Input
          id="images"
          type="file"
          name={field.name}
          accept="image/*"
          opacity={0}
          w={"200px"}
          p={5}
          top={0}
          position="absolute"
          z-index={-1}
          // multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleFileUpload(e);
          }}
        />
      </FormControl>

      <Flex minH="220px" borderWidth="1px" rounded="lg" my={1}>
        {imagePreview?.length === 0 ? (
          <Text>No image selected</Text>
        ) : (
          <Flex position="relative">
            {imagePreview?.map((img, i) => {
              return (
                <>
                  <Image
                    objectFit="cover"
                    key={`${img}-${i}`}
                    src={img}
                    h="200px"
                    maxW="95%"
                    m={2}
                  ></Image>
                  {img ? (
                    <IconButton
                      position="absolute"
                      key={`remove-${img}-${i}`}
                      top="12px"
                      right="12px"
                      aria-label="remove image"
                      icon="close"
                      onClick={() => {
                        setImages("images", null);
                        setImagePreview([]);
                      }}
                    ></IconButton>
                  ) : null}
                </>
              );
            })}
          </Flex>
        )}
      </Flex>
    </>
  );
};
