import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GraphQLClient } from "graphql-request";

const query = /* GraphQL */ `
  query contact($limit: Int, $offset: Int) {
    contact(limit: $limit, offset: $offset) {
      first_name
      id
      last_name
      phones {
        number
        contact {
          first_name
          last_name
        }
        contact_id
      }
    }
  }
`;

export const GET_CONTACTS = gql`
  ${query}
`;

export async function getContactsFetchQuery(variables: any) {
  const graphQLClient = new GraphQLClient(
    "https://wpe-hiring.tokopedia.net/graphql"
  );

  const data = await graphQLClient.request(query, variables);
  return data;
}

export function useLazyQueryGetContacts({ onCompleted, onError }: any) {
  return useLazyQuery(GET_CONTACTS, {
    onCompleted,
    onError,
  });
}
