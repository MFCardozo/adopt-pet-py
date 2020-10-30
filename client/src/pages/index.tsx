import { Flex, Heading, Button, Box } from "@chakra-ui/core";
import React from "react";
import { AnimalCard } from "../components/AnimalCard";
import { AnimalCardList } from "../components/AnimalCardList";
import { Layout } from "../components/Layout";

// TODO: FIX the color of genders
const Index: React.FC = () => {
  return (
    <Layout>
      <Heading mb={5} textAlign="center">
        Most Recent
      </Heading>

      <AnimalCardList />
    </Layout>
  );
};

export default Index;
