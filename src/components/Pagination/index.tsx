import styled from "@emotion/styled";
import { Pagination } from "antd";

const StyledPagination = styled(Pagination)`
  .ant-pagination-item-active {
    background-color: #fff;
    border-color: #1a1f24;
    border: 2px solid #1a1f24;
  }
  li:hover {
    background-color: #fff !important;
    opacity: 0.5;
    button {
      color: black !important;
    }
    a {
      color: black;
    }
  }

  .ant-pagination-item a {
    color: white;
  }
  .ant-pagination-item-active a {
    color: #1a1f24;
  }

  .ant-pagination-item-link {
    color: white !important;
  }
`;

export default StyledPagination;
