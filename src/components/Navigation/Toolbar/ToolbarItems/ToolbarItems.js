import React from "react";
import { connect } from "react-redux";

import ToolbarItem from "./ToolbarItem/ToolbarItem";
import ButtonDropDown from "../../../UI/ButtonDropDown/ButtonDropDown";
import * as actions from "../../../../store/actions";

import "./ToolbarItems.css";

const toolbarItems = props => (
  <div className="ToolbarItems">
    <ToolbarItem>
      <ButtonDropDown button={<i className="fa fa-user-circle" />}>
        <div className="ButtonDropDownMenu">
          <span className="ButtonDropDownMenuItem" onClick={props.onLogout}>
            <i className="fa fa-power-off" /> Logout
          </span>
        </div>
      </ButtonDropDown>
    </ToolbarItem>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(toolbarItems);
