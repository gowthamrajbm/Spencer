import React, { Component } from "react";

import "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log("Modal updated");
  }

  render() {
    return (
      <Aux>
        <div
          className="Modal-Cont"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
          <div className="Modal" onClick={this.props.modalRetained}>
            {this.props.children}
          </div>
        </div>
      </Aux>
    );
  }
}

export default modal;
