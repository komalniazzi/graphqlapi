// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/', // Countries GraphQL API endpoint
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken'); // Get token from local storage
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
