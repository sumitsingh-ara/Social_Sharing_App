import * as types from "./actionTypes";


const initState ={
    id:null,
    userName:null,
    name:null,
    profilePic:null,
    email:null,
    loading:true,
    error:false,
    message:null,
    admin:false,
}

export const usersReducer =(state = initState, { type, payload }) =>{
    switch(type){
        case types.USER_DETAILS_LOADING:
            return{
                ...state,
                loading: true,
                message:"Getting the user details"
            }
        case types.USER_DETAILS_SUCCESS:
            return{
                id:payload._id,
                userName:payload.username,
                name:payload.name,
                profile:payload.profilePic,
                email:payload.email,
                loading:false,
                error:false,
                admin:payload.admin?true:false,
                message:"Successfully logined and got the user details"
            }
        case types.USER_DETAILS_FAILURE:
            return{
                ...state,
                loading:false,
                error:true,
                message:"Something is wrong with your network"
            }
        case types.DESTROY_USER_DETAILS:
            return {
                id:null,
                userName:null,
                name:null,
                profilePic:null,
                email:null,
                loading:true,
                error:false,
                message:null,
            }
        default:
            return state
    }
}