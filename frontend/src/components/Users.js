import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { OuterContainer, Button, LinkContainer } from "./common/layout/Layout";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: "http://localhost:8080",
      isLoaded: false,
      data: [],
    };
  }

  deleteService = (name) => (event) => {
    axios
      .delete(`${this.state.apiURL}/user/` + name)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  componentDidMount() {
    axios
      .get(this.state.apiURL + "/user")
      .then((response) =>
        this.setState({
          data: response.data,
          isLoaded: true,
        })
      )
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    console.log(this.state);

    if (!this.state.isLoaded) {
      return (
        <OuterContainer>
          <Container>
            <Description>loading</Description>
          </Container>
        </OuterContainer>
      );
    }

    return (
      <div>
        <Wrapper as={Container} id="projects">
          {/* <Button>
            <LinkContainer to="/">voltar para Home</LinkContainer>
          </Button> */}
          <h1>Usuários cadastrados</h1>
          <Grid>
            {this.state.data.map((value, index) => (
              <Item key={index}>
                <Card>
                  <Content>
                    <h4>
                      <LinkContainer to={`/user/${value.id}`}>
                        {value.name}
                        <br />
                        <h4>{value.email}</h4>
                        <h4>email: {value.address}</h4>
                        <h4>número: {value.number}</h4>
                      </LinkContainer>
                    </h4>
                  </Content>
                  <Stats>
                    <form onSubmit={this.deleteService(value.id)}>
                      <div>
                        <ButtonDelete>excluir</ButtonDelete>
                      </div>
                    </form>
                  </Stats>
                </Card>
              </Item>
            ))}
          </Grid>
          <Button>
            <LinkContainer to="/add">adicionar usuário</LinkContainer>
          </Button>
        </Wrapper>
      </div>
    );
  }
}

const ButtonDelete = styled.button`
  cursor: pointer;
  //   padding: 3px;
  border-radius: 3px;
  border: none;
  user-select: none;
  color: #fff;
  background: red;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: gray;
  }
`;

const Wrapper = styled.div`
  padding: 2rem 0;
`;

const Grid = styled.div`
  padding: 30px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 8fr;
  gap: 1.2rem 1.2rem;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.11);
  h4 {
    color: ${({ theme }) => (theme === "light" ? "#212121" : "#fff")};
  }
  p {
    color: ${({ theme }) => (theme === "light" ? "#707070" : "#c7c7c7")};
  }
`;

const Content = styled.div`
  padding: 1rem 0;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    &:first-child {
      margin-right: 0.5rem;
    }
    img {
      margin: 0;
    }
    svg path {
      fill: white;
    }
    span {
      color: white;
      margin-left: 0.5rem;
    }
  }
`;

const Container = styled.div`
  margin: auto;
  width: 50%;
  @media (min-width: 601px) {
    width: 90%;
  }
  @media (min-width: 993px) {
    width: 80%;
  }
`;

const Card = styled.div`
  padding: 1rem;
  background: black;
  height: 100%;
`;

const Description = styled.p`
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

export default Users;
