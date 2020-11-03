import { Box, SimpleGrid, Skeleton, Flex, Button } from "@chakra-ui/core";
import React from "react";
import { useAnimalPostsQuery } from "../generated/graphql";
import useWindowSize from "../utils/useWindowSize";
import { AnimalCard } from "./AnimalCard";

interface AnimalCardListProps {
  filter?: string | null;
}


export const AnimalCardList: React.FC<AnimalCardListProps> = ({ filter }) => {
  const limit = 8;

  const { data, error, loading, fetchMore, variables } = useAnimalPostsQuery({
    variables: {
      limit,
      cursor: null,
      type: filter,
    },
    notifyOnNetworkStatusChange: true,
  });
  if (!loading && !data) {
    return (
      <div>
        <div>you got an unexpected error for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <>
      {!data && loading ? (
        <SimpleGrid minChildWidth="220px" spacing="40px">
          {[...Array(limit)].map((e, i) => {
            return (
              <Skeleton key={i}>
                <Box key={i} height="375px" width="290px">
                  {e}
                </Box>
              </Skeleton>
            );
          })}
        </SimpleGrid>
      ) : (
        <SimpleGrid minChildWidth="220px" spacing="40px">
          {data?.animalPosts.animalPost.map((post) => {
            return <AnimalCard key={post.id} data={post}></AnimalCard>;
          })}
        </SimpleGrid>
      )}

      {data && data?.animalPosts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.animalPosts.animalPost[
                      data.animalPosts.animalPost.length - 1
                    ].createdDate,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            variantColor="blue"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};
