import actionCable from 'actioncable'
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { cachePolicy } from "@/app/graphql/queries/policies";

type GraphQL = {
  client: any;
};

export const graphql: GraphQL = {
  client: undefined,
};

function createApolloClient(uri: string, credentials?: string) {
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

export function initializeApollo(uri: string, credentials?: string) {
  const _apolloClient = graphql.client ?? createApolloClient(uri, credentials);
  if (!graphql.client) graphql.client = _apolloClient;

  return _apolloClient;
}

/** 
 * ActionCable connection 
 */
export const action: { cable: ReturnType<typeof actionCable.createConsumer> | null } = { cable: null }

export function initializeActionCable(host: string) {
  const _actionCable = action.cable ?? actionCable.createConsumer(host)
  if (!action.cable) action.cable = _actionCable

  return _actionCable;
}