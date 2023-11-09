"use client";
import { PlusCircleFilled } from "@ant-design/icons";
import { StyledContainer } from "./styled";

interface NavbarProps {
  onClick: () => void;
}

export default function Navbar(props: NavbarProps) {
  return (
    <StyledContainer>
      <h1>Phone Book</h1>
      <PlusCircleFilled style={{ fontSize: "40px" }} onClick={props.onClick} />
    </StyledContainer>
  );
}
