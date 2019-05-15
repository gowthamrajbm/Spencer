import React from "react";

import "./ToolbarItem.css";

const toolbarItem = props => (
  <div className="ToolbarItem">{props.children}</div>
);

export default toolbarItem;
