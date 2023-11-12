import { ApolloError, useQuery } from "@apollo/client";
import { GET_DETAIL_CONTACT_QUERY } from "@/graphql/queries";

interface UseQueryGetContactProps {
  variables?: {
    id: string | number;
  };
  onCompleted?: (data: any) => void;
  onError?: (data: ApolloError) => void;
}

const useQueryGetContact = (props: UseQueryGetContactProps) => {
  const { variables, onCompleted, onError } = props;
  const { data, loading, error, refetch } = useQuery(GET_DETAIL_CONTACT_QUERY, {
    onCompleted,
    onError,
    variables,
  });

  return { data, loading, error, refetch };
};

export default useQueryGetContact;
