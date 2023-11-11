import styled from "@emotion/styled";
import { Form } from "antd";

export const StyledAddConContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    font-family: Poppins Bold;
    color: #ffffff;
  }

  button {
    color: #007bfe;
  }
  button:disabled {
    color: #ffffff;
    opacity: 0.3;
  }
`;

export const StyledForm = styled(Form)`
  .ant-form-item-control-input-content {
    display: flex;
  }
  label {
    color: #ffffff !important;
  }

  font-family: Poppins !important;

  input:disabled {
    background-color: #ffffff;
    opacity: 0.2;
    color: #53585c;
  }
`;
