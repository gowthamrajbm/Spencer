import React, { Component } from "react";

import "./ButtonDropDown.css";

class ButtonDropDown extends Component {
  state = {
    showMenu: false
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  };

  render() {
    return (
      <div
        className="ButtonDropDown"
        ref={element => {
          this.dropdownMenu = element;
        }}
      >
        <span onClick={this.showMenu}>{this.props.button}</span>

        {this.state.showMenu ? <div>{this.props.children}</div> : null}
      </div>
    );
  }
}

export default ButtonDropDown;
