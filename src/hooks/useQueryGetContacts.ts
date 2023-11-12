import { ApolloError, useQuery } from "@apollo/client";
import { GET_CONTACT_QUERY } from "@/graphql/queries";

interface UseQueryGetContactProps {
  variables?: {
    where?: {
      _or?: {
        first_name?: {
          _iregex?: string;
        };
        last_name?: {
          _iregex?: string;
        };
      }[];
      phones?: {
        number?: {
          _iregex?: string;
        };
      }[];
    };
  };
  onCompleted?: (data: any) => void;
  onError?: (data: ApolloError) => void;
}

const useQueryGetContacts = (props: UseQueryGetContactProps) => {
  const { variables, onCompleted, onError } = props;
  const { data, loading, error, refetch } = useQuery(GET_CONTACT_QUERY, {
    onCompleted,
    onError,
    variables,
  });

  return { data, loading, error, refetch };
};

export default useQueryGetContacts;
