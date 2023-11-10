"use client";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { gql, useQuery } from "@apollo/client";

import ContactCard from "@/components/ContactCard";
import ContactFilter from "@/components/ContactFilter";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const query = gql`
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
  const [contacts, setContacts] = useState<any>({});
  const [offset, setOffset] = useState({
    from: 0,
    to: 10,
  });
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
  const { data, loading, refetch } = useQuery(query, {
    onCompleted: (value) => {
      const result = helper(value);
      setContacts(result);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Navbar onClick={() => router.push("/add-contact")} title="Phone Book" />
      <ContactFilter
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
            setOffset({ from: 0, to: 10 });
            setContacts(result);
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
          {contacts.general?.slice(offset.from, offset.to).map((val: any) => (
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
            <Pagination
              style={{ textAlign: "right" }}
              total={data?.contact_aggregate.aggregate.count}
              onChange={(page) => {
                setOffset({ from: (page - 1) * 10, to: page * 10 });
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
