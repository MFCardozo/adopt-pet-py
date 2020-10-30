import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import theme from "../theme";

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default MyApp;
