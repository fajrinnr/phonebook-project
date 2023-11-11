"use client";

import FormContact from "@/components/FormContact";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const UPDATE_CONTACT_MUTATION = gql`
  query contact_by_pk($id: Int!) {
    contact_by_pk(id: $id) {
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export default function UpdateContact({ params }: { params: { id: string } }) {
  const {
    data: dataContact,
    loading,
    refetch,
  } = useQuery(UPDATE_CONTACT_MUTATION, {
    variables: {
      id: params.id,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <FormContact
          typeForm="update"
          dataContact={dataContact?.contact_by_pk}
          contactId={params.id}
        />
      )}
    </>
  );
}
