import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #1a1f24;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  margin: 20px 0;
`;

export const StyledContainerContact = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  .phones {
    font-family: Poppins Italic;
    opacity: 0.5;
  }
`;

export const StyledName = styled.p`
  font-family: Poppins Bold;
`;
