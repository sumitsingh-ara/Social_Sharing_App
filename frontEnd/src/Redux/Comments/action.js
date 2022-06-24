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
    return Axios.get(`https://socialsharekaro.herokuapp.com/social/comment/allcomments/${postId}`)
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
        url: 'https://socialsharekaro.herokuapp.com/social/comment/newcomment',
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



export const editComment =(payload) => (dispatch) => {
  dispatch(commentsLoading())
  let data = JSON.stringify({
    "editedcomment": payload.comment,
 });

 let config = {
   method: 'patch',
   url: `https://socialsharekaro.herokuapp.com/social/comment/singlecomment/update/${payload.commentId}`,
   headers: { 
     'Authorization': "Bearer "+payload.token, 
     'Content-Type': 'application/json'
   },
    data : data
 };
 
 return Axios(config).then((res)=>dispatch(getAllComments(payload.postId))).catch((err)=>dispatch(commentsFailures()));
  
}

export const deleteComment =(payload) => (dispatch) =>{
    dispatch(commentsLoading());
    let data = JSON.stringify({
        "id": payload.id,
      });
      
      let config = {
        method: 'delete',
        url: 'https://socialsharekaro.herokuapp.com/social/comment/singlecomment/delete',
        headers: { 
          'Authorization': "Bearer "+payload.token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
    return Axios(config).then(()=> dispatch(getAllComments(payload.postId)))
    .catch((err)=> dispatch(commentsFailures()));
}

///nested comments actions making a new nested reply
export const makeNestedNewCommentOnReply = (payload) => (dispatch) => {
  dispatch(commentsLoading())
   //console.log("Call kr rhe he",payload)
  let data = JSON.stringify({
     "comment": payload.comment,
  });

  let config = {
    method: 'post',
    url: `https://socialsharekaro.herokuapp.com/social/comment/singlecomment/nestedcomment/${payload.commentId}/${payload.id}`,
    headers: { 
      'Authorization': "Bearer "+payload.token, 
      'Content-Type': 'application/json'
    },
     data : data
  };
  
  return Axios(config).then((res)=>dispatch(getAllComments(payload.postId))).catch((err)=>dispatch(commentsFailures()));
}

//deleting nested comments replies
export const deleteNestedCommentReplies =(payload) => (dispatch) => {
  //console.log(payload);
 let config = {
   method: 'delete',
   url: `https://socialsharekaro.herokuapp.com/social/comment/singlecomment/nestedcomment/delete/${payload.commentId}/${payload.repliedId}`,
   headers: { 
     'Authorization': "Bearer "+payload.token, 
     'Content-Type': 'application/json'
   },
 };
 
 return Axios(config).then((res)=>dispatch(getAllComments(payload.postId))).catch((err)=>dispatch(commentsFailures()));
}

//editing a nested comment reply

export const editingNestedReply =(payload) => (dispatch)=> {
  //dispatch(commentsLoading())
  let data = JSON.stringify({
    "editedcomment": payload.editedcomment,
 });

 let config = {
   method: 'patch',
   url:  `https://socialsharekaro.herokuapp.com/social/comment/singlecomment/nestedcomment/edit/${payload.commentId}/${payload.repliedId}`,
   headers: { 
     'Authorization': "Bearer "+payload.token, 
     'Content-Type': 'application/json'
   },
    data : data
 };
 
 return Axios(config).then(()=>dispatch(getAllComments(payload.postId))).catch(()=>dispatch(commentsFailures()));

}