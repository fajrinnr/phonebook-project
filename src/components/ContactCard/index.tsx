"use client";
import { useRouter } from "next/navigation";
import {
  StarOutlined,
  StarFilled,
  EditFilled,
  DeleteFilled,
  BarsOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, message } from "antd";

import { StyledContainer, StyledContainerContact } from "./styled";
import useMutationDeleteContact from "@/hooks/useMutationDeleteContact";

interface ContactCardProps {
  data: {
    first_name: string;
    last_name: string;
    id: number;
    phones: {
      number?: string;
      id?: number;
    }[];
  };
  onChangeFav?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function ContactCard(props: ContactCardProps) {
  const {
    data: { first_name = "", last_name = "", id = 0, phones = [{}] },
    onChangeFav = () => null,
    onDelete = () => null,
    onClick = () => null,
  } = props;
  //#region HOOKS
  const router = useRouter();
  const { deleteContact, loading: loadingDelete } = useMutationDeleteContact({
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
    onCompleted: () => {
      router.refresh();
    },
  });
  //#endregion HOOKS

  //#region CONSTANTS
  const favorited = JSON.parse(
    localStorage.getItem("favoritesContact") || "[]"
  ).includes(id);

  const items: MenuProps["items"] = [
    {
      label: favorited ? "Unfavorite" : "Favorite",
      key: "1",
      icon: favorited ? (
        <StarOutlined style={{ color: "#F5E9A9" }} />
      ) : (
        <StarFilled style={{ color: "#F5E9A9" }} />
      ),
      onClick: (e) => {
        e.domEvent.stopPropagation();
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
      label: "Edit",
      key: "2",
      icon: <EditFilled />,
      onClick: async (e) => {
        e.domEvent.stopPropagation();
        router.push(`/edit-contact/${id}`);
      },
    },
    {
      type: "divider",
    },
    {
      label: "Delete",
      key: "3",
      icon: <DeleteFilled />,
      danger: true,
      disabled: loadingDelete,
      onClick: async (e) => {
        e.domEvent.stopPropagation();
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
  //#endregion CONSTANTS

  return (
    <StyledContainer onClick={onClick}>
      <Avatar
        style={{
          backgroundColor: "#f56a00",
          verticalAlign: "middle",
          marginRight: "10px",
        }}
        size={45}
        data-testid="test-avatar"
      >
        {first_name[0]?.toUpperCase()}
      </Avatar>
      <StyledContainerContact>
        <div>
          <p>{`${first_name} ${last_name}`}</p>
          <span className="phones">
            {phones.length > 1
              ? `${phones[0]?.number}, +${phones.length - 1} more`
              : phones[0]?.number}
          </span>
        </div>

        <Dropdown menu={{ items }}>
          <Button
            shape="circle"
            icon={<BarsOutlined />}
            onClick={(e) => e.stopPropagation()}
            data-testid="test-dropdown-button"
          />
        </Dropdown>
      </StyledContainerContact>
    </StyledContainer>
  );
}
