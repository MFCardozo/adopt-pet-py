import { useAnimalPostQuery } from "../generated/graphql";
import { useGetNumberId } from "./useGetNumberId";

export const useGetPostFromUrl = () => {
  const intId = useGetNumberId();
  return useAnimalPostQuery({
    skip: intId === -1, //in case of error or bad request
    variables: {
      id: intId,
    },
  });
};
