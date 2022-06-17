import * as types from "./actionTypes";

const initState = {
    // isAuth: JSON.parse(localStorage.getItem("isAuth"))===true?true: false,
    isAuth:true,
    token: JSON.parse(localStorage.getItem("token")) || null,
    loading: false,
    error: false
}

export const authReducer =(state = initState, { type, payload })=>{
    switch(type){
        case types.LOGIN_LOADING:
            return{
                ...state,
                loading: true,
                error: false
            }
        case types.LOGIN_SUCCESS:
            return{
                isAuth:true,
                token:payload,
                loading:false,
                error: false
            }
        case types.LOGIN_FAILURE:
            return{
                ...state,
                loading: false,
                error:true
            }
        case types.LOGOUT:
            return{
                isAuth:false,
                loading: false,
                token:null,
                error:false
            }
        default:
            return state
    }
}