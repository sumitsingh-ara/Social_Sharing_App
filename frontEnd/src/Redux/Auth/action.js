import * as types from "./actionTypes";
import Axios from "axios";

export const logout =() => {
    localStorage.setItem('isAuth',false);
    localStorage.setItem('token',null);
    return{
        type:types.LOGOUT
    }
}


const registerLoading = () => {
    return{
        type:types.REGISTER_LOADING
    }
}
const registerSuccess = (payload) => {
    return {
        type:types.REGISTER_SUCCESS,
        payload:payload
    }
}
const registerError = (payload) => {
    return {
        type:types.REGISTER_FAILURE,
        payload:payload
    }
}
export const registerNew =(payload) =>(dispatch) => {
    dispatch(registerLoading());
    return Axios.post("http://localhost:7448/social/register",payload)
    .then((response) => {
        console.log(response.data)
        localStorage.setItem("isAuth",true);
        localStorage.setItem("token",JSON.stringify(response.data.token))
        dispatch(registerSuccess(response))
    })
    .catch((err) => {
        dispatch(registerError(err.response.data.message))
    });
}