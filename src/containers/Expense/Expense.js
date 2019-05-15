import React from "react";

import { Link } from "react-router-dom";
import axios from "../../axios-spencer";
import Button from "../../components/UI/Button/Button";

import "./Expense.css";

class Expense extends React.Component {
  state = {
    expense: {
      id: "xxxx",
      name: "Loading",
      amt: "Loading",
      description: "Loading",
      uploaded: "Loading",
      processed: "Loading",
      bill: null
    }
  };
  //
  componentDidMount() {
    const expenseId = this.props.match.params.expenseId;
    console.log("/?a=getExpense&id=" + expenseId);
    axios
      .get("/?a=getExpense&id=" + expenseId)
      .then(response => {
        const expenseData = response.data;
        console.log(expenseData);
        this.setState({ expense: expenseData });
      })
      .catch(error => {
        console.log("Loading Error", error);
      });
  }

  render() {
    const expense = this.state.expense;
    const bills =
      expense.bills !== "" ? (
        <p>
          <a href={"https://classix.xyz/spencer/data/" + expense.bill}>
            One Bill
          </a>{" "}
          attached
        </p>
      ) : (
        <p>No bills attached</p>
      );
    return (
      <div className="Expense-Outer">
        <div className="Expense-Inner">
          <div className="Expense-Tools">
            <Link to="/">
              <Button btnType="Classic-o">Home</Button>
            </Link>
            <Button btnType="Classic-o">Print</Button>
          </div>
          <div className="Expense-Cont">
            <div className="Expense-Head">
              <span className="Expense-Status" />
              <div className="Expense-Id">
                <h3>#{expense.id}</h3>
                <span>UPLOADED - {expense.uploaded}</span>
              </div>
            </div>
            <div className="Expense-Body">
              <div className="Expense-Row">
                <div className="Expense-Detcell">
                  <p>Expense For</p>
                  <span>{expense.name}</span>
                </div>
                <div className="Expense-Detcell">
                  <p>Amt.</p>
                  <h4>Rs. {expense.amt}</h4>
                </div>
              </div>
              <div className="Expense-Row">
                <div className="Expense-Detcell">
                  <p>Expense Desc.</p>
                  <span>Expense {expense.description}</span>
                </div>
              </div>
              <div className="Expense-Row">
                <div className="Expense-Detcell">
                  <p>Expense Processed</p>
                  <span>{expense.processed}</span>
                </div>
              </div>
            </div>
            <div className="Expense-Foot">{bills}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Expense;
