import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = props => {
  const attachedClasses = ["SideDrawer", !props.opened ? "Close" : ""].join(
    " "
  );

  return (
    <Aux>
      {/*<BackDrop
        show={props.opened}
        clicked={props.closed}
      />*/}
      <div className={attachedClasses}>
        <div className="Logo">
          <strong>Spencer</strong>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
