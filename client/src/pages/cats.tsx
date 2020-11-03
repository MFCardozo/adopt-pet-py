import { Heading } from "@chakra-ui/core";
import React from "react";
import { AnimalCardList } from "../components/AnimalCardList";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Cats: React.FC = () => {
  return (
    <Layout>
      <Heading mb={5} textAlign="center">
        Cats
      </Heading>

      <AnimalCardList filter="Cat" />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Cats);
