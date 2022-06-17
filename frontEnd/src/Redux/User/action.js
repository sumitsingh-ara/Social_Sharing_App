import * as types from "./actionTypes";
import Axios from "axios";

export const userDetailsSuccess = (payload) => {
  return {
    type: types.USER_DETAILS_SUCCESS,
    payload,
  };
};

export const userDataLoading = () => (dispatch) => {
  return {
    type: types.USER_DETAILS_LOADING,
  };
};

export const userDetailsFailure = () => {
  return {
    type: types.USER_DETAILS_FAILURE,
  };
};

export const fetchUserDetails = (token) => (dispatch) => {
  dispatch(userDataLoading());
    console.log(token)
  return Axios.get("http://localhost:7448/social/user/one")
    .then((response) => {
      console.log("Gotcha", response);
    })
    .catch((err) => console.log(err));
};
