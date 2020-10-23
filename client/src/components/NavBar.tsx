import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Image,
  IconButton,
  Link as StyleLink,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/core";
import {
  useCurrentUserLoginQuery,
  useLogoutMutation,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

const MenuItems: React.FC = ({ children }) => (
  <StyleLink mt={[3, 0]} mb={[1, 0]} mr={6} display="block">
    {children}
  </StyleLink>
);

const NavBar: React.FC = (props) => {
  const [logout] = useLogoutMutation();
  const { data, loading } = useCurrentUserLoginQuery({
    skip: isServer(),
  });
  const apolloClient = useApolloClient(); //used for kill login user

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  let dinamicNavUser;

  if (loading) {
    dinamicNavUser = null;
  } else if (!data?.currentUserLogin) {
    //user not logged
    dinamicNavUser = (
      <>
        <MenuGroup title="Hello!" color="black">
          <Link href="/register">
            <MenuItem color="black">Register</MenuItem>
          </Link>
          <Link href="/login">
            <MenuItem color="black">Login</MenuItem>
          </Link>
        </MenuGroup>
      </>
    );
  } else {
    //user  logged
    dinamicNavUser = (
      <>
        <MenuGroup
          title={`Hello!, ${data.currentUserLogin.username}`}
          color="black"
        >
          <Link href="/">
            <MenuItem
              color="black"
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
              }}
            >
              Logout
            </MenuItem>
          </Link>
        </MenuGroup>
      </>
    );
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding=".6rem"
      bg="gray.400"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5} order={1}>
        <Link href="/">
          <StyleLink>
            <Image size="50px" src="\logo.png" alt="ayudamepy logo" />
          </StyleLink>
        </Link>
      </Flex>
      <Box
        display={[show ? "block" : "none", "flex"]}
        width={["full", "auto"]}
        alignItems="center"
        flexGrow={1}
        order={[4, 2]}
      >
        <Link href="/">
          <MenuItems>Find a dog</MenuItems>
        </Link>
        <Link href="/">
          <MenuItems>Find a cat</MenuItems>
        </Link>

        <hr />
      </Box>
      <Flex minW={["70%", "40%"]} justify="flex-end" order={3} mr={1}>
        <IconButton
          aria-label="Search database"
          variant="ghost"
          isRound={true}
          icon="search"
        />
      </Flex>
      <Box display={["block", "none"]} onClick={handleToggle} order={[3, 6]}>
        <svg
          fill="white"
          width="24px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{show ? "Close" : "Menu"}</title>
          <path
            d={
              show
                ? "M0 3  L18 20 h200 V160 M18 6  L-23 20 h-200 V140"
                : "M0 3 h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            }
          />
        </svg>
      </Box>

      <Box
        display={[show ? "block" : "none", "block"]}
        mt={[4, 0]}
        order={[5, 5]}
      >
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            rightIcon="chevron-down"
            variant="outline"
          >
            Options
          </MenuButton>
          <MenuList>{dinamicNavUser}</MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default NavBar;
