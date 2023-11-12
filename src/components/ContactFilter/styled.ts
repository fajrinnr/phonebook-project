import styled from "@emotion/styled";
import { Input, Select, Space } from "antd";

export const StyledContainer = styled(Space.Compact)`
  width: 100%;

  .select {
    height: 50px;
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

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: #1a1f24;
    color: white;
  }

  .ant-select-selector span {
    font-size: 16px;
    font-weight: 600;
    color: black;
  }
`;

export const StyledInputSearch = styled(Input.Search)`
  input {
    height: 50px;
    font-size: 16px;
    background-color: #1a1f24;
    color: white;
  }

  input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #fff;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #fff;
    opacity: 1;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #fff;
    opacity: 1;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fff;
  }
  input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #fff;
  }

  input::placeholder {
    /* Most modern browsers support this now. */
    color: #fff;
  }
`;
