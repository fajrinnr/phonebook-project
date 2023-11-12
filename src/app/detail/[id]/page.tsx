"use client";
import { useEffect } from "react";

import FormContact from "@/components/FormContact";
import useQueryGetContact from "@/hooks/useQueryGetContact";
import { Avatar, Button } from "antd";

export default function DetailContactPage({
  params,
}: {
  params: { id: string };
}) {
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              type="link"
              // onClick={() => router.back()}
              style={{ padding: 0, fontSize: "17px", fontWeight: "600" }}
            >
              Cancel
            </Button>
            <h1 style={{ fontSize: "20px" }}>Detail Info</h1>
            <Button
              type="link"
              style={{ padding: 0, fontSize: "17px", fontWeight: "600" }}
            >
              Edit
            </Button>
          </div>
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
              marginRight: "10px",
              fontSize: "70px",
            }}
            size={150}
          >
            {dataContact.contact_by_pk.first_name[0]}
          </Avatar>
          <span>
            {`${dataContact.contact_by_pk.first_name} ${dataContact.contact_by_pk.last_name}`}{" "}
          </span>
          <span>
            {new Date(dataContact.contact_by_pk.created_at).toLocaleDateString(
              "en-ID"
            )}
          </span>
          <div
            style={{
              backgroundColor: "#191E22",
              width: "100%",
              height: "100vh",
              borderRadius: "50px 50px 0 0",
              padding: "50px",
              marginTop: "20px",
            }}
          >
            sadasdadasd
          </div>
        </div>
      )}
    </>
  );
}
