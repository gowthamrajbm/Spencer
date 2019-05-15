import React from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/";

import "./Login.css";

class Login extends React.Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        shouldValidate: true,
        touched: false
      }
    },
    formIsvalid: false
  };

  /*loginHandler = event => {
    event.preventDefault();
    const formData = {};

    for (let dataID in this.state.loginForm) {
      formData[dataID] = this.state.loginForm[dataID].value;
    }
    const order = {
      order: {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData
      }
    };
    let orderParams = new URLSearchParams();
    orderParams.append("order", JSON.stringify(order));
    this.props.onOrderBurger(orderParams);
  };*/

  submitHandler = event => {
    event.preventDefault();
    this.props.onLogin(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value
    );
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
    const updatedloginForm = {
      ...this.state.loginForm
    };
    const updatedFormElement = {
      ...updatedloginForm[id]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedloginForm[id] = updatedFormElement;

    let formValid = true;
    for (let id in updatedloginForm) {
      formValid = updatedloginForm[id].valid && formValid;
    }
    this.setState({ loginForm: updatedloginForm, formIsValid: formValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }
    let form = (
      <form onSubmit={this.submitHandler}>
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
        <div className="LF-Footer">
          <Button
            type="submit"
            btnType="Classic Classic-L"
            disabled={!this.state.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className="Login">
        <h3>Spencer</h3>
        <div className="Login-Card">{form}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.login.loading,
    error: state.login.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
