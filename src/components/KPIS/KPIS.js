import React, { useState, useEffect } from "react";
import axios from "../../axios-spencer";
import KPI from "./KPI/KPI";

import "./KPIS.css";

const kpis = props => {
  let [kpiData, setKPIData] = useState([]);

  if (kpiData.length === 0) {
    const loadKpiData = [
      {
        title: "Total Expenses",
        value: 0,
        subTitle: "loading",
        chartTitle: "Trend"
      },
      {
        title: "Monthly Expenses",
        value: 0,
        subTitle: "loading",
        chartTitle: "Trend"
      },
      {
        title: "User 1 Expenses",
        value: 0,
        subTitle: "loading",
        chartTitle: "Trend"
      },
      {
        title: "User 2 Expenses",
        value: 0,
        subTitle: "loading",
        chartTitle: "Trend"
      }
    ];
    setKPIData(loadKpiData);
  }

  useEffect(() => {
    axios
      .get("/?a=getKPIs")
      .then(res => {
        if (res.data.status === "success") setKPIData(res.data.data);
        else alert("Error");
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const colorClass = ["", "KPI-O", "KPI-B", "KPI-Y"];

  return (
    <div className="KPIS">
      {kpiData.map((data, i) => {
        return (
          <KPI
            className={colorClass[i]}
            title={data.title}
            value={data.value}
            subTitle={data.subTitle}
            chartTitle={data.chartTitle}
          />
        );
      })}
    </div>
  );
};

export default kpis;
