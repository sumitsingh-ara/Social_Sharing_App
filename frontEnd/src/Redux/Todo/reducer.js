import * as types from "./actionTypes";



const initState ={
    loading:false,
    data:[],
    error:false,
    totalPosts:0,
}

export const allPostsReducer =(state= initState,{type,payload}) =>{
    switch(type){
        case types.TODO_GET_REQUEST:
            return{
                ...state,
                loading:true,
                error:false,
            }
            case types.TODO_REQUEST_SUCCESS:
                return{
                    ...state,
                    data:payload.posts,
                    error:false,
                    loading:false,
                    totalPosts:payload.postTotalCount
                }
            case types.TODO_REQUEST_FAILURE:
                return{
                    ...state,
                    loading:false,
                    error:true
                }
            case types.TODO_POST_REQUEST:
                return {...state,
                loading:false,
                error:false
                }
        default:
            return state
    }
}