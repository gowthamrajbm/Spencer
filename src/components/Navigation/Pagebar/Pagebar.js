import React from "react";
import { connect } from "react-redux";

import PagebarItem from "./PagebarItem/PagebarItem";
import Button from "../../UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import AddExpenseForm from "../../../components/AddExpenseForm/AddExpenseForm";
import * as actions from "../../../store/actions/";

import "./Pagebar.css";

class PageBar extends React.Component {
  state = {
    addingExpense: false,
    loading: false
  };

  addExpenseClosedHandler = () => {
    this.setState({ addingExpense: false });
  };

  showExpenseModalHandler = () => {
    this.setState({ addingExpense: true });
  };

  render() {
    return (
      <div className="Pagebar">
        <ul>
          <PagebarItem />
        </ul>
        <Button btnType="Classic" clicked={this.showExpenseModalHandler}>
          Add New
        </Button>
        <Modal
          show={this.state.addingExpense || this.state.loading}
          modalClosed={this.addExpenseClosedHandler}
        >
          <AddExpenseForm
            cancelled={this.addExpenseClosedHandler}
            added={this.props.onExpenseAdded}
            loading={this.props.loading}
            success={this.props.success}
            fail={this.props.fail}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.expense.loading,
    success: state.expense.addExpenseSuccess,
    fail: state.expense.addExpenseFail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onExpenseAdded: formData => dispatch(actions.addExpense(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageBar);
