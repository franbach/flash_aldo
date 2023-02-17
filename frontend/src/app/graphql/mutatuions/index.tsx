import { gql } from "@apollo/client";

export const TRANSFER_SHOES = gql`
  mutation ShoesMutation($input: ShoesMutationInput!) {
    transfer(input: $input) {
      transfered {
        name
        inventory
      }
    }
  }
`;
