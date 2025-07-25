export const appConfig = {
  graphqlUrl: import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:3000/graphql",
  cableUrl: import.meta.env.VITE_CABLE_URL ?? "ws://localhost:3000/cable",
  graphqlCredentials: (import.meta.env.VITE_GRAPHQL_CREDENTIALS as RequestCredentials | undefined) ?? "same-origin",
} as const;
