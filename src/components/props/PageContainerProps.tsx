import React from "react";
import styled from "@emotion/styled";

interface PageContainerProps {
  children: React.ReactNode;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 180px;
  width: calc(100% - 180px);
  padding: 3rem;
  height: 100vh;
  background-color: #F2F2F2;
`;


const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
