import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  filter: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_START:
      return updateObject(state, { loading: true });
    case actionTypes.FILTER_ADD:
      return updateObject(state, { filter: action.filters });
    case actionTypes.FILTER_END:
      return updateObject(state, { loading: false });
    default: return state;
  }
}

export default reducer;//