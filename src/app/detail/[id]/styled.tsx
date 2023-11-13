import styled from "@emotion/styled";
import { Avatar } from "antd";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .fullname {
    font-size: 20px;
  }

  .date {
    font-family: Poppins Italic;
    color: #53585c;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;

  button {
    padding: 0;
    font-size: 17px;
    font-weight: 600;
  }

  h1 {
    font-size: 20px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  background-color: #f56a00;
  vertical-align: middle;
  font-size: 70px !important;
  margin: 20px;
`;

export const StyledPhonesContainer = styled.div`
  height: 70vh;
  background-color: #191e22;
  width: 100%;
  border-radius: 50px 50px 0 0;
  padding: 50px;
  margin-top: 20px;
`;
