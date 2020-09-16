import React, { Component } from "react";
// import PropTypes from "prop-types"
// import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components";
import { Button, LinkContainer } from "./common/layout/Layout";

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

const Description = styled.p`
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

const NameHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0;
`;

class LandingPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Container>
          <NameHeader>
            Bem vindo ao sistema de gerenciamento InsightLab
          </NameHeader>
          <Description>
            <b>Clique aqui para ver os usuários cadastrados</b> {` `}
          </Description>
          <Button>
            <LinkContainer to={`/user`}>usuários</LinkContainer>
          </Button>
        </Container>
      </OuterContainer>
    );
  }
}

export default LandingPage;
