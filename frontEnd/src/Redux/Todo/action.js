import * as types from "./actionTypes";
import Axios from "axios";


const todogetRequest =() => {
    return{
        type:types.TODO_GET_REQUEST
    }
}
const todoRequestFailure =() => {
    return {
        type:types.TODO_REQUEST_FAILURE,
    }
}
const todoRequestSuccess =(payload) => {
    return{
        type:types.TODO_REQUEST_SUCCESS,
        payload,
    }
}
export const fetchTodos = () => (dispatch) => {
    dispatch(todogetRequest());
    return Axios.get("/todos")
    .then((res)=>dispatch(todoRequestSuccess(res.data)))
    .catch((err)=> dispatch(todoRequestFailure()))
}
const todoPostRequestSuccess =()=>{
    return{
        type:types.TODO_POST_REQUEST
    }
}
export const postTodos =(payload) =>(dispatch) => {
    dispatch(todogetRequest());
    return Axios.post("/todos", payload)
    .then((res)=> dispatch(todoPostRequestSuccess()))
    .catch((err)=> dispatch(todoRequestFailure()))
}


