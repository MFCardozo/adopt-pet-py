import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import NavBar from "./NavBar";
import { Flex, Button, Link, Icon } from "@chakra-ui/core";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
      <Flex justify="end" position="absolute" w="90%" mt="20px" pb="10px">
        <Link href="https://github.com/ManuMcfly6/adopt-pet-py" isExternal>
          Source Code
          <Icon name="external-link" mx="2px" />
        </Link>
      </Flex>
    </>
  );
};
