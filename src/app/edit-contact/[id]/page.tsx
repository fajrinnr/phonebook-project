"use client";
import { useEffect } from "react";

import FormContact from "@/components/FormContact";
import useQueryGetContact from "@/hooks/useQueryGetContact";
import { Skeleton } from "antd";

export default function UpdateContact({ params }: { params: { id: string } }) {
  //#region HOOKS
  const {
    data: dataContact,
    loading,
    refetch,
  } = useQueryGetContact({ variables: { id: params.id } });
  //#endregion HOOKS

  //#region LIFECYCLE
  useEffect(() => {
    refetch();
  }, [refetch]);
  //#endregion LIFECYCLE

  return (
    <>
      {loading ? (
        <Skeleton loading={loading} active avatar style={{ padding: "20px" }} />
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
