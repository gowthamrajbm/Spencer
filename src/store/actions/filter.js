import * as actionTypes from "./actionTypes";

export const filterStart = () => {
  return {
    type: actionTypes.FILTER_START
  }
}

export const filterEnd = () => {
  return {
    type: actionTypes.FILTER_END
  }
}

export const filterAdd = (filters) => {
  return {
    type: actionTypes.FILTER_ADD,
    filters: filters
  }
}

export const filter = (filters) => {
  return dispatch => {
    dispatch(filterStart());
    //console.log(filters);
    dispatch(filterAdd(filters))
  }
}

export const endFilter = () => {
  return dispatch => {
    dispatch(filterEnd());
  }
}