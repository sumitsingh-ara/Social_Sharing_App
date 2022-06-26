import * as types from "./actionTypes";
import Axios from "axios";
import {destroyUserData} from "../User/action";
export const setMessage = (payload) => {
  return {
    type:types.SET_MESSAGE,
    payload:payload
  }
}
export const resetMessage =()=>{
  return {
    type:types.RESET_MESSAGE
  }
}
export const logout = () => {
  localStorage.clear();
  return {
    type: types.LOGOUT,
  };
};
export const serverLogout = () => (dispatch) => {
  dispatch(logout());
  dispatch(destroyUserData());
  return Axios.get("https://socialsharekaro.herokuapp.com/social/logout")
    .then((res) =>"logout Successfull")
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
  return Axios.post("https://socialsharekaro.herokuapp.com/social/register",payload.body)
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
const loginFailure = () => {
  return {
    type:types.LOGIN_FAILURE,
  }
}
export const tryLogin = (payload) =>(dispatch)=> {
 // console.log(payload,"from reset password")
  dispatch(loginLoading())
  return Axios.post("https://socialsharekaro.herokuapp.com/social/login", payload)
    .then((response) => {
        // console.log(response.data,"eho success")
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(loginSuccess(response.data));
      // window.location.href="https://localhost:3000/"
    })
    .catch((err) => {
        // console.log(err,"error")
      dispatch(loginFailure());
    });

}

export const googleLoginSuccess = (token) => {
  localStorage.setItem("isAuth", true);
  localStorage.setItem("token",JSON.stringify(token));
  return{
    type:types.GOOGLE_LOGIN_SUCCESS,
    payload:token
  }
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

export const checkUsername = (payload)=>(dispatch)=>{
  dispatch(userNameLoading());
  // dispatch(setMessage("Checking availability"))
 // console.log("yhn ayay ah")
  return Axios.post("https://socialsharekaro.herokuapp.com/social/checkUsername",payload)
  .then(function (response) {
    if (response.data.status){
      dispatch(userNameSuccess(true))
      dispatch(setMessage("available"))
    }
    else{
      dispatch(userNameSuccess(false));
    dispatch(setMessage("oops already taken"))
    } 
  })
  .catch(function () {
    dispatch(userNameFailure())
  });
}

//reset password

const resetPasswordLoading =() => {
  return{
    type:types.RESET_PASSWORD_LOADING
  }
}
export const resetPasswordSuccess=() => {
  return{
    type:types.RESET_PASSWORD_SUCCESS
  }
}
const resetPasswordFailure=() => {
  return{
    type:types.RESET_PASSWORD_FAILURE
  }
}

export const resetPasswordCall =(payload) => (dispatch) => {
  dispatch(resetPasswordLoading());
  return Axios.post(`https://socialsharekaro.herokuapp.com/social/reset-password/${payload.user.id}/${payload.user.token}`,payload.body)
  .then((response) => {
   // console.log(response);
    dispatch(resetPasswordSuccess())
    const payloa={
      email:response.data.email,
      password:payload.body.password
    }
    dispatch(tryLogin(payloa))
  })
  .catch((error) => {
    //console.log(error)
    dispatch(resetPasswordFailure())
  })
}
