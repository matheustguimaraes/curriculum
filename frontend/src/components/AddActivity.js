import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { Button, Container, LinkContainer } from "./common/layout/Layout";

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: "http://localhost:8080",
      activity: "",
      userId: "",
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const userId = url.substr(url.lastIndexOf("/") + 1);

    this.setState({
      userId: parseInt(userId),
      isLoaded: true,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post(`${this.state.apiURL}/activity`, {
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
            <Description htmlFor="activity">Nome da atividade</Description>
            <HeaderInput
              id="activity"
              name="activity"
              type="text"
              value={this.state.activity}
              onChange={this.handleChange("activity")}
            />

            {/* <Description htmlFor="type">
              Tipo de processo (app ou camera)
            </Description>
            <HeaderInput
              id="type"
              name="type"
              type="text"
              value={this.state.type}
              onChange={this.handleChange("type")}
            /> */}
            <br />
            <Button>adicionar</Button>
          </HeaderForm>
        </Container>
      </OuterContainer>
    );
  }
}

export default AddActivity;

const HeaderForm = styled.form`
  flex-direction: row;
`;

const HeaderInput = styled.input`
  line-height: 35px;
  width: 100%;
  text-align: left;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-radius: 4px;
  outline: 0px;
`;

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Description = styled.p`
  padding: 0;
  margin-bottom: 1rem;
`;
