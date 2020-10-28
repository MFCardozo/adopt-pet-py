import { Box, SimpleGrid, Skeleton } from "@chakra-ui/core";
import React from "react";
import { useAnimalPostsQuery } from "../generated/graphql";
import useWindowSize from "../utils/useWindowSize";
import { AnimalCard } from "./AnimalCard";

interface AnimalCardListProps {}

export const AnimalCardList: React.FC<AnimalCardListProps> = ({}) => {
  let limit = 12; //only if case fail the window hook
  const size = useWindowSize();
  limit = size.width! >= 600 ? 12 : 5;

  const { data, error, loading, fetchMore } = useAnimalPostsQuery({
    variables: {
      limit,
      cursor: null,
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
    </>
  );
};
