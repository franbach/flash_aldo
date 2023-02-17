import { gql } from "@apollo/client";

export const TRANSFER_SHOES = gql`
  mutation ShoeMutation($input: ShoesMutationInput!) {
    transferShoeMutation(input: $input) {
      clientMutationId
    }
  }
`;