"use client";
import { useRouter } from "next/navigation";
import {
  StarOutlined,
  StarFilled,
  DownOutlined,
  EditFilled,
  DeleteFilled,
  BarsOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, message } from "antd";
import { StyledContainer, StyledContainerContact } from "./styled";
import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation delete_contact($where: contact_bool_exp!) {
    delete_contact(where: $where) {
      returning {
        id
      }
    }
  }
`;

interface ContactCardProps {
  data: {
    first_name: string;
    last_name: string;
    id: number;
    phones: {
      number: number;
    }[];
  };
  onChangeFav?: () => void;
  onDelete?: () => void;
}

export default function ContactCard(props: ContactCardProps) {
  const {
    data: { first_name = "", last_name = "", id = 0, phones = [{ number: 0 }] },
    onChangeFav = () => null,
    onDelete = () => null,
  } = props;
  const router = useRouter();
  const [deleteContact, { error, data }] = useMutation(mutation, {
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
    onCompleted: () => {
      if (router) router.refresh();
    },
  });

  const favorited = JSON.parse(
    localStorage.getItem("favoritesContact") || "[]"
  ).includes(id);

  const items: MenuProps["items"] = [
    {
      label: favorited ? "Remove from Favorites" : "Add to Favorites",
      key: "1",
      icon: favorited ? (
        <StarOutlined style={{ color: "#F5E9A9" }} />
      ) : (
        <StarFilled style={{ color: "#F5E9A9" }} />
      ),
      onClick: () => {
        const favoritesContact = JSON.parse(
          localStorage.getItem("favoritesContact") as string
        );
        if (favorited) {
          const newArr = favoritesContact?.filter(
            (contact: any) => contact !== id
          );
          localStorage.setItem("favoritesContact", JSON.stringify(newArr));
          message.success("Successfully remove contact to favorite!");
        } else {
          const newArr = favoritesContact || [];
          newArr.push(id);
          localStorage.setItem("favoritesContact", JSON.stringify(newArr));
          message.success("Successfully add contact to favorite!");
        }
        onChangeFav();
      },
    },
    {
      type: "divider",
    },
    {
      label: "Update",
      key: "2",
      icon: <EditFilled />,
      onClick: () => console.log("Update"),
    },
    {
      type: "divider",
    },
    {
      label: "Delete",
      key: "3",
      icon: <DeleteFilled />,
      danger: true,
      onClick: async () => {
        try {
          await deleteContact();
          message.success(
            `Successfully delete ${first_name} ${last_name} from contacts`
          );
          onDelete();
        } catch (error) {}
      },
    },
  ];
  return (
    <StyledContainer>
      <Avatar
        style={{
          backgroundColor: "#f56a00",
          verticalAlign: "middle",
          marginRight: "10px",
        }}
        size={45}
      >
        {first_name[0].toUpperCase()}
      </Avatar>
      <StyledContainerContact>
        <div>
          <p>{`${first_name} ${last_name}`}</p>
          <span>{phones[0].number}</span>
        </div>

        <Dropdown menu={{ items }}>
          <Button shape="circle" icon={<BarsOutlined />} />
        </Dropdown>
      </StyledContainerContact>
    </StyledContainer>
  );
}
