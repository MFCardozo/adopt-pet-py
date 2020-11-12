import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NextPageContext } from "next";
import { PaginatedAnimalsPosts } from "../generated/graphql";

const createClient = (ctx: NextPageContext) => {
  const link = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      Cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
  });

  return new ApolloClient({
    link,

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
};

export const withApollo = createWithApollo(createClient);
