import React from "react";

import "./Toolbar.css";
import ToolbarItems from "./ToolbarItems/ToolbarItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="Logo-cont">
      <h4>Spencer</h4>
    </div>
    <nav>
      <ToolbarItems />
    </nav>
  </header>
);

export default toolbar;
