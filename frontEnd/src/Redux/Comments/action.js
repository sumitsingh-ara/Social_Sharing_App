import * as types from "./actionTypes";
import Axios from "axios";


const commentsLoading= () => {
    return{
        type:types.COMMENTS_LOADING
    }
}
const commentsSuccess= (payload) => {
    return {
        type:types.COMMENTS_LOADING_SUCCESS,
        payload:payload
    }
}
const commentsFailures= () => {
    return {
        type:types.COMMENTS_LOADING_FAILURE
    }
}

export const getAllComments = (postId) => (dispatch) => {
    dispatch(commentsLoading());
   // console.log(postId,"action");
    return Axios.get(`http://localhost:7448/social/comment/allcomments/${postId}`)
    .then((res)=>{
      //console.log(res.data);
      dispatch(commentsSuccess(res.data))
    })
    .catch((error)=> dispatch(commentsFailures()))
}

export const makeNewComment =(payload) => (dispatch) =>{
    dispatch(commentsLoading());
    
    let data = JSON.stringify({
        "user": payload.id,
        "comment": payload.comment,
        "post": payload.postId
      });
      
      let config = {
        method: 'post',
        url: 'http://localhost:7448/social/comment/newcomment',
        headers: { 
          'Authorization': "Bearer "+payload.token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return Axios(config)
      .then(function () {
        dispatch(getAllComments(payload.postId))
      })
      .catch(function () {
        dispatch(commentsFailures())
      });
}

export const makeNestedNewCommentOnReply = (payload) => (dispatch) => {
  //dispatch(commentsLoading())
   
  let data = JSON.stringify({
     "comment": payload.comment,
  });

  let config = {
    method: 'post',
    url: `http://localhost:7448/social/comment/singlecomment/nestedcomment/${payload.commentId}/${payload.id}`,
    headers: { 
      'Authorization': "Bearer "+payload.token, 
      'Content-Type': 'application/json'
    },
     data : data
  };
  
  return Axios(config).then((res)=>console.log(res.data.comment)).catch((err)=>console.log(err));
}


export const deleteComment =(payload) => (dispatch) =>{
    dispatch(commentsLoading());
    let data = JSON.stringify({
        "id": payload.id,
      });
      
      let config = {
        method: 'delete',
        url: 'http://localhost:7448/social/comment/singlecomment/delete',
        headers: { 
          'Authorization': "Bearer "+payload.token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
    return Axios(config).then(()=> dispatch(getAllComments(payload.postId)))
    .catch((err)=> dispatch(commentsFailures()));
}