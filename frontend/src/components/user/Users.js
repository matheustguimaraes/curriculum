import axios from "axios";
import React, { Component } from "react";

import {
  OuterContainer,
  Button,
  LinkContainer,
  Description,
} from "../common/layout/Layout";

import {
  ButtonDelete,
  Wrapper,
  Grid,
  Item,
  Content,
  Stats,
  Container,
  Card,
} from "../common/layout/Grid";

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

export default Users;
