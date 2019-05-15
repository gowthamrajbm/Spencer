import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-spencer";
import "./AddExpenseForm.css";
import Input from "../../components/UI/Input/Input";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class AddExpenseForm extends Component {
  state = {
    expenseForm: {
      amt: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Expense Amount"
        },
        value: "",
        validation: {
          required: true,
          isNumber: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      expenseFor: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Expense For"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      type: {
        elementType: "select",
        elementConfig: {
          placeholder: "Payment Type",
          options: [
            { value: "legal", displayValue: "Legal" },
            { value: "technology", displayValue: "Technology" },
            { value: "operations", displayValue: "Operations" },
            { value: "marketing", displayValue: "Marketing" }
          ]
        },
        value: "legal",
        valid: true,
        touched: false
      },
      desc: {
        elementType: "textarea",
        elementConfig: {
          placeholder: "Description"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      },
      bill: {
        elementType: "input",
        elementConfig: {
          type: "file",
          placeholder: "Expense bill"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        shouldValidate: true,
        touched: false
      },
      paidDate: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Expense paid date (DD/MM/YY)"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      status: {
        elementType: "select",
        elementConfig: {
          placeholder: "Payment Status",
          options: [
            { value: "paid", displayValue: "Paid" },
            { value: "progress", displayValue: "In Progress" },
            { value: "unpaid", displayValue: "Unpaid" }
          ]
        },
        value: "paid",
        valid: true,
        touched: false
      }
    },
    formIsvalid: false,
    files: []
  };

  addExpenseHandler = event => {
    event.preventDefault();
    const expenseData = new FormData();

    for (let dataID in this.state.expenseForm) {
      expenseData.append(dataID, this.state.expenseForm[dataID].value);
    }
    const files = this.state.files;

    files.forEach((file, i) => {
      expenseData.append(i, file);
    });
    expenseData.append("token", localStorage.getItem("token"));
    expenseData.append("userToken", localStorage.getItem("userToken"));
    console.log(expenseData.values);
    this.props.added(expenseData);
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isNumber) {
      isValid = !isNaN(value.trim());
    }

    if (rules.isEmail) {
      isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        value.trim()
      );
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    const updatedexpenseForm = {
      ...this.state.expenseForm
    };
    const updatedFormElement = {
      ...updatedexpenseForm[id]
    };
    if (updatedFormElement.elementConfig.type === "file") {
      const files = Array.from(event.target.files);
      this.setState({ files: files });
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedexpenseForm[id] = updatedFormElement;

    let formValid = true;
    for (let id in updatedexpenseForm) {
      formValid = updatedexpenseForm[id].valid && formValid;
    }
    this.setState({ expenseForm: updatedexpenseForm, formIsValid: formValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.expenseForm) {
      formElementsArray.push({
        id: key,
        config: this.state.expenseForm[key]
      });
    }

    let form = (
      <form onSubmit={this.addExpenseHandler}>
        {this.props.loading ? (
          <span className="Form-Submitting">
            <Spinner />
          </span>
        ) : (
          <span />
        )}
        {this.props.success ? (
          <div className="Form-Alert Success">
            Expense added. {this.props.success}
          </div>
        ) : (
          <span />
        )}
        {this.props.fail ? (
          <div className="Form-Alert Danger">
            Failed to add Expense. {this.props.fail}
          </div>
        ) : (
          <span />
        )}
        {formElementsArray.map(formElement => (
          <div>
            <Input
              key={formElement.id}
              elementType={formElement.config["elementType"]}
              elementConfig={formElement.config["elementConfig"]}
              value={formElement.config["value"]}
              valid={formElement.config["valid"]}
              shouldValidate={formElement.config.validation}
              touched={formElement.config["touched"]}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
            {formElement.config["valid"]}
          </div>
        ))}
        <div className="SEF-Footer">
          <Button
            btnType="Classic-o"
            type="reset"
            clicked={this.props.cancelled}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            btnType="Classic"
            disabled={!this.state.formIsValid}
          >
            Add Expense
          </Button>
        </div>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4 className="SEF-Header">New Expense </h4>
        {form}
      </div>
    );
  }
}

export default withErrorHandler(AddExpenseForm, axios);
