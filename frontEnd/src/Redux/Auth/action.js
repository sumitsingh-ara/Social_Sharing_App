import * as types from "./actionTypes";


export const logout =() => {
    localStorage.setItem('isAuth',false);
    localStorage.setItem('token',null);
    return{
        type:types.LOGOUT
    }
}