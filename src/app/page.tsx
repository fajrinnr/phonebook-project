"use client";
import { useState } from "react";
import { Pagination } from "antd";
import { gql, useQuery } from "@apollo/client";

import ContactCard from "@/components/ContactCard";
import ContactFilter from "@/components/ContactFilter";
import Navbar from "@/components/Navbar";

const query = gql`
  query contact_aggregate($limit: Int, $offset: Int, $where: contact_bool_exp) {
    contact_aggregate(limit: $limit, offset: $offset, where: $where) {
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
  const [contacts, setContacts] = useState([]);
  const { data, loading, refetch } = useQuery(query, {
    onCompleted: (value) => {
      setContacts(value.contact_aggregate.nodes);
    },
  });

  return (
    <div>
      <Navbar onClick={() => console.log("create")} />
      <ContactFilter
        onSearch={async (res) => {
          if (res.category === "name") {
            const arrValue = res.value.split(" ");
            await refetch({
              where: {
                _or: [
                  { first_name: { _iregex: arrValue[0] } },
                  { last_name: { _iregex: arrValue[arrValue.length - 1] } },
                ],
              },
            }).then((value) => {
              setContacts(value.data.contact_aggregate.nodes);
            });
          } else {
            await refetch({
              where: {
                phones: {
                  number: {
                    _iregex: res.value,
                  },
                },
              },
            }).then((value) => {
              setContacts(value.data.contact_aggregate.nodes);
            });
          }
        }}
      />
      {!loading ? (
        <>
          Favorites
          {contacts.slice(0, 10).map((val: any) => (
            <ContactCard data={val} key={val.id} />
          ))}
          {data?.contact_aggregate.aggregate.count > 10 && (
            <Pagination
              style={{ textAlign: "right" }}
              total={data?.contact_aggregate.aggregate.count}
              onChange={(page) => {
                const offset = (page - 1) * 10;
                console.log(offset, page * 10);
                setContacts(
                  data?.contact_aggregate?.nodes?.slice(offset, page * 10)
                );
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
