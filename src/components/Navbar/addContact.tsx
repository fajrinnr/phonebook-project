"use client";
import { PlusCircleFilled } from "@ant-design/icons";
import { StyledAddConContainer, StyledContainer } from "./styled";
import { Button } from "antd";

interface NavbarProps {
  cancelButton?: {
    onClick?: () => void;
  };
  saveButton?: {
    onClick?: () => void;
    disabled?: boolean;
  };
  title: string | React.ReactNode;
}

export default function Navbar(props: NavbarProps) {
  return (
    <StyledAddConContainer>
      {props.cancelButton?.onClick && (
        <Button
          type="link"
          onClick={props.cancelButton?.onClick}
          style={{ padding: 0, fontSize: "20px", fontWeight: "600" }}
        >
          Cancel
        </Button>
      )}
      <h1 style={{ fontSize: "28px" }}>{props.title}</h1>
      {props.saveButton?.onClick && (
        <Button
          type="link"
          onClick={props.saveButton?.onClick}
          disabled={props.saveButton.disabled}
          style={{ padding: 0, fontSize: "20px", fontWeight: "600" }}
        >
          Save
        </Button>
      )}
    </StyledAddConContainer>
  );
}
