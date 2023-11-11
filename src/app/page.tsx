"use client";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";

import ContactCard from "@/components/ContactCard";
import ContactFilter from "@/components/ContactFilter";
import Navbar from "@/components/Navbar";
import StyledPagination from "@/components/Pagination";

const GET_CONTACT_QUERY = gql`
  query contact_aggregate(
    $limit: Int
    $offset: Int
    $where: contact_bool_exp
    $order_by: [contact_order_by!]
  ) {
    contact_aggregate(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { first_name: asc }
    ) {
      aggregate {
        max {
          first_name
          last_name
        }
        min {
          first_name
          last_name
        }
        avg {
          id
        }
        sum {
          id
        }
        count
      }
      nodes {
        first_name
        last_name
        id
        phones {
          number
          id
        }
      }
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const [contacts, setContacts] = useState<any>({ general: [], favorites: [] });

  const helper = (res: any) => {
    const dataArr = res.contact_aggregate.nodes || [];
    const favoritesArr = JSON.parse(
      localStorage.getItem("favoritesContact") || "[]"
    );
    const result = dataArr.reduce(
      (current: any, next: any) => {
        if (favoritesArr.includes(next.id)) {
          current.favorite.push(next);
        } else {
          current.general.push(next);
        }
        return current;
      },
      { favorite: [], general: [] }
    );

    return result;
  };
  const { data, loading, refetch } = useQuery(GET_CONTACT_QUERY, {
    onCompleted: (value) => {
      const result = helper(value);
      setContacts(result);
    },
  });

  useEffect(() => {
    if (category === "name" && typeof keyword === "string") {
      refetch({
        where: {
          _or: [
            {
              first_name: {
                _iregex: keyword.split(" ")[0] as string,
              },
            },
            {
              last_name: {
                _iregex: keyword.split(" ").pop(),
              },
            },
          ],
        },
      });
    } else if (category === "phone" && typeof keyword === "string") {
      refetch({
        where: {
          phones: {
            number: {
              _iregex: keyword,
            },
          },
        },
      });
    } else {
      refetch();
    }
  }, [category, keyword, refetch]);

  return (
    <div>
      <Navbar onClick={() => router.push("/add-contact")} title="Phone Book" />
      <ContactFilter
        defVal={{
          keyword,
          category,
        }}
        onSearch={async (res) => {
          const whereCondition =
            res.category === "name"
              ? {
                  _or: [
                    { first_name: { _iregex: res.value.split(" ")[0] } },
                    { last_name: { _iregex: res.value.split(" ").pop() } },
                  ],
                }
              : {
                  phones: {
                    number: {
                      _iregex: res.value,
                    },
                  },
                };

          await refetch({ where: whereCondition }).then((value) => {
            const result = helper(value.data);
            setContacts(result);
            if (res.value) {
              router.push(`/?keyword=${res.value}&category=${res.category}`);
            } else {
              router.push(`/`);
            }
          });
        }}
      />
      {!loading ? (
        <>
          {contacts.favorite?.length > 0 && (
            <>
              Favorites
              {contacts.favorite?.map((val: any) => (
                <ContactCard
                  data={val}
                  key={val.id}
                  onChangeFav={() =>
                    refetch().then((value) => {
                      const result = helper(value.data);
                      setContacts(result);
                    })
                  }
                  onDelete={() =>
                    refetch().then((value) => {
                      const result = helper(value.data);
                      setContacts(result);
                    })
                  }
                />
              ))}
            </>
          )}
          Regular Contacts
          {contacts.general
            ?.slice((currentPage - 1) * 10, currentPage * 10)
            .map((val: any) => (
              <ContactCard
                data={val}
                key={val.id}
                onChangeFav={() =>
                  refetch().then((value) => {
                    const result = helper(value.data);
                    setContacts(result);
                  })
                }
                onDelete={() =>
                  refetch().then((value) => {
                    const result = helper(value.data);
                    setContacts(result);
                  })
                }
              />
            ))}
          {data?.contact_aggregate.aggregate.count > 10 && (
            <StyledPagination
              current={currentPage}
              style={{ textAlign: "right" }}
              total={contacts.general.length}
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
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
