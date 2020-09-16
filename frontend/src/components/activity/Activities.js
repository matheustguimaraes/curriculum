import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import { Button, LinkContainer } from "../common/layout/Layout";

class UserActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: "http://localhost:8080",
      name: "",
      isLoaded: false,
      data: [],
      userId: "",
    };
    this.canvasRef = React.createRef();
  }

  deleteService = (name) => (event) => {
    axios
      .delete(`${this.state.apiURL}/activity/` + name)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  componentDidMount() {
    const url = window.location.href;
    const userId = url.substr(url.lastIndexOf("/") + 1);

    axios
      .get(`${this.state.apiURL}/activity`)
      .then((response) =>
        this.setState({
          data: response.data,
          isLoaded: true,
          userId: parseInt(userId),
        })
      )
      .catch((error) => {
        console.log(error.response);
      });

    axios
      .get(`${this.state.apiURL}/user/${userId}`)
      .then((response) =>
        this.setState({
          name: response.data.name,
        })
      )
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    console.log("activities", this.state);
    if (!this.state.isLoaded) {
      return <b>loading</b>;
    }

    return (
      <div>
        <Wrapper as={Container} id="projects">
          <h1>Atividades de {this.state.name}</h1>
          <Button>
            <LinkContainer to={`/update/${this.state.userId}`}>
              editar usuário
            </LinkContainer>
          </Button>
          <Grid>
            {this.state.data.map((value, index) =>
              parseInt(value.user) === this.state.userId ? (
                <Item key={index}>
                  <Card>
                    <Content>
                      <LinkContainer to={`/activity/${this.state.userId}`}>
                        <h4>{value.activity}</h4>
                      </LinkContainer>
                    </Content>
                    <Stats>
                      <form onSubmit={this.deleteService(this.state.userId)}>
                        <div>
                          <ButtonDelete>excluir</ButtonDelete>
                        </div>
                      </form>
                    </Stats>
                  </Card>
                </Item>
              ) : (
                ""
              )
            )}
          </Grid>
          <Button>
            <LinkContainer to={`/add/activity/${this.state.userId}`}>
              adicionar atividade
            </LinkContainer>
          </Button>
          <br />
          <br />
          <Button>
            <LinkContainer to="/">voltar</LinkContainer>
          </Button>
          <br />
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

export default UserActivities;
