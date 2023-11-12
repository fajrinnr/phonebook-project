import { ApolloError, useMutation } from "@apollo/client";
import { DELETE_CONTACT_MUTATION } from "@/graphql/mutations";

interface useMutationDeleteContactProps {
  variables?: {
    where: {
      id: {
        _eq: number;
      };
    };
  };
  onCompleted?: (data: any) => void;
  onError?: (data: ApolloError) => void;
}

const useMutationDeleteContact = (props: useMutationDeleteContactProps) => {
  const { variables, onCompleted, onError } = props;
  const [deleteContact, { data, loading, error }] = useMutation(
    DELETE_CONTACT_MUTATION,
    {
      onCompleted,
      onError,
      variables,
    }
  );

  return { data, loading, error, deleteContact };
};

export default useMutationDeleteContact;
