import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

import LandingPage from "./components/LandingPage";

import Users from "./components/Users";
import Activities from "./components/Activities";

import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";

import AddActivity from "./components/AddActivity";
import UpdateActivity from "./components/UpdateActivity";

import Page404 from "./components/Page404";

function App() {
  let routes = (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/user" component={Users} />
        <Route path="/user/:id" component={Activities} />

        <Route exact path="/add" component={AddUser} />
        <Route path="/add/activity/:id" component={AddActivity} />

        <Route path="/activity/:id" component={UpdateActivity} />
        <Route path="/update/:id" component={UpdateUser} />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
