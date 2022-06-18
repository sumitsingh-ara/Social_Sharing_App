import * as types from "./actionTypes";
import Axios from "axios";

export const logout = () => {
  localStorage.setItem("isAuth", false);
  localStorage.setItem("token", null);
  return {
    type: types.LOGOUT,
  };
};
export const serverLogout = () => (dispatch) => {
  dispatch(logout());
  return Axios.get("http://localhost:7448/social/logout")
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const registerLoading = () => {
  return {
    type: types.REGISTER_LOADING,
  };
};
const registerSuccess = (payload) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: payload,
  };
};
const registerError = (payload) => {
  return {
    type: types.REGISTER_FAILURE,
    payload: payload,
  };
};
export const registerNew = (payload) => (dispatch) => {
  dispatch(registerLoading());
  return Axios.post("http://localhost:7448/social/register", payload)
    .then((response) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(registerSuccess(response.data));
    })
    .catch((err) => {
      dispatch(registerError(err.response.data.message));
    });
};

const loginLoading = () => {
  return{
    type:types.LOGIN_LOADING
  }
}
const loginSuccess = (payload) => {
  return{
    type:types.LOGIN_SUCCESS,
    payload
  }
}
const loginFailure = (payload) => {
  return {
    type:types.LOGIN_FAILURE,
    payload
  }
}
export const tryLogin = (payload) =>(dispatch)=> {
  dispatch(loginLoading())
  return Axios.post("http://localhost:7448/social/login", payload)
    .then((response) => {
      console.log(response.data)
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(loginSuccess(response.data));
    })
    .catch((err) => {
      dispatch(loginFailure(err.response.data.message));
    });

}
