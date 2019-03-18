import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { CachePersistor } from 'apollo-cache-persist';

import merge from 'lodash.merge';

import { getLocalStorageToken } from '../helpers/auth';

// Apollo GraphQL Resolvers
import { resolverAuth } from './resolvers/auth';
import { resolverGiftFlow } from './resolvers/gift';
import { resolverReferralDiscount } from './resolvers/member';

/**
 * Creates instance of Apollo client and Persistence and make it available across the application.
 * @return {{client: ApolloClient<NormalizedCacheObject> ,persistent: CachePersistor<NormalizedCacheObject>}}
 * */
const generateApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT_GQL,
  });

  // Gets the authentication token from local storage if it exists
  const token = getLocalStorageToken().accessToken;

  // Returns headers to the context so httpLink can read them
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  })).concat(httpLink);

  const cache = new InMemoryCache();
  const persistent = new CachePersistor({
    cache,
    storage: window.localStorage,
    maxSize: false, // set to unlimited (default is 1MB https://github.com/apollographql/apollo-cache-persist)
    debug: true, // enables console logging
    key: process.env.REACT_APP_STORE_LOCAL_STORAGE,
    debounce: 0, // writes changes to the local storage immediately
  });

  const resolvers = {
    ...merge(
      resolverAuth.resolvers,
      resolverGiftFlow.resolvers,
      resolverReferralDiscount.resolvers,
    ),
  };

  const typeDefs = {
    ...merge(
      resolverAuth.typeDefs,
      resolverGiftFlow.typeDefs,
      resolverReferralDiscount.typeDefs,
    ),
  };

  // Instantiates Apollo Client object for GraphQL
  const client = new ApolloClient({
    cache,
    link: authLink,
    resolvers,
    typeDefs,
  });

  const data = {
    ...merge(
      resolverAuth.defaults,
      resolverGiftFlow.defaults,
      resolverReferralDiscount.defaults,
    ),
  };

  // Creates default cache when user lands in the app for the first time
  if (!localStorage.getItem(process.env.REACT_APP_STORE_LOCAL_STORAGE)) {
    cache.writeData({ data });
  }

  // Cleans cache with default data once user logs out and logs back in
  client.onResetStore(() => {
    cache.writeData({ data });
  });

  return { client, persistent, cache };
};

const { client, persistent } = generateApolloClient();

export {
  persistent,
  client,
};