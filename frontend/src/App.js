import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Layout from "./components/common/layout/Content";

import LandingPage from "./components/LandingPage";

import Users from "./components/user/Users";
import AddUser from "./components/user/AddUser";
import UpdateUser from "./components/user/UpdateUser";

import Activities from "./components/activity/Activities";
import AddActivity from "./components/activity/AddActivity";
import UpdateActivity from "./components/activity/UpdateActivity";

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
