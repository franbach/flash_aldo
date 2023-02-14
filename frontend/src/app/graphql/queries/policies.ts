import type { InMemoryCacheConfig } from "@apollo/client";

const policies = ["store"];

export const cachePolicy: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: Object.fromEntries(
        policies.map((field) => [
          field,
          {
            read(_, { args, toReference }) {
              return toReference({
                __typename: field.replace(field[0], field[0].toUpperCase()),
                id: args?.id,
              });
            },
          },
        ]),
      ),
    },
  },
};
