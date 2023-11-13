"use client";
import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ContactCard from "@/components/ContactCard";
import ContactFilter from "@/components/ContactFilter";
import Navbar from "@/components/Navbar";
import StyledPagination from "@/components/Pagination";
import { ContactContext } from "@/context/ContactContext";
import useQueryGetContacts from "@/hooks/useQueryGetContacts";
import { getCategoriesContact } from "@/helpers";
import { Skeleton } from "antd";

export default function Home() {
  //#region HOOKS
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dataContact, handleDataContact } = useContext(ContactContext);
  const { data, loading, refetch } = useQueryGetContacts({
    onCompleted: (value) => {
      const result = getCategoriesContact(
        value.contact_aggregate.nodes,
        favoritesArr
      );
      handleDataContact(result);
    },
  });
  //#endregion HOOKS

  //#region CONSTANTS
  const currentPage = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const getVariableQuery = (query: string) => ({
    name: {
      _or: [
        { first_name: { _iregex: query.split(" ")[0] } },
        { last_name: { _iregex: query.split(" ").pop() } },
      ],
    },
    phone: {
      phones: {
        number: {
          _iregex: query,
        },
      },
    },
  });
  const favoritesArr =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favoritesContact") || "[]")
      : [];
  //#endregion CONSTANTS

  //#region HANDLER
  const refreshContactData = async () => {
    try {
      const { data } = await refetch();
      const result = getCategoriesContact(
        data.contact_aggregate.nodes,
        favoritesArr
      );
      handleDataContact(result);
    } catch (error) {
      console.error(error);
    }
  };

  //#region LIFECYCLE
  useEffect(() => {
    if (typeof keyword === "string") {
      refetch({
        where: getVariableQuery(keyword)[category as "name" | "phone"],
      });
    } else {
      refetch();
    }
  }, [category, keyword, refetch]);
  //#endregion LIFECYCLE

  return (
    <div>
      <Navbar onClick={() => router.push("/add-contact")} title="Phone Book" />
      <ContactFilter
        defVal={{
          keyword,
          category,
        }}
        onSearch={async (res) => {
          const whereCondition = getVariableQuery(res.value)[res.category];
          try {
            const { data } = await refetch({ where: whereCondition });
            const result = getCategoriesContact(
              data.contact_aggregate.nodes,
              favoritesArr
            );
            handleDataContact(result);
            if (res.value) {
              router.push(`/?keyword=${res.value}&category=${res.category}`);
            } else {
              router.push(`/`);
            }
          } catch (error) {
            console.error(error);
          }
        }}
      />

      {!loading ? (
        <div style={{ padding: "20px" }}>
          {dataContact.favorites?.length > 0 && (
            <>
              Favorites
              {dataContact.favorites?.map((val: any) => (
                <ContactCard
                  data={val}
                  key={val.id}
                  onChangeFav={refreshContactData}
                  onDelete={refreshContactData}
                />
              ))}
            </>
          )}
          Regular Contacts
          {dataContact.general
            ?.slice((currentPage - 1) * 10, currentPage * 10)
            .map((val: any) => (
              <ContactCard
                data={val}
                key={val.id}
                onChangeFav={refreshContactData}
                onDelete={refreshContactData}
              />
            ))}
          {data?.contact_aggregate.aggregate.count > 10 && (
            <StyledPagination
              current={currentPage}
              style={{ textAlign: "right" }}
              total={dataContact.general.length}
              onChange={(page) => {
                if (keyword) {
                  router.push(
                    `/?page=${page}&keyword=${keyword}&category=${category}`
                  );
                } else {
                  router.push(`/?page=${page}`);
                }
              }}
            />
          )}
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <Skeleton loading={loading} active avatar />
          <Skeleton loading={loading} active avatar />
          <Skeleton loading={loading} active avatar />
          <Skeleton loading={loading} active avatar />
        </div>
      )}
    </div>
  );
}
