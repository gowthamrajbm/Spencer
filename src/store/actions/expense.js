import axios from "../../axios-spencer";

import * as actionTypes from "./actionTypes";

export const addExpenseStart = () => {
  return {
    type: actionTypes.ADDEXPENSE_START
  };
};

export const addExpenseSuccess = expenseId => {
  return {
    type: actionTypes.ADDEXPENSE_SUCCESS,
    expenseId: expenseId
  };
};

export const addExpenseFail = error => {
  return {
    type: actionTypes.ADDEXPENSE_FAIL,
    error: error
  };
};

export const addExpense = formData => {
  return dispatch => {
    let addExpenseParams = new URLSearchParams();
    addExpenseParams.append("data", formData);

    dispatch(addExpenseStart());
    axios
      .post("/?a=addExpense", formData)
      .then(response => {
        console.log(response);
        if (response.data.uploaded === "success")
          dispatch(addExpenseSuccess(response.data.expenseId));
        else dispatch(addExpenseFail("Upload failed"));
      })
      .catch(error => {
        console.log(error);
        dispatch(addExpenseFail("Network error"));
      });
  };
};
