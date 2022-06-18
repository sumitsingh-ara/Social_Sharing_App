import * as types from "./actionTypes";

const initState = {
    isAuth: JSON.parse(localStorage.getItem("isAuth"))===true?true: false,
    // isAuth:true,
    token: JSON.parse(localStorage.getItem("token")) || null,
    loading: false,
    error: false,
    message: null,
}

export const authReducer =(state = initState, { type, payload })=>{
    switch(type){
        case types.LOGIN_LOADING:
            return{
                ...state,
                loading: true,
                error: false,
                message: null
            }
        case types.LOGIN_SUCCESS:
            return{
                isAuth:true,
                token:payload.token,
                loading:false,
                error: false,
                message:payload.message
            }
        case types.LOGIN_FAILURE:
            return{
                isAuth:false,
                loading: false,
                error:true,
                token:null,
                message:payload.message
            }
        case types.LOGOUT:
            return{
                isAuth:false,
                loading: false,
                token:null,
                error:false,
                message:null
            }
        case types.REGISTER_LOADING:
            return{
                ...state,
                loading: true,
                error:false,
                message:"Account creation in progress"
            }
        case types.REGISTER_SUCCESS:
            return{
                isAuth:true,
                token:payload.token,
                loading: false,
                error:false,
                message:payload.message
            }
            case types.REGISTER_FAILURE:
            return{
                isAuth:false,
                token:null,
                loading: false,
                error:false,
                message:payload
            }
        default:
            return state
    }
}