import { Box } from "@chakra-ui/core";
import React from "react";

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
    </Box>
  );
};
