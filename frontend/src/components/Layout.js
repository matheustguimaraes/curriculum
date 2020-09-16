import React from "react";
import styled from "styled-components";

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`;

const Layout = ({ children }) => {
  return (
    <Content>
      <main>{children}</main>
    </Content>
  );
};

export default Layout;
