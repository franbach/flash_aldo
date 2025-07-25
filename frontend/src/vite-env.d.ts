/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL?: string;
  readonly VITE_CABLE_URL?: string;
  readonly VITE_GRAPHQL_CREDENTIALS?: RequestCredentials;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
