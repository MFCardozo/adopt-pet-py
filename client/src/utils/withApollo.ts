import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NextPageContext } from "next";
import { PaginatedAnimalsPosts } from "../generated/graphql";

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});
const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link,
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },

    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            animalPosts: {
              keyArgs: ["type"],
              merge(
                existing: PaginatedAnimalsPosts | undefined,
                incoming: PaginatedAnimalsPosts
              ): PaginatedAnimalsPosts {
                return {
                  ...incoming,
                  animalPost: [
                    ...(existing?.animalPost || []),
                    ...incoming.animalPost,
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
