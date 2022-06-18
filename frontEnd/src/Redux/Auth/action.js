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
      // console.log(response.data)
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(loginSuccess(response.data));
    })
    .catch((err) => {
      // console.log(err)
      dispatch(loginFailure(err.response.data));
    });

}


//username actions;

const userNameLoading = () => {
  return{
    type:types.USERNAME_LOADING
  }
}
const userNameSuccess = (payload) => {
  return {
    type:types.USERNAME_SUCCESS,
    payload
  }
}
const userNameFailure = () => {
  return {
    type:types.USERNAME_FAILURE,
    payload:false
  }
}
export const resetAvaialableUsername = () => {
  return{
    type:types.RESET_AVAIALABLE_USERNAME
  }
}
export const checkUsername = (payload)=>(dispatch)=>{
  dispatch(userNameLoading());
  return Axios.post("http://localhost:7448/social/checkUsername",payload)
  .then(function (response) {
    if (response.data.status) dispatch(userNameSuccess(true));
    else dispatch(userNameSuccess(false));
  })
  .catch(function () {
    dispatch(userNameFailure())
  });
}

//reset password

export const resetPasswordLoading =() => {
  return{
    type:types.RESET_PASSWORD_LOADING
  }
}
export const resetPasswordSuccess=() => {
  return{
    type:types.RESET_PASSWORD_SUCCESS
  }
}
export const resetPasswordFailure=() => {
  return{
    type:types.RESET_PASSWORD_FAILURE
  }
}

export const resetPasswordCall =(payload) => (dispatch) => {
  dispatch(resetPasswordLoading());
  return Axios.post(`http://localhost:7448/social/reset-password/${payload.user.id}/${payload.user.token}`,payload.body)
  .then((response) => {
    console.log(response.message);
    dispatch(resetPasswordSuccess())
  })
  .catch((error) => {
    console.log(error.response)
    dispatch(resetPasswordFailure())
  })
}