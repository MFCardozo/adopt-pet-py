import {
  Box,
  CircularProgress,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/core";
import React from "react";
import { EditDeletePosts } from "../../components/EditDeletePosts";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

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
  } else if (error) {
    return <Box>{error.message}</Box>;
  } else if (!data?.animal) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        m="auto"
        h="80vh"
        w={["100%", "70%"]}
        shadow="md"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          objectFit="cover"
          h="100%"
          w="100%"
          src={data.animal.images[0]}
        ></Image>
      </Box>
      <Flex
        m="auto"
        w={["100%", "70%"]}
        justify="space-between"
        borderWidth="1px"
        rounded="lg"
        flexDirection="column"
      >
        <Box mx={2} position="relative">
          <Box position="absolute" right="2px" top="2px">
            <EditDeletePosts
              id={data.animal.id}
              creatorId={data.animal.creatorId}
            />
          </Box>
          <Heading>{data.animal.name}</Heading>

          <List spacing={3} mt={2}>
            <ListItem>
              <Text as="em">Gender:</Text> {data.animal.gender}
            </ListItem>
            <ListItem>
              <Text as="em">Size:</Text> {data.animal.size}
            </ListItem>
            {data.animal.age && (
              <ListItem>
                <Text as="em">Age:</Text> {data.animal.age}
              </ListItem>
            )}

            {data.animal.vaccionations && (
              <ListItem>
                <ListIcon icon="check-circle" color="green.500" />
                Vaccionations
              </ListItem>
            )}
            {data.animal.neutered && (
              <ListItem>
                <ListIcon icon="check-circle" color="green.500" />
                neutered
              </ListItem>
            )}
          </List>
        </Box>

        {data.animal.description && (
          <Box mx={2} maxW="70%">
            <Heading as="h3" size="lg">
              Description
            </Heading>
            <Text>{data.animal.description}</Text>
          </Box>
        )}

        <List alignSelf="end" m={2}>
          <ListItem>
            {" "}
            <Text as="em">Location: </Text>
            {data.animal.location}
          </ListItem>

          <ListItem>
            <ListIcon icon="phone" color="blue.400" />
            +595{data.animal.phone}
          </ListItem>
        </List>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
