import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import axios from "../../axios-spencer";
import * as actions from "../../store/actions";
import "./SpenceTable.css";
import Table from "../UI/Table/Table";

const SpenceTable = props => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    const filter = props.filter; 
    const formData = new FormData(); 
    axios
      .post("/?a=allExpenses", formData)
      .then(response => {
        const expenseArray = response.data;
        console.log(expenseArray);
        makeDataLevel(expenseArray);
        props.onFilterEnd();
      })
      .catch(error => {
        console.log(error);
        props.onFilterEnd();
      });
  }, [props.expenseAdded, props.filter]);

  const [columns] = useState([
    {
      Header: "#",
      accessor: (row, index) => index + 1,
      width: 70
    },
    {
      Header: "ID",
      accessor: "pid",
      minWidth: 100,
      maxWidth: 140,
      Cell: row => <Link to={"/" + row.value}><a>#{row.value}</a></Link>
      /*Filter: header => {
        return (
          <Input
            placeholder='Search...  eg. "room"...'
            value={header.filterValue || ""}
            onChange={e => header.setFilter(e.target.value)}
          />
        );
      }*/
    },
    {
      Header: "Amount",
      accessor: "amt",
      width: 80,
      aggregate: "sum"
    },
    {
      Header: "Expense for",
      accessor: "expense",
      minWidth: 140,
      maxWidth: 200
    },
    {
      Header: "Desc.",
      accessor: "description",
      minWidth: 180,
      maxWidth: 250
    },
    {
      Header: "Type",
      accessor: "type",
      minWidth: 140,
      maxWidth: 200
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 140,
      Cell: row => (
        <span>
          <span
            style={{
              color:
                row.value === "unpaid"
                  ? "#ff2e00"
                  : row.value === "progress"
                  ? "#ffbf00"
                  : "#57d500",
              transition: "all .5s ease"
            }}
          >
            &#x25cf;
          </span>{" "}
          {row.value === "unpaid"
            ? "Unpaid"
            : row.value === "progress"
            ? `In Progress`
            : "Paid"}
        </span>
      )
    },
    {
      Header: "Date.",
      accessor: "date",
      minWidth: 140,
      maxWidth: 200
    }
  ]);

  const newExpense = expense => {
    return {
      pid: expense["expense_id"],
      amt: expense["amount"],
      expense: expense["expensefor"],
      description: expense["description"],
      type: expense["type"],
      status: expense["status"],
      date: expense["date"]
    };
  };

  const makeDataLevel = expenses => {
    const data = expenses.map((expense, i) => {
      return {
        ...newExpense(expense)
      };
    });
    setData(data);
  };

  return (
    <div className="SpenceTable">
      <Table
        className=""
        {...{
          data,
          columns,
          debug: true
        }}
      />
    </div>
  );
};

const mapStateWithProps = state => {
  return {
    expenseAdded: state.expense.addExpenseSuccess,
    filter: state.filter.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterEnd: () => dispatch(actions.endFilter())
  }
}

export default connect(
  mapStateWithProps,
  mapDispatchToProps
)(SpenceTable);
