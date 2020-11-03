import { Badge, Box, Flex, IconButton, Image } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { Animal } from "../generated/graphql";
import { format } from "timeago.js";
import { useState } from "react";
import { EditDeletePosts } from "./EditDeletePosts";
import Link from "next/link";
interface AnimalCardProps {
  data: Pick<
    Animal, //fieldname cache update
    | "id"
    | "name"
    | "images"
    | "type"
    | "createdDate"
    | "location"
    | "gender"
    | "size"
    | "creatorId"
  >;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ data }) => {
  const { name, type, images, location, gender, size, creatorId, id } = data;
  let { createdDate } = data;

  const LocateTimeDate = new Date(createdDate).getTime() - 1000 * 60 * 60 * 3; //-3 hours due timezone

  //update the date every 1 minute a display above
  const [readableDate, setReadableDate] = useState(format(LocateTimeDate));
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      setTimeout(() => setReadableDate(format(LocateTimeDate)), 60000);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Box maxW="270px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Link href="post/id" as={`post/${id}`}>
        <Image
          cursor="pointer"
          minH="300px"
          src={`/public-images/${images[0]}`}
          alt={`${name}-${type}`}
          objectFit="cover"
        />
      </Link>

      <Box p="1">
        <Box d="flex" alignItems="baseline" justifyContent="space-between">
          <Box>
            <Badge borderRadius="full" px="2">
              {size}
            </Badge>
            <Badge
              borderRadius="full"
              px="2"
              variantColor={gender === "Female" ? "red" : "blue"}
            >
              {gender}
            </Badge>
          </Box>
          <Box>
            <EditDeletePosts id={id} creatorId={creatorId} />
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
