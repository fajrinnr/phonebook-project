"use client";
import { useEffect, useState } from "react";
import { Button, Divider, Skeleton } from "antd";
import { useRouter } from "next/navigation";

import useQueryGetContact from "@/hooks/useQueryGetContact";
import {
  StyledAvatar,
  StyledContainer,
  StyledHeader,
  StyledPhonesContainer,
} from "./styled";

export default function DetailContactPage({
  params,
}: {
  params: { id: string };
}) {
  //#region HOOKS
  const [formattedDate, setFormattedDate] = useState({
    created_at: "",
    updated_at: "",
  });
  const router = useRouter();
  const {
    data: dataContact,
    loading,
    refetch,
  } = useQueryGetContact({
    variables: { id: params.id },
  });
  //#endregion HOOKS

  //#region CONSTANTS
  const { contact_by_pk: contact } = dataContact ?? {};
  //#endregion CONSTANTS

  //#region LIFECYCLE
  useEffect(() => {
    const options = {
      dateStyle: "long",
    } as Intl.DateTimeFormatOptions;
    if (contact)
      setFormattedDate({
        created_at: new Intl.DateTimeFormat("en-US", options).format(
          new Date(contact.created_at)
        ),
        updated_at: new Intl.DateTimeFormat("en-US", options).format(
          new Date(contact.updated_at)
        ),
      });
  }, [contact]);

  useEffect(() => {
    refetch();
  }, [refetch]);
  //#endregion LIFECYCLE

  return (
    <StyledContainer>
      <StyledHeader>
        <Button type="link" onClick={() => router.back()}>
          Cancel
        </Button>
        <h1>Detail Info</h1>
        <Button
          type="link"
          onClick={() => router.push(`/edit-contact/${params.id}`)}
        >
          Edit
        </Button>
      </StyledHeader>
      {loading ? (
        <Skeleton loading={loading} active avatar style={{ padding: "20px" }} />
      ) : (
        <>
          <StyledAvatar size={150}>{contact.first_name[0]}</StyledAvatar>
          <span className="fullname">
            {`${contact.first_name} ${contact.last_name}`}{" "}
          </span>
          <span className="date">{formattedDate.created_at}</span>
          <StyledPhonesContainer>
            {contact.phones.map((phone: any, i: number) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#53585C" }}>
                  {i < 1 ? "Phone Number" : `Phone Number (${i})`}
                </span>
                <span style={{ color: "#fff" }}>{phone.number}</span>
                <Divider style={{ borderTop: "1px solid #53585C" }} />
              </div>
            ))}
            {contact.updated_at && (
              <span className="date">{`Last updated by ${formattedDate.updated_at}`}</span>
            )}
          </StyledPhonesContainer>
        </>
      )}
    </StyledContainer>
  );
}
