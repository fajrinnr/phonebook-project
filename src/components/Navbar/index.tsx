"use client";
import { PlusCircleFilled } from "@ant-design/icons";
import { StyledContainer } from "./styled";

interface NavbarProps {
  onClick?: () => void;
  title: string | React.ReactNode;
}

export default function Navbar(props: NavbarProps) {
  return (
    <StyledContainer>
      <h1>{props.title}</h1>
      {props.onClick && (
        <PlusCircleFilled
          style={{ fontSize: "40px" }}
          onClick={props.onClick}
        />
      )}
    </StyledContainer>
  );
}
