import * as types from "./actionTypes";



const initState ={
    loading:false,
    data:[],
    error:false,
}

export const todosReducer =(state= initState,{type,payload}) =>{
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
                    data:payload,
                    error:false,
                    loading:false,
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