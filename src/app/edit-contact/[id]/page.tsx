"use client";
import { useEffect } from "react";

import FormContact from "@/components/FormContact";
import useQueryGetContact from "@/hooks/useQueryGetContact";

export default function UpdateContact({ params }: { params: { id: string } }) {
  const {
    data: dataContact,
    loading,
    refetch,
  } = useQueryGetContact({ variables: { id: params.id } });

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
