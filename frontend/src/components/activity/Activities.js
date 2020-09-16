import React, { Component } from "react";
import axios from "axios";

import { Button, LinkContainer } from "../common/layout/Layout";
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

export default UserActivities;
