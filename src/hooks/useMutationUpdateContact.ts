import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_CONTACT_MUTATION } from "@/graphql/mutations";

interface useMutationUpdateContactProps {
  variables?: {
    _set: {
      first_name: string;
      last_name: string;
    };
    where: {
      id: { _eq: number };
    };
  };
  onCompleted?: (data: any) => void;
  onError?: (data: ApolloError) => void;
}

const useMutationUpdateContact = (props: useMutationUpdateContactProps) => {
  const { variables, onCompleted, onError } = props;
  const [updateContact, { data, loading, error }] = useMutation(
    UPDATE_CONTACT_MUTATION,
    {
      onCompleted,
      onError,
      variables,
    }
  );

  return { data, loading, error, updateContact };
};

export default useMutationUpdateContact;
