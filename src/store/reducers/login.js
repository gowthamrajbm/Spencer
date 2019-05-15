import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userToken: null,
  error: null,
  loading: false,
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userToken: action.userToken,
        error: null,
        loading: false,
        loggedIn: true
      });
    case actionTypes.LOGIN_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.LOGINVALIDITY_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.LOGOUT:
      return updateObject(state, {
        token: null,
        userToken: null,
        loggedIn: false
      });
    default:
      return state;
  }
};

export default reducer;
