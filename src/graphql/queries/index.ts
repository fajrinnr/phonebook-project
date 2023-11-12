import { gql } from "@apollo/client";

export const GET_CONTACT_QUERY = gql`
  query contact_aggregate(
    $limit: Int
    $offset: Int
    $where: contact_bool_exp
    $order_by: [contact_order_by!]
  ) {
    contact_aggregate(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { first_name: asc }
    ) {
      aggregate {
        max {
          first_name
          last_name
        }
        min {
          first_name
          last_name
        }
        avg {
          id
        }
        sum {
          id
        }
        count
      }
      nodes {
        first_name
        last_name
        id
        phones {
          number
          id
        }
      }
    }
  }
`;

export const GET_DETAIL_CONTACT_QUERY = gql`
  query contact_by_pk($id: Int!) {
    contact_by_pk(id: $id) {
      first_name
      last_name
      phones {
        number
      }
      created_at
      updated_at
    }
  }
`;
