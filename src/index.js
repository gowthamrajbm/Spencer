import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import loginReducer from "./store/reducers/login";
import expenseReducer from "./store/reducers/expense";
import filterReducer from "./store/reducers/filter";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  login: loginReducer,
  expense: expenseReducer,
  filter: filterReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

/*const logger = store => {
  return next => {
    return action => {
      console.log("middleware", action);
      const result = next(action);
      console.log("middleware next state", store.getState());
      return result;
    };
  };
};*/

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
