import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Pagebar from "../../components/Navigation/Pagebar/Pagebar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import * as actions from "../../store/actions";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenedHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    let layout = (
      <div className="Page">
        <SideDrawer
          opened={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <div className="Right-Space">
          <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
          <Pagebar />
          <main className="Content">{this.props.children}</main>
        </div>
      </div>
    );
    if (!this.props.loggedIn) {
      layout = (
        <div className="LO-Page">
          <div className="LO-Cont">
            <main className="LO-Content">{this.props.children}</main>
          </div>
        </div>
      );
    }
    return <Aux>{layout}</Aux>;
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
)(Layout);
