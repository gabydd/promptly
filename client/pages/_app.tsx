import "../lib/index.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "../lib/context";
import client from "../lib/apolloClient";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}
