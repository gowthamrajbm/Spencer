import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  addExpenseSuccess: false,
  addExpenseFail: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDEXPENSE_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.ADDEXPENSE_SUCCESS:
      return updateObject(state, {
        error: null,
        loading: false,
        addExpenseSuccess: "#" + action.expenseId,
        addExpenseFail: false
      });
    case actionTypes.ADDEXPENSE_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
        addExpenseSuccess: false,
        addExpenseFail: action.error
      });
    default:
      return state;
  }
};

export default reducer;
