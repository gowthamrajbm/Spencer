import React from "react";

import KPIS from "../../components/KPIS/KPIS";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import FilterPane from "../../components/FilterPane/FilterPane";
import SpenceTable from "../../components/SpenceTable/SpenceTable";

import "./Summary.css";

const infinite = "Infinite Scrolling";

class Summary extends React.Component {
  render() {
    return (
      <div className="Summary">
        <KPIS />
        <FilterPane
          cancelled={this.filterClosedHandler}
          applied={this.filtersAppliedHandler}
        />
        <SpenceTable />
      </div>
    );
  }
}

export default Summary;
