"use client";
import {
  StarOutlined,
  StarFilled,
  DownOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { StyledContainer, StyledContainerContact } from "./styled";

interface ContactCardProps {
  data: {
    first_name: string;
    last_name: string;
    id: number;
    phones: {
      number: number;
    }[];
  };
}

export default function ContactCard(
  props = {
    data: {
      first_name: "",
      last_name: "",
      id: 0,
      phones: [{ number: 0 }],
    },
  }
) {
  const items: MenuProps["items"] = [
    {
      label: "Add to Favorites",
      key: "1",
      icon: <StarFilled style={{ color: "#F5E9A9" }} />,
      onClick: () => console.log("Add to Favorite"),
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
      onClick: () => console.log("Delete"),
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
        {props.data.first_name[0].toUpperCase()}
      </Avatar>
      <StyledContainerContact>
        <div>
          <p>{`${props.data.first_name} ${props.data.last_name}`}</p>
          <span>{props.data.phones[0].number}</span>
        </div>
        {/* <StarOutlined style={{ fontSize: "25px" }} /> */}
        <Dropdown menu={{ items }}>
          <Button>
            Actions
            <DownOutlined />
          </Button>
        </Dropdown>
      </StyledContainerContact>
    </StyledContainer>
  );
}
