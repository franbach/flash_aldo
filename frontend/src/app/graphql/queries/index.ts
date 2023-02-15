import { gql } from "@apollo/client";

export const QUERY_ALL_STORES = gql`
  query Stores {
    stores {
      id
      name
      shoes {
        id
        name
        inventory
      }
    }
  }
`;