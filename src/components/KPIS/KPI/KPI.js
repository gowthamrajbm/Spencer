import React from "react";

import KPIChart from "../../UI/KPIChart/KPIChart";

import "./KPI.css";

class KPI extends React.Component {
  render() {
    const KPIClass = ["KPI", this.props.className].join(" ");
    return (
      <div className={KPIClass}>
        <div className="KPI-InnerCont">
          <div className="KPI-Chart">
            <small className="KPI-Chart-Title">{this.props.charttitle}</small>
            <KPIChart />
          </div>
          <div className="KPI-Det">
            <strong className="Title">{this.props.title}</strong>
            <small>{this.props.subtitle}</small>
            <h3 className="Value">
              <i className="fa fa-rupee-sign" /> {this.props.value}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default KPI;
