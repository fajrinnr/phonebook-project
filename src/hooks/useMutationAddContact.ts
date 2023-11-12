import { ApolloError, useMutation } from "@apollo/client";
import { ADD_CONTACT_MUTATION } from "@/graphql/mutations";

interface useMutationAddContactProps {
  variables?: {
    objects: {
      first_name: string;
      last_name: string;
      phones: {
        data: { number: string }[];
      };
    };
  };
  onCompleted?: (data: any) => void;
  onError?: (data: ApolloError) => void;
}

const useMutationAddContact = (props: useMutationAddContactProps) => {
  const { variables, onCompleted, onError } = props;
  const [addContact, { data, loading, error }] = useMutation(
    ADD_CONTACT_MUTATION,
    {
      onCompleted,
      onError,
      variables,
    }
  );

  return { data, loading, error, addContact };
};

export default useMutationAddContact;
