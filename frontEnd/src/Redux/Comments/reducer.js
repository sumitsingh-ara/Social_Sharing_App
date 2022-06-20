import * as types from "./actionTypes";


const initState ={
    loading: true,
    error: false,
    data:[],
    count: 0,
}

export const commentReducer = (state = initState, { type, payload })=>{
    switch(type){
        case types.COMMENTS_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case types.COMMENTS_LOADING_SUCCESS:
            return {
                loading: false,
                error: false,
                data:payload.comments,
                count:payload.count
            }
        case types.COMMENTS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state;
    }
}