import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAssignedTasks: {
            merge: false,
          },
        },
      },
    },
  })
});
export default client;
