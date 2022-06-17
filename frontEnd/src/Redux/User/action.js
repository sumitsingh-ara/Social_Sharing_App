import * as types from "./actionTypes";
import Axios from "axios";

export const userDetailsSuccess = (payload) => {
  return {
    type: types.USER_DETAILS_SUCCESS,
    payload,
  };
};

export const userDataLoading = () => {
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
  return Axios.get("http://localhost:7448/social/user/one",{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    dispatch(userDetailsSuccess(res.data.user))
  }).catch(()=>{
    dispatch(userDetailsFailure())
  })
};
