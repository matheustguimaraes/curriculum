import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { Button, Container, LinkContainer } from "./common/layout/Layout";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: "http://localhost:8080",
      firstName: "",
      email: "",
      address: "",
      number: "",
      userId: "",
      data: [],
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const userId = url.substr(url.lastIndexOf("/") + 1);

    axios
      .get(`${this.state.apiURL}/user/${userId}`)
      .then((response) =>
        this.setState({
          firstName: response.data.name,
          email: response.data.email,
          address: response.data.address,
          number: response.data.number,
          data: response.data,
          userId: userId,
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
      .put(`${this.state.apiURL}/user/${this.state.userId}`, {
        name: this.state.firstName,
        email: this.state.email,
        address: this.state.address,
        number: this.state.number,
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
            <Description htmlFor="firstName">Nome</Description>
            <HeaderInput
              id="firstName"
              placeholder={this.state.firstName}
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange("firstName")}
            />

            <Description htmlFor="email">email</Description>
            <HeaderInput
              id="email"
              placeholder={this.state.email}
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />

            <Description htmlFor="email">address</Description>
            <HeaderInput
              id="address"
              placeholder={this.state.address}
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleChange("address")}
            />

            <Description htmlFor="email">number</Description>
            <HeaderInput
              id="number"
              placeholder={this.state.number}
              name="number"
              type="text"
              value={this.state.number}
              onChange={this.handleChange("number")}
            />

            <br />
            <Button>adicionar</Button>
          </HeaderForm>
        </Container>
      </OuterContainer>
    );
  }
}

export default UpdateUser;

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
