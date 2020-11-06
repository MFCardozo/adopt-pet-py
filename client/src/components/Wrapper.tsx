import React from "react";
import { Box, Button, Flex, Icon, Link } from "@chakra-ui/core";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      rounded="lg"
      p={4}
      borderWidth="1px"
      mt={[1, 8]}
      mb={1}
      mx="auto"
      maxW={variant === "regular" ? "90%" : ["80%", "60%", "30%"]}
      w="100%"
    >
      {children}

      <Flex justify="end" position="absolute" w="85%" mt="40px" pb="10px">
        <Button
          variant="outline"
          as={Link}
          href="https://github.com/ManuMcfly6/adopt-pet-py"
          isExternal
        >
          Source Code
          <Icon name="external-link" mx="2px" />
        </Button>
      </Flex>
    </Box>
  );
};
