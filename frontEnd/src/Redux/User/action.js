import * as types from "./actionTypes";
import Axios from "axios";

const userDetailsSuccess = (payload) => {
  return {
    type: types.USER_DETAILS_SUCCESS,
    payload,
  };
};

 const userDataLoading = () => {
  return {
    type: types.USER_DETAILS_LOADING,
  };
};

 const userDetailsFailure = () => {
  return {
    type: types.USER_DETAILS_FAILURE,
  };
};
export const destroyUserData = () => {
  localStorage.clear();
  return{
    type:types.DESTROY_USER_DETAILS
  }
}
export const fetchUserDetails = (token) => (dispatch) => {
  dispatch(userDataLoading());
  return Axios.get("https://socialsharekaro.herokuapp.com/social/user/one",{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    dispatch(userDetailsSuccess(res.data.user))
  }).catch(()=>{
    dispatch(userDetailsFailure())
    dispatch(destroyUserData())
  })
};
