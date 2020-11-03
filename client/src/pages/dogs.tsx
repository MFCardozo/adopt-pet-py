import { Heading } from "@chakra-ui/core";
import React from "react";
import { AnimalCardList } from "../components/AnimalCardList";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Dogs: React.FC = () => {
  return (
    <Layout>
      <Heading mb={5} textAlign="center">
        Dogs
      </Heading>

      <AnimalCardList filter="Dog" />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dogs);
