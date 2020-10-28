import { Badge, Box, Flex, IconButton, Image } from "@chakra-ui/core";
import React from "react";
import { Animal } from "../generated/graphql";
import { format } from "timeago.js";
interface AnimalCardProps {
  data: Pick<
    Animal,
    | "id"
    | "name"
    | "images"
    | "type"
    | "createdDate"
    | "location"
    | "gender"
    | "size"
  >;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ data }) => {
  const { name, type, images, location, gender, size } = data;
  let { createdDate } = data;

  const readableDate = format(createdDate);

  return (
    <Box maxW="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image minH="300px" src="http://placekitten.com/300/300" alt={type} />

      <Box p="1">
        <Box d="flex" alignItems="baseline" justifyContent="space-between">
          <Box>
            <Badge borderRadius="full" px="2">
              {size}
            </Badge>
            <Badge
              borderRadius="full"
              px="2"
              variantColor={gender === "female" ? "red" : "blue"}
            >
              {gender}
            </Badge>
          </Box>
          <Box>
            <IconButton
              size="sm"
              variant="outline"
              aria-label="Edit Post"
              icon="edit"
            />
            <IconButton
              size="sm"
              variant="outline"
              aria-label="Delete Post"
              icon="delete"
            />
          </Box>
        </Box>
        <Box
          my="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>

        <Flex justify="end">
          <Box color="gray.600" fontSize="sm" mr={1}>
            {readableDate}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
