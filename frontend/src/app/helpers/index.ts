import actionCable from "actioncable";
import { ApolloClient, InMemoryCache, HttpLink, type NormalizedCacheObject } from "@apollo/client";
import { cachePolicy } from "@/app/graphql/queries/policies";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(uri: string, credentials?: RequestCredentials) {
  let httpLink = new HttpLink({
    uri,
    credentials,
    fetchOptions: {
      mode: "cors",
      signal: new AbortController().signal,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(cachePolicy),
  });
}

export function initializeApollo(uri: string, credentials?: RequestCredentials) {
  apolloClient = apolloClient ?? createApolloClient(uri, credentials);
  return apolloClient;
}

export function getApolloClient() {
  if (!apolloClient) {
    throw new Error("Apollo client is not initialized");
  }
  return apolloClient;
}

/**
 * ActionCable connection
 */
let actionCableConsumer: ReturnType<typeof actionCable.createConsumer> | null = null;

export function initializeActionCable(host: string) {
  actionCableConsumer = actionCableConsumer ?? actionCable.createConsumer(host);
  return actionCableConsumer;
}

export function getActionCableConsumer() {
  if (!actionCableConsumer) {
    throw new Error("ActionCable consumer is not initialized");
  }
  return actionCableConsumer;
}
