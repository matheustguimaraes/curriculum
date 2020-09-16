import React from "react";
import styled from "styled-components";

const ContentStyled = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`;

const Content = ({ children }) => {
  return (
    <ContentStyled>
      <main>{children}</main>
    </ContentStyled>
  );
};

export default Content;
