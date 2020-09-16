import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <OuterContainer>
    <Container>
      <NameHeader>NOT FOUND</NameHeader>
      <p>Error 404. Page not found</p>
      <Button>
        <LinkContainer to="/">voltar para Home</LinkContainer>
      </Button>
    </Container>
  </OuterContainer>
);

const Container = styled.div`
  text-align: center;
`;

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 78vh;
`;

const NameHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0;
`;

export const LinkContainer = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2.5rem;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #0074d9;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: gray;
  }
  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;

export default NotFoundPage;
