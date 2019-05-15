import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Summary from "./containers/Summary/Summary";
import Login from "./containers/Login/Login";
import Expense from "./containers/Expense/Expense";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/";

import "./App.css";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Summary} />
        <Route path="/:expenseId" exact component={Expense} />
      </Switch>
    );
    if (!this.props.loggedIn) {
      if (localStorage.getItem("token")) {
        this.props.checkTokenValidity(
          localStorage.getItem("token"),
          localStorage.getItem("userToken")
        );
      } else {
        routes = <Route path="/" exact component={Login} />;
      }
    }
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    checkTokenValidity: (token, userToken) =>
      dispatch(actions.checkTokenValidity(token, userToken))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);
