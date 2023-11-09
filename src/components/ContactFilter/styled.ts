import styled from "@emotion/styled";
import { Space } from "antd";

export const StyledContainer = styled(Space.Compact)`
  width: 100%;

  .select {
    height: 50px;
  }

  input {
    height: 50px;
    font-size: 18px;
  }
  button {
    height: 50px !important;
  }
  .ant-input-group-addon {
    width: 50px !important;
  }
  .ant-input-group-addon button {
    width: 100% !important;
  }
`;
