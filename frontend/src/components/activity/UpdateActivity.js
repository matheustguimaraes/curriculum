import axios from "axios";
import React, { Component } from "react";

import { Button, Container, LinkContainer } from "../common/layout/Layout";
import {
  HeaderForm,
  HeaderInput,
  OuterContainer,
  Description,
} from "../common/layout/Form";

class UpdateActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: "http://localhost:8080",
      activity: "",
      userId: "",
      data: [],
      activityId: "",
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const userId = url.substr(url.lastIndexOf("/") + 1);

    axios
      .get(`${this.state.apiURL}/activity/${userId.toString()}`)
      .then((response) =>
        this.setState({
          activityId: userId,
          userId: response.data.user,
          activity: response.data.activity,
          data: response.data,
          isLoaded: true,
        })
      )
      .catch((error) => {
        console.log(error.response);
      });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .put(`${this.state.apiURL}/activity/${this.state.activityId}`, {
        user: this.state.userId,
        activity: this.state.activity,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    console.log("update act", this.state);
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
      <OuterContainer>
        <Container>
          <Button>
            <LinkContainer to={`/user/${this.state.userId.toString()}`}>
              voltar
            </LinkContainer>
          </Button>

          <HeaderForm onSubmit={this.handleSubmit}>
            <Description htmlFor="activity">Atividade</Description>
            <HeaderInput
              id="activity"
              placeholder={this.state.activity}
              name="activity"
              type="text"
              value={this.state.activity}
              onChange={this.handleChange("activity")}
            />
            <br />
            <Button>adicionar</Button>
          </HeaderForm>
        </Container>
      </OuterContainer>
    );
  }
}

export default UpdateActivity;
