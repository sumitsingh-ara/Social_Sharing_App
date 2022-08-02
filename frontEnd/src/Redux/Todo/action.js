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
export const fetchTodos = (payload) => (dispatch) => {
    dispatch(todogetRequest());
    return Axios.get(`https://socialsharekaro.herokuapp.com/social/post/allPosts`,{
        params:{
            ...payload.params
          },
        headers:{
            Authorization:`Bearer ${payload.token}`
        }
    })
    .then((res)=>dispatch(todoRequestSuccess(res.data)))
    .catch((err)=> dispatch(todoRequestFailure()))
}
const todoPostRequestSuccess =()=>{
    return{
        type:types.TODO_POST_REQUEST
    }
}
export const postTodos =(payload) =>(dispatch) => {
    // console.log(payload)
    dispatch(todogetRequest());
    return Axios.post("https://socialsharekaro.herokuapp.com/social/post/newPost", payload)
    .then((res)=> dispatch(todoPostRequestSuccess()))
    .catch((err)=> dispatch(todoRequestFailure()))
}
export const deletePost =(payload) => (dispatch) =>{
    dispatch(todogetRequest());
      let config = {
        method: 'delete',
        url: `https://socialsharekaro.herokuapp.com/social/post/deletePost/${payload.id}`,
        headers: { 
          'Authorization': "Bearer "+payload.token, 
          'Content-Type': 'application/json'
        }
      };
    return Axios(config).then(()=> dispatch(fetchTodos()))
    .catch((err)=> dispatch(todoRequestFailure()))
    
}


