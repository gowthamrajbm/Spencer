import axios from "../../axios-spencer";

import * as actionTypes from "./actionTypes";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (token, userToken) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userToken: userToken
  };
};

export const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const tokenValidityFail = () => {
  return {
    type: actionTypes.LOGINVALIDITY_FAIL
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const login = (email, password) => {
  return dispatch => {
    let loginParams = new URLSearchParams();
    loginParams.append("email", email);
    loginParams.append("password", password);

    dispatch(loginStart());
    axios
      .post("/?a=login", loginParams)
      .then(response => {
        if (response.data.loginstatus === "success") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userToken", response.data.userToken);
          dispatch(loginSuccess(response.data.token, response.data.userToken));
        } else dispatch(loginFail("Login Failed"));
      })
      .catch(error => {
        dispatch(loginFail(error.message));
      });
  };
};

export const checkTokenValidity = (token, userToken) => {
  return dispatch => {
    let tokenParams = new FormData();
    tokenParams.append("token", token);
    tokenParams.append("userToken", userToken);
    dispatch(loginStart());
    axios
      .post("/?a=checkValidity", tokenParams)
      .then(response => {
        if (response.data.tokenValidity !== "invalid") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userToken", response.data.userToken);
          dispatch(loginSuccess(response.data.token, response.data.userToken));
        } else {
          localStorage.clear();
          dispatch(tokenValidityFail());
        }
      })
      .catch(error => {
        localStorage.clear();
        dispatch(tokenValidityFail());
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    dispatch(logoutSuccess());
  };
};
