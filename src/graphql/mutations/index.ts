import { gql } from "@apollo/client";

export const DELETE_CONTACT_MUTATION = gql`
  mutation delete_contact($where: contact_bool_exp!) {
    delete_contact(where: $where) {
      returning {
        id
      }
    }
  }
`;

export const ADD_CONTACT_MUTATION = gql`
  mutation insert_contact($objects: [contact_insert_input!]!) {
    insert_contact(objects: $objects) {
      returning {
        first_name
        last_name
      }
    }
  }
`;

export const UPDATE_CONTACT_MUTATION = gql`
  mutation update_contact($_set: contact_set_input, $where: contact_bool_exp!) {
    update_contact(_set: $_set, where: $where) {
      returning {
        id
      }
    }
  }
`;
